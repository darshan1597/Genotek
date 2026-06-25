import fs from "fs";
import path from "path";
import ChromatographyCategory from "../models/chromatographyCategory.model.js";

const imageFolder = "chromatographyImages";
const pdfFolder = "chromatographyPdfs";

const slugify = (value) =>
    String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const parsePayload = (req) => {
    if (!req.body.payload) return req.body;

    try {
        return JSON.parse(req.body.payload);
    } catch {
        return null;
    }
};

const fileByField = (req, fieldName) => (req.files || []).find((file) => file.fieldname === fieldName);

const compactStrings = (items) =>
    Array.isArray(items)
        ? items.map((item) => String(item || "").trim()).filter(Boolean)
        : [];

const normalizeSections = (sections) =>
    Array.isArray(sections)
        ? sections
            .map((section) => ({
                text: String(section?.text || "").trim(),
                points: compactStrings(section?.points),
            }))
            .filter((section) => section.text || section.points.length)
        : [];

const normalizeDocuments = (documents, req, prefix) =>
    Array.isArray(documents)
        ? documents
            .map((document, index) => {
                const uploaded = fileByField(req, `${prefix}Document-${index}`);
                return {
                    title: String(document?.title || "").trim(),
                    name: uploaded?.filename || document?.name || "",
                };
            })
            .filter((document) => document.title || document.name)
        : [];

const normalizeSubcategories = (subcategories, req) =>
    Array.isArray(subcategories)
        ? subcategories
            .map((subcategory, index) => {
                const uploadedImage = fileByField(req, `subcategoryImage-${index}`);

                return {
                    heading: String(subcategory?.heading || "").trim(),
                    text: String(subcategory?.text || "").trim(),
                    points: compactStrings(subcategory?.points),
                    extraSections: normalizeSections(subcategory?.extraSections),
                    image: {
                        name: uploadedImage?.filename || subcategory?.image?.name || "",
                    },
                    documents: normalizeDocuments(subcategory?.documents, req, `subcategory-${index}`),
                };
            })
            .filter((subcategory) => subcategory.heading)
        : [];

const collectAssetNames = (category) => {
    const images = new Set();
    const pdfs = new Set();

    if (category?.categoryImage?.name) images.add(category.categoryImage.name);
    if (category?.bannerImage?.name) images.add(category.bannerImage.name);
    category?.documents?.forEach((document) => {
        if (document?.name) pdfs.add(document.name);
    });
    category?.subcategories?.forEach((subcategory) => {
        if (subcategory?.image?.name) images.add(subcategory.image.name);
        subcategory?.documents?.forEach((document) => {
            if (document?.name) pdfs.add(document.name);
        });
    });

    return { images, pdfs };
};

const deleteMissingAssets = (previousCategory, nextData) => {
    if (!previousCategory) return;

    const previous = collectAssetNames(previousCategory);
    const next = collectAssetNames(nextData);

    previous.images.forEach((name) => {
        if (!next.images.has(name)) {
            const filePath = path.join(process.cwd(), "public", imageFolder, name);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
    });

    previous.pdfs.forEach((name) => {
        if (!next.pdfs.has(name)) {
            const filePath = path.join(process.cwd(), "public", pdfFolder, name);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
    });
};

const buildCategoryData = (payload, req, previousCategory = null) => {
    const name = String(payload.name || "").trim();
    const slug = slugify(payload.slug || name);
    const categoryImage = fileByField(req, "categoryImage");
    const bannerImage = fileByField(req, "bannerImage");
    const hasSubcategories = payload.hasSubcategories === true || payload.hasSubcategories === "true";

    return {
        name,
        slug,
        categoryImage: {
            name: categoryImage?.filename || payload.categoryImage?.name || previousCategory?.categoryImage?.name || "",
        },
        bannerImage: {
            name: bannerImage?.filename || payload.bannerImage?.name || previousCategory?.bannerImage?.name || "",
        },
        bannerLines: compactStrings(payload.bannerLines).slice(0, 2),
        heading: String(payload.heading || "").trim(),
        text: String(payload.text || "").trim(),
        points: compactStrings(payload.points),
        extraSections: normalizeSections(payload.extraSections),
        hasSubcategories,
        documents: hasSubcategories ? [] : normalizeDocuments(payload.documents, req, "category"),
        subcategories: hasSubcategories ? normalizeSubcategories(payload.subcategories, req) : [],
    };
};

const validateCategoryData = (data) => {
    if (!data.name) return "Category name is required";
    if (!data.slug) return "Page URL is required";
    if (!data.categoryImage.name) return "Category image is required";
    if (!data.bannerImage.name) return "Banner image is required";
    if (data.bannerLines.length < 2) return "Both banner text lines are required";
    if (data.hasSubcategories) {
        if (!data.subcategories.length) return "Add at least one subcategory";
        const missingImage = data.subcategories.find((subcategory) => !subcategory.image.name);
        if (missingImage) return "Each subcategory needs an image";
    }

    return "";
};

export const fetchChromatographyCategories = async (req, res) => {
    try {
        const categories = await ChromatographyCategory.find().sort({ createdAt: 1 });
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching chromatography categories ${error}` });
    }
};

export const fetchChromatographyCategoryBySlug = async (req, res) => {
    try {
        const category = await ChromatographyCategory.findOne({ slug: req.params.slug });
        if (!category) return res.status(404).json({ message: "Chromatography category not found" });
        return res.status(200).json({ category });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching chromatography category ${error}` });
    }
};

export const addChromatographyCategory = async (req, res) => {
    try {
        const payload = parsePayload(req);
        if (!payload) return res.status(400).json({ message: "Invalid category payload" });

        const data = buildCategoryData(payload, req);
        const validationError = validateCategoryData(data);
        if (validationError) return res.status(400).json({ message: validationError });

        const duplicate = await ChromatographyCategory.findOne({ slug: data.slug });
        if (duplicate) return res.status(400).json({ message: "Page URL already exists" });

        const category = await ChromatographyCategory.create(data);
        return res.status(201).json({ message: "Chromatography category added", category });
    } catch (error) {
        return res.status(500).json({ message: `Error adding chromatography category ${error}` });
    }
};

export const updateChromatographyCategory = async (req, res) => {
    try {
        const category = await ChromatographyCategory.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Chromatography category not found" });

        const payload = parsePayload(req);
        if (!payload) return res.status(400).json({ message: "Invalid category payload" });

        const data = buildCategoryData(payload, req, category);
        const validationError = validateCategoryData(data);
        if (validationError) return res.status(400).json({ message: validationError });

        const duplicate = await ChromatographyCategory.findOne({ slug: data.slug, _id: { $ne: category._id } });
        if (duplicate) return res.status(400).json({ message: "Page URL already exists" });

        deleteMissingAssets(category, data);
        category.set(data);
        await category.save();

        return res.status(200).json({ message: "Chromatography category updated", category });
    } catch (error) {
        return res.status(500).json({ message: `Error updating chromatography category ${error}` });
    }
};

export const deleteChromatographyCategory = async (req, res) => {
    try {
        const category = await ChromatographyCategory.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Chromatography category not found" });

        deleteMissingAssets(category, null);
        await category.deleteOne();

        return res.status(200).json({ message: "Chromatography category deleted" });
    } catch (error) {
        return res.status(500).json({ message: `Error deleting chromatography category ${error}` });
    }
};
