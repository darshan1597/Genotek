import mongoose from "mongoose"

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, { _id: false })

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: ImageSchema,
            required: true,
        },
    },
    { timestamps: true }
)

subcategorySchema.index({ name: 1, category: 1 }, { unique: true })

const Subcategory = mongoose.model("Subcategory", subcategorySchema)

export default Subcategory
