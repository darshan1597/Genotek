import express from "express"
import { uploadProductImages } from "../middlewares/multer.js";
import { addProduct, deleteProduct, fetchProducts, fetchSingleProduct, updateProduct } from "../controllers/products.controller.js";

const productRouter = express.Router()

productRouter.post("/add-product", uploadProductImages.single("image"), addProduct);
productRouter.get("/fetch-products", fetchProducts)
productRouter.delete("/delete-product/:id", deleteProduct);
productRouter.get("/fetch-product/:id", fetchSingleProduct);
productRouter.put("/update-product/:id", uploadProductImages.single("image"), updateProduct);

export default productRouter
