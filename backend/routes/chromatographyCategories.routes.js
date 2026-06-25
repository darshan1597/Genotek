import express from "express";
import {
    addChromatographyCategory,
    deleteChromatographyCategory,
    fetchChromatographyCategories,
    fetchChromatographyCategoryBySlug,
    updateChromatographyCategory,
} from "../controllers/chromatographyCategory.controller.js";
import { uploadChromatographyAssets } from "../middlewares/multer.js";

const chromatographyCategoryRouter = express.Router();

chromatographyCategoryRouter.get("/", fetchChromatographyCategories);
chromatographyCategoryRouter.get("/:slug", fetchChromatographyCategoryBySlug);
chromatographyCategoryRouter.post("/", uploadChromatographyAssets, addChromatographyCategory);
chromatographyCategoryRouter.put("/:id", uploadChromatographyAssets, updateChromatographyCategory);
chromatographyCategoryRouter.delete("/:id", deleteChromatographyCategory);

export default chromatographyCategoryRouter;
