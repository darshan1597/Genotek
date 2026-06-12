import mongoose from "mongoose";

const pdfDownloadFormSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        organization: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        number: { type: String, required: true, trim: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
        productName: { type: String, required: true },
        cas: { type: String, default: "" },
        action: { type: String, default: "PDF downloaded" },
    },
    { timestamps: true }
);

const PdfDownloadForm = mongoose.model("PdfDownloadForm", pdfDownloadFormSchema);

export default PdfDownloadForm;
