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
    cas: {
        type: String, 
        required: true 
    },
    image: {
        type: ImageSchema,
        required: true
    },
}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema)

export default Product
