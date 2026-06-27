import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Subcategory from "../models/subcategory.model.js";
import fs from "fs";
import path from "path";
import { getCategoryLimitStatus } from "../utils/categoryLimit.js";

export const fetchCategoryLimitStatus = async (req, res) => {
    try {
        return res.status(200).json(await getCategoryLimitStatus());
    } catch (error) {
        return res.status(500).json({ message: `Error fetching category limit ${error}` });
    }
};

export const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const hasSubcategories = req.body.hasSubcategories === true || req.body.hasSubcategories === "true";
        const isStandalone = req.body.isStandalone === true || req.body.isStandalone === "true";
        const uploadedImage = req.file;
        const limitStatus = await getCategoryLimitStatus();

        if (!limitStatus.canAdd) {
            if (uploadedImage?.path && fs.existsSync(uploadedImage.path)) fs.unlinkSync(uploadedImage.path);
            return res.status(409).json({
                message: `Maximum of ${limitStatus.limit} product categories reached`,
                ...limitStatus,
            });
        }

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        if (!description) {
            return res.status(400).json({ message: "Category description is required" });
        }

        if (!uploadedImage) {
            return res.status(400).json({ message: "Category image is required" });
        }

        let category = await Category.findOne({ name });

        if (category) return res.status(400).json({ message: "Category already exists" });

        category = new Category({
            name,
            description,
            hasSubcategories,
            isStandalone,
            image: {
                name: uploadedImage.filename
            }
        });

        await category.save();

        return res.status(201).json({ message: "Category added successfully", category });
    } catch (error) {
        return res.status(500).json({message: `Error adding Category ${error}`})
    }
}

export const fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({message: `Error fetching Categories ${error}`});
    }
};

export const updateCategorySettings = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (typeof req.body.isStandalone === "boolean") {
            category.isStandalone = req.body.isStandalone;
        }

        await category.save();

        return res.status(200).json({ message: "Category settings updated", category });
    } catch (error) {
        return res.status(500).json({ message: `Error updating Category settings ${error}` });
    }
};

export const fetchSingleCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        return res.status(200).json({ category });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching Category ${error}` });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        const oldName = category.name;
        const newName = req.body.name?.trim();
        const newDescription = req.body.description?.trim();

        if (!newName || !newDescription) {
            return res.status(400).json({ message: "Category name and description are required" });
        }

        const duplicate = await Category.findOne({ name: newName, _id: { $ne: category._id } });
        if (duplicate) return res.status(400).json({ message: "Category already exists" });

        category.name = newName;
        category.description = newDescription;
        category.hasSubcategories = req.body.hasSubcategories === true || req.body.hasSubcategories === "true";
        category.isStandalone = req.body.isStandalone === true || req.body.isStandalone === "true";

        if (req.file) {
            if (category.image?.name) {
                const oldImagePath = path.join(process.cwd(), "public", "categoryImages", category.image.name);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
            category.image = { name: req.file.filename };
        }

        await category.save();

        if (oldName !== newName) {
            await Promise.all([
                Product.updateMany({ category: oldName }, { $set: { category: newName } }),
                Subcategory.updateMany({ category: oldName }, { $set: { category: newName } }),
            ]);
        }

        return res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        return res.status(500).json({ message: `Error updating Category ${error}` });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        const [productCount, subcategoryCount] = await Promise.all([
            Product.countDocuments({ category: category.name }),
            Subcategory.countDocuments({ category: category.name }),
        ]);

        if (productCount || subcategoryCount) {
            return res.status(400).json({
                message: "Remove this category's products and subcategories before deleting it",
            });
        }

        if (category.image?.name) {
            const imagePath = path.join(process.cwd(), "public", "categoryImages", category.image.name);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await category.deleteOne();
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Error deleting Category ${error}` });
    }
};
