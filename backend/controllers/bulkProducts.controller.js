import crypto from "crypto";
import fs from "fs";
import path from "path";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Subcategory from "../models/subcategory.model.js";
import {
    isValidCas,
    normalizeCas,
    parseDocxProductPreview,
    readProductImportPreview,
    removeProductImportPreview,
} from "../utils/docxProductImporter.js";

const validateDestination = async (categoryName, subcategoryName) => {
    const category = await Category.findOne({ name: categoryName });

    if (!category) return { error: "Selected category does not exist" };
    if (category.isStandalone) return { error: "Bulk upload is not available for Genotek Exclusive" };

    if (category.hasSubcategories) {
        if (!subcategoryName) return { error: "Select a subcategory for this category" };

        const subcategory = await Subcategory.findOne({
            name: subcategoryName,
            category: categoryName,
        });
        if (!subcategory) return { error: "Selected subcategory does not belong to this category" };
    }

    return {
        category,
        subcategory: category.hasSubcategories ? subcategoryName : "",
    };
};

export const previewBulkProducts = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Upload a DOCX document" });

        const categoryName = String(req.body.category || "").trim();
        const subcategoryName = String(req.body.subcategory || "").trim();
        const destination = await validateDestination(categoryName, subcategoryName);
        if (destination.error) return res.status(400).json({ message: destination.error });

        const preview = await parseDocxProductPreview(req.file.buffer);
        return res.status(200).json({
            message: `${preview.products.length} product entries detected`,
            ...preview,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Unable to parse the DOCX document",
        });
    }
};

export const confirmBulkProducts = async (req, res) => {
    try {
        const token = String(req.body.token || "");
        const categoryName = String(req.body.category || "").trim();
        const subcategoryName = String(req.body.subcategory || "").trim();
        const submittedProducts = Array.isArray(req.body.products) ? req.body.products : [];
        const destination = await validateDestination(categoryName, subcategoryName);

        if (destination.error) return res.status(400).json({ message: destination.error });
        if (!submittedProducts.length) return res.status(400).json({ message: "No products selected for import" });

        const preview = readProductImportPreview(token);
        if (!preview) return res.status(410).json({ message: "This import preview has expired. Upload the DOCX again." });

        const manifestProducts = new Map(
            preview.manifest.products.map((product) => [Number(product.sourceIndex), product])
        );
        const existingProducts = await Product.find({
            category: categoryName,
            subcategory: destination.subcategory,
        }).select("cas");
        const knownCasNumbers = new Set(existingProducts.map((product) => normalizeCas(product.cas)));
        const productImageDirectory = path.join(process.cwd(), "public", "productImages");
        const imported = [];
        const skipped = [];
        const failed = [];

        if (!fs.existsSync(productImageDirectory)) fs.mkdirSync(productImageDirectory, { recursive: true });

        for (const submitted of submittedProducts) {
            const sourceIndex = Number(submitted.sourceIndex);
            const manifestProduct = manifestProducts.get(sourceIndex);
            const name = String(submitted.name || "").trim();
            const cas = normalizeCas(submitted.cas);

            if (!manifestProduct?.imageFile) {
                failed.push({ name, cas, reason: "Preview image is missing" });
                continue;
            }
            if (!name || !isValidCas(cas)) {
                failed.push({ name, cas, reason: "Product name or CAS number is invalid" });
                continue;
            }
            if (cas !== "N.A." && knownCasNumbers.has(cas)) {
                skipped.push({ name, cas, reason: "Duplicate CAS number" });
                continue;
            }

            const sourceImage = path.join(preview.directory, manifestProduct.imageFile);
            if (!fs.existsSync(sourceImage)) {
                failed.push({ name, cas, reason: "Preview image file was not found" });
                continue;
            }

            const imageName = `bulk-product-${Date.now()}-${crypto.randomUUID()}.webp`;
            const destinationImage = path.join(productImageDirectory, imageName);

            try {
                fs.copyFileSync(sourceImage, destinationImage);
                const product = await Product.create({
                    name,
                    cas,
                    category: categoryName,
                    subcategory: destination.subcategory,
                    description: "",
                    image: { name: imageName },
                    pdf: { name: "" },
                });
                if (cas !== "N.A.") knownCasNumbers.add(cas);
                imported.push({ id: product._id, name, cas });
            } catch (error) {
                if (fs.existsSync(destinationImage)) fs.unlinkSync(destinationImage);
                failed.push({ name, cas, reason: "Database import failed" });
            }
        }

        removeProductImportPreview(token);
        return res.status(201).json({
            message: `${imported.length} products imported`,
            imported,
            skipped,
            failed,
        });
    } catch (error) {
        return res.status(500).json({ message: `Unable to import products: ${error.message}` });
    }
};
