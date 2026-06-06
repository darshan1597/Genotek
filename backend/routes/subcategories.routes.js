import express from "express"
import { addSubcategory, fetchSubcategories } from "../controllers/subcategory.controller.js"
import { uploadSubcategoryImages } from "../middlewares/multer.js"

const subcategoryRouter = express.Router()

subcategoryRouter.post("/add-subcategory", uploadSubcategoryImages.single("image"), addSubcategory)
subcategoryRouter.get("/fetch-subcategories", fetchSubcategories)

export default subcategoryRouter
