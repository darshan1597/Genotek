import express from "express"
import { addCategory, fetchCategories } from "../controllers/category.controller.js"
import { uploadCategoryImages } from "../middlewares/multer.js"

const categoryRouter = express.Router()

categoryRouter.post("/add-category", uploadCategoryImages.single("image"), addCategory)
categoryRouter.get("/fetch-category", fetchCategories)

export default categoryRouter
