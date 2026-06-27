import express from "express"
import { addCategory, deleteCategory, fetchCategories, fetchCategoryLimitStatus, fetchSingleCategory, updateCategory, updateCategorySettings } from "../controllers/category.controller.js"
import { uploadCategoryImages } from "../middlewares/multer.js"

const categoryRouter = express.Router()

categoryRouter.post("/add-category", uploadCategoryImages.single("image"), addCategory)
categoryRouter.get("/category-limit", fetchCategoryLimitStatus)
categoryRouter.get("/fetch-category", fetchCategories)
categoryRouter.get("/fetch-category/:id", fetchSingleCategory)
categoryRouter.put("/update-category/:id", uploadCategoryImages.single("image"), updateCategory)
categoryRouter.delete("/delete-category/:id", deleteCategory)
categoryRouter.patch("/update-category-settings/:id", updateCategorySettings)

export default categoryRouter
