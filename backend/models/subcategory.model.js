import mongoose from "mongoose"

const subcategorySchema = new mongoose.Schema(
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
        category: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
)

subcategorySchema.index({ name: 1, category: 1 }, { unique: true })

const Subcategory = mongoose.model("Subcategory", subcategorySchema)

export default Subcategory
