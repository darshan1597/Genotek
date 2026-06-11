import mongoose from "mongoose"

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { _id: false })

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        hasSubcategories: {
            type: Boolean,
            default: false,
        },
        isStandalone: {
            type: Boolean,
            default: false,
        },
        image: {
            type: ImageSchema,
            required: true,
        },
    },
    { timestamps: true }
)

const Category = mongoose.model("Category", categorySchema)

export default Category
