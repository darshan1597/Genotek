import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }
}, { _id: false })

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    subcategory: {
        type: String,
        trim: true,
        default: "",
    },
    cas: {
        type: String, 
        required: true 
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    image: {
        type: ImageSchema,
        required: true
    },
    pdf: {
        name: {
            type: String,
            default: "",
        },
    },
}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema)

export default Product
