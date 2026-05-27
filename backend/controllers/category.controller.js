import Category from "../models/category.model.js";

export const addCategory = async (req, res) => {
    try {
        const { name, description, hasSubcategories = false } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        if (!description) {
            return res.status(400).json({ message: "Category description is required" });
        }

        let category = await Category.findOne({ name });

        if (category) return res.status(400).json({ message: "Category already exists" });

        category = new Category({ name, description, hasSubcategories });

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
