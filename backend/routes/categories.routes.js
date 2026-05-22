import express from "express"
import { addCategory, fetchCategories } from "../controllers/category.controller.js"

const categoryRouter = express.Router()

categoryRouter.post("/add-category", addCategory)
categoryRouter.get("/fetch-category", fetchCategories)

export default categoryRouter
