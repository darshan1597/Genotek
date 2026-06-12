import express from "express"
import { uploadProductAssets } from "../middlewares/multer.js";
import { addProduct, deleteProduct, fetchProducts, fetchSingleProduct, updateProduct } from "../controllers/products.controller.js";

const productRouter = express.Router()

productRouter.post("/add-product", uploadProductAssets, addProduct);
productRouter.get("/fetch-products", fetchProducts)
productRouter.delete("/delete-product/:id", deleteProduct);
productRouter.get("/fetch-product/:id", fetchSingleProduct);
productRouter.put("/update-product/:id", uploadProductAssets, updateProduct);

export default productRouter
