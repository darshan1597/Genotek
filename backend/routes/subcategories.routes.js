import express from "express"
import { addSubcategory, deleteSubcategory, fetchSingleSubcategory, fetchSubcategories, updateSubcategory } from "../controllers/subcategory.controller.js"
import { uploadSubcategoryImages } from "../middlewares/multer.js"

const subcategoryRouter = express.Router()

subcategoryRouter.post("/add-subcategory", uploadSubcategoryImages.single("image"), addSubcategory)
subcategoryRouter.get("/fetch-subcategories", fetchSubcategories)
subcategoryRouter.get("/fetch-subcategory/:id", fetchSingleSubcategory)
subcategoryRouter.put("/update-subcategory/:id", uploadSubcategoryImages.single("image"), updateSubcategory)
subcategoryRouter.delete("/delete-subcategory/:id", deleteSubcategory)

export default subcategoryRouter
