import PdfDownloadForm from "../models/pdfDownloadForm.model.js";
import Product from "../models/product.model.js";

export const submitPdfDownloadForm = async (req, res) => {
    try {
        const { name, organization, email, number, productId, documentName, documentContext } = req.body;

        if (!name?.trim() || !organization?.trim() || !email?.trim() || !number?.trim() || (!productId && !documentName?.trim())) {
            return res.status(400).json({ message: "All form fields are required" });
        }

        let product = null;
        if (productId) {
            product = await Product.findById(productId);
            if (!product?.pdf?.name) {
                return res.status(404).json({ message: "Product PDF not found" });
            }
        }

        const form = await PdfDownloadForm.create({
            name,
            organization,
            email,
            number,
            productId: product?._id || null,
            productName: product?.name || documentName,
            cas: product?.cas || documentContext || "",
        });

        return res.status(201).json({ message: "Form submitted", form });
    } catch (error) {
        return res.status(500).json({ message: `Error submitting PDF download form ${error}` });
    }
};

export const fetchPdfDownloadForms = async (req, res) => {
    try {
        const forms = await PdfDownloadForm.find().sort({ createdAt: -1 });
        return res.status(200).json(forms);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching PDF download forms ${error}` });
    }
};
