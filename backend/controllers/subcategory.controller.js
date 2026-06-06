import Category from "../models/category.model.js"
import Subcategory from "../models/subcategory.model.js"

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
