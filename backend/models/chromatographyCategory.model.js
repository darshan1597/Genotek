import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    title: {
        type: String,
        default: "",
        trim: true,
    },
}, { _id: false });

const TextSectionSchema = new mongoose.Schema({
    text: {
        type: String,
        default: "",
        trim: true,
    },
    points: {
        type: [String],
        default: [],
    },
}, { _id: false });

const ChromatographySubcategorySchema = new mongoose.Schema({
    image: {
        type: AssetSchema,
        default: () => ({}),
    },
    heading: {
        type: String,
        required: true,
        trim: true,
    },
    text: {
        type: String,
        default: "",
        trim: true,
    },
    points: {
        type: [String],
        default: [],
    },
    extraSections: {
        type: [TextSectionSchema],
        default: [],
    },
    documents: {
        type: [AssetSchema],
        default: [],
    },
}, { _id: true });

const ChromatographyCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    categoryImage: {
        type: AssetSchema,
        required: true,
    },
    bannerImage: {
        type: AssetSchema,
        required: true,
    },
    bannerLines: {
        type: [String],
        default: [],
    },
    heading: {
        type: String,
        default: "",
        trim: true,
    },
    text: {
        type: String,
        default: "",
        trim: true,
    },
    points: {
        type: [String],
        default: [],
    },
    extraSections: {
        type: [TextSectionSchema],
        default: [],
    },
    hasSubcategories: {
        type: Boolean,
        default: false,
    },
    documents: {
        type: [AssetSchema],
        default: [],
    },
    subcategories: {
        type: [ChromatographySubcategorySchema],
        default: [],
    },
}, { timestamps: true });

const ChromatographyCategory = mongoose.model("ChromatographyCategory", ChromatographyCategorySchema);

export default ChromatographyCategory;
