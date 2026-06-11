import express from "express";
import { fetchHeroSidebarItems, fetchHeroSlides, updateHeroSidebarItem, updateHeroSlide } from "../controllers/heroSlide.controller.js";
import { uploadHeroImages, uploadHeroSidebarImages } from "../middlewares/multer.js";

const heroSlidesRouter = express.Router();

heroSlidesRouter.get("/", fetchHeroSlides);
heroSlidesRouter.get("/sidebar", fetchHeroSidebarItems);
heroSlidesRouter.put("/sidebar/:itemId", uploadHeroSidebarImages.single("image"), updateHeroSidebarItem);
heroSlidesRouter.put("/:slideId", uploadHeroImages.single("image"), updateHeroSlide);

export default heroSlidesRouter;
