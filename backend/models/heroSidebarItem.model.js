import mongoose from "mongoose";

const heroSidebarItemSchema = new mongoose.Schema(
    {
        itemId: {
            type: String,
            required: true,
            unique: true,
            enum: ["sidebar-1", "sidebar-2", "sidebar-3"],
        },
        label: { type: String, required: true },
        href: { type: String, required: true },
        image: {
            name: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

const HeroSidebarItem = mongoose.model("HeroSidebarItem", heroSidebarItemSchema);

export default HeroSidebarItem;
