import express from "express"
import { addSubcategory, fetchSubcategories } from "../controllers/subcategory.controller.js"

const subcategoryRouter = express.Router()

subcategoryRouter.post("/add-subcategory", addSubcategory)
subcategoryRouter.get("/fetch-subcategories", fetchSubcategories)

export default subcategoryRouter
