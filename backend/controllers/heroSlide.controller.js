import fs from "fs";
import path from "path";
import HeroSlide from "../models/heroSlide.model.js";
import HeroSidebarItem from "../models/heroSidebarItem.model.js";

export const fetchHeroSlides = async (req, res) => {
    try {
        const slides = await HeroSlide.find();
        return res.status(200).json(slides);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching hero slides ${error}` });
    }
};

export const updateHeroSlide = async (req, res) => {
    try {
        const { slideId } = req.params;
        const variant = req.body.variant === "normal" ? "normal" : "special";
        let lines = [];

        if (req.body.lines) {
            try {
                lines = JSON.parse(req.body.lines);
            } catch {
                return res.status(400).json({ message: "Invalid slide lines" });
            }
        }

        let slide = await HeroSlide.findOne({ slideId });
        const previousImageName = slide?.image?.name;

        if (!slide) {
            slide = new HeroSlide({ slideId, variant });
        }

        slide.variant = variant;
        slide.title = variant === "special" ? req.body.title || "" : "";
        slide.subtitle = variant === "special" ? req.body.subtitle || "" : "";
        slide.lines = variant === "normal" ? lines : [];

        if (req.file) {
            slide.image = { name: req.file.filename };
        }

        await slide.save();

        if (req.file && previousImageName && previousImageName !== req.file.filename) {
            const previousImagePath = path.join(process.cwd(), "public", "heroImages", previousImageName);
            if (fs.existsSync(previousImagePath)) fs.unlinkSync(previousImagePath);
        }

        return res.status(200).json({ message: "Hero slide updated", slide });
    } catch (error) {
        return res.status(500).json({ message: `Error updating hero slide ${error}` });
    }
};

export const fetchHeroSidebarItems = async (req, res) => {
    try {
        const items = await HeroSidebarItem.find();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching hero side sections ${error}` });
    }
};

export const updateHeroSidebarItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const label = req.body.label?.trim();
        const href = req.body.href?.trim();

        if (!label || !href) {
            return res.status(400).json({ message: "Side section text and URL are required" });
        }

        let item = await HeroSidebarItem.findOne({ itemId });
        const previousImageName = item?.image?.name;

        if (!item) item = new HeroSidebarItem({ itemId, label, href });

        item.label = label;
        item.href = href;
        if (req.file) item.image = { name: req.file.filename };

        await item.save();

        if (req.file && previousImageName && previousImageName !== req.file.filename) {
            const previousImagePath = path.join(process.cwd(), "public", "heroSidebarImages", previousImageName);
            if (fs.existsSync(previousImagePath)) fs.unlinkSync(previousImagePath);
        }

        return res.status(200).json({ message: "Hero side section updated", item });
    } catch (error) {
        return res.status(500).json({ message: `Error updating hero side section ${error}` });
    }
};
