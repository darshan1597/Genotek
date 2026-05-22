import Product from "../models/product.model.js";
import fs from "fs";
import path from "path";

export const addProduct = async (req, res) => {
    try {
        const uploadedImage = req.file;

        if (!uploadedImage) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const newProduct = new Product({
            ...req.body,
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
        product.cas = req.body.cas || product.cas;

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
