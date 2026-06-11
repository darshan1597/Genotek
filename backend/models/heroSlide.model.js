import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
    {
        slideId: {
            type: String,
            required: true,
            unique: true,
            enum: ["intro", "deliver", "innovation", "reach", "outro"],
        },
        variant: {
            type: String,
            required: true,
            enum: ["special", "normal"],
        },
        title: { type: String, default: "" },
        subtitle: { type: String, default: "" },
        lines: {
            type: [[String]],
            default: [],
        },
        image: {
            name: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

const HeroSlide = mongoose.model("HeroSlide", heroSlideSchema);

export default HeroSlide;
