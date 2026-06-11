import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Subcategory from "../models/subcategory.model.js";
import fs from "fs";
import path from "path";

export const addProduct = async (req, res) => {
    try {
        const parentCategory = await Category.findOne({ name: req.body.category });

        if (!parentCategory) {
            return res.status(400).json({ message: "Selected category does not exist" });
        }

        if (parentCategory.hasSubcategories && !req.body.subcategory) {
            return res.status(400).json({ message: "Select a subcategory for this category" });
        }

        if (parentCategory.isStandalone && !req.body.description?.trim()) {
            return res.status(400).json({ message: "Product description is required for Genotek Exclusice products" });
        }

        if (req.body.subcategory) {
            const subcategory = await Subcategory.findOne({
                name: req.body.subcategory,
                category: req.body.category
            });

            if (!subcategory) {
                return res.status(400).json({ message: "Selected subcategory does not belong to this category" });
            }
        }

        const uploadedImage = req.file;

        if (!uploadedImage) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const newProduct = new Product({
            ...req.body,
            subcategory: req.body.subcategory || "",
            description: parentCategory.isStandalone ? req.body.description.trim() : "",
            image: {
                name: uploadedImage.filename
            }
        });

        await newProduct.save();

        return res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
        return res.status(500).json({message: `Error adding Product ${error}`})
    }
};

export const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({message: `Error fetching Products ${error}`})
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.image?.name) {
            const imagePath = path.join(process.cwd(), "public", "productImages", product.image.name);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({message: `Error deleting Product ${error}`})
    }
};

export const fetchSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching product: ${error}` });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const uploadedImage = req.file;

        product.name = req.body.name || product.name;
        product.category = req.body.category || product.category;
        product.subcategory = req.body.subcategory || "";
        product.cas = req.body.cas || product.cas;

        const parentCategory = await Category.findOne({ name: product.category });

        if (!parentCategory) {
            return res.status(400).json({ message: "Selected category does not exist" });
        }

        if (parentCategory.hasSubcategories && !product.subcategory) {
            return res.status(400).json({ message: "Select a subcategory for this category" });
        }

        if (parentCategory.isStandalone && !req.body.description?.trim()) {
            return res.status(400).json({ message: "Product description is required for Genotek Exclusice products" });
        }

        product.description = parentCategory.isStandalone ? req.body.description.trim() : "";

        if (product.subcategory) {
            const subcategory = await Subcategory.findOne({
                name: product.subcategory,
                category: product.category
            });

            if (!subcategory) {
                return res.status(400).json({ message: "Selected subcategory does not belong to this category" });
            }
        }

        if (uploadedImage) {
            if (product.image?.name) {
                const oldImagePath = path.join(process.cwd(), "public", "productImages", product.image.name);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            product.image = {
                name: uploadedImage.filename
            };
        }

        await product.save();

        return res.status(200).json({ message: "Product updated successfully", product, });

    } catch (error) {
        return res.status(500).json({ message: `Failed to update product: ${error}` });
    }
};
