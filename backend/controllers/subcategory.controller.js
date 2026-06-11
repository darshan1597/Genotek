import Category from "../models/category.model.js"
import Product from "../models/product.model.js"
import Subcategory from "../models/subcategory.model.js"
import fs from "fs"
import path from "path"

export const addSubcategory = async (req, res) => {
    try {
        const { name, category } = req.body
        const uploadedImage = req.file

        if (!name) {
            return res.status(400).json({ message: "Subcategory name is required" })
        }

        if (!category) {
            return res.status(400).json({ message: "Parent category is required" })
        }

        if (!uploadedImage) {
            return res.status(400).json({ message: "Subcategory image is required" })
        }

        const parentCategory = await Category.findOne({ name: category })

        if (!parentCategory) {
            return res.status(404).json({ message: "Parent category not found" })
        }

        if (!parentCategory.hasSubcategories) {
            return res.status(400).json({ message: "Selected category is not configured for subcategories" })
        }

        let subcategory = await Subcategory.findOne({ name, category })

        if (subcategory) {
            return res.status(400).json({ message: "Subcategory already exists in this category" })
        }

        subcategory = await Subcategory.create({
            name,
            category,
            image: {
                name: uploadedImage.filename
            }
        })

        return res.status(201).json({ message: "Subcategory added successfully", subcategory })
    } catch (error) {
        return res.status(500).json({ message: `Error adding Subcategory ${error}` })
    }
}

export const fetchSubcategories = async (req, res) => {
    try {
        const filter = req.query.category ? { category: req.query.category } : {}
        const subcategories = await Subcategory.find(filter).sort({ createdAt: 1 })

        return res.status(200).json(subcategories)
    } catch (error) {
        return res.status(500).json({ message: `Error fetching Subcategories ${error}` })
    }
}

export const fetchSingleSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id)
        if (!subcategory) return res.status(404).json({ message: "Subcategory not found" })
        return res.status(200).json({ subcategory })
    } catch (error) {
        return res.status(500).json({ message: `Error fetching Subcategory ${error}` })
    }
}

export const updateSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id)
        if (!subcategory) return res.status(404).json({ message: "Subcategory not found" })

        const newName = req.body.name?.trim()
        const newCategory = req.body.category?.trim()
        if (!newName || !newCategory) {
            return res.status(400).json({ message: "Subcategory name and parent category are required" })
        }

        const parentCategory = await Category.findOne({ name: newCategory, hasSubcategories: true })
        if (!parentCategory) {
            return res.status(400).json({ message: "Select a category configured for subcategories" })
        }

        const duplicate = await Subcategory.findOne({
            name: newName,
            category: newCategory,
            _id: { $ne: subcategory._id },
        })
        if (duplicate) return res.status(400).json({ message: "Subcategory already exists in this category" })

        const oldName = subcategory.name
        const oldCategory = subcategory.category
        subcategory.name = newName
        subcategory.category = newCategory

        if (req.file) {
            if (subcategory.image?.name) {
                const oldImagePath = path.join(process.cwd(), "public", "subcategoryImages", subcategory.image.name)
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath)
            }
            subcategory.image = { name: req.file.filename }
        }

        await subcategory.save()

        if (oldName !== newName || oldCategory !== newCategory) {
            await Product.updateMany(
                { category: oldCategory, subcategory: oldName },
                { $set: { category: newCategory, subcategory: newName } }
            )
        }

        return res.status(200).json({ message: "Subcategory updated successfully", subcategory })
    } catch (error) {
        return res.status(500).json({ message: `Error updating Subcategory ${error}` })
    }
}

export const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id)
        if (!subcategory) return res.status(404).json({ message: "Subcategory not found" })

        const productCount = await Product.countDocuments({
            category: subcategory.category,
            subcategory: subcategory.name,
        })
        if (productCount) {
            return res.status(400).json({ message: "Remove this subcategory's products before deleting it" })
        }

        if (subcategory.image?.name) {
            const imagePath = path.join(process.cwd(), "public", "subcategoryImages", subcategory.image.name)
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
        }

        await subcategory.deleteOne()
        return res.status(200).json({ message: "Subcategory deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Error deleting Subcategory ${error}` })
    }
}
