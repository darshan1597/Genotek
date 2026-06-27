import PdfDownloadForm from "../models/pdfDownloadForm.model.js";
import Product from "../models/product.model.js";
import jwt from "jsonwebtoken";
import {
    sendInitialPdfDownloadEmail,
    sendRepeatPdfDownloadEmail,
} from "../utils/pdfDownloadMailer.js";

const PDF_LEAD_COOKIE = "genotekPdfLead";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const setPdfLeadCookie = (res, formId) => {
    const token = jwt.sign({ pdfDownloadFormId: formId }, process.env.JWT_SECRET, {
        expiresIn: "365d",
    });

    res.cookie(PDF_LEAD_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: ONE_YEAR_MS,
        path: "/",
    });
};

const getDocumentDetails = async ({ productId, documentName, documentContext, documentFileName }) => {
    let product = null;

    if (productId) {
        product = await Product.findById(productId);
        if (!product?.pdf?.name) {
            const error = new Error("Product PDF not found");
            error.status = 404;
            throw error;
        }
    }

    return {
        product,
        productInfo: product
            ? `${product.name} | Category: ${product.category} | CAS: ${product.cas}`
            : String(documentContext || "Chromatography document").trim(),
        pdfName: product?.name || String(documentName || "").trim(),
        pdfFileName: product?.pdf?.name || String(documentFileName || documentName || "").trim(),
    };
};

export const submitPdfDownloadForm = async (req, res) => {
    try {
        const { name, organization, email, number, productId, documentName, documentContext, documentFileName } = req.body;

        if (!name?.trim() || !organization?.trim() || !email?.trim() || !number?.trim() || (!productId && !documentName?.trim())) {
            return res.status(400).json({ message: "All form fields are required" });
        }

        const { product, productInfo, pdfName, pdfFileName } = await getDocumentDetails({
            productId,
            documentName,
            documentContext,
            documentFileName,
        });

        const form = await PdfDownloadForm.create({
            name: name.trim(),
            organization: organization.trim(),
            email: email.trim(),
            number: number.trim(),
            productId: product?._id || null,
            productName: product?.name || documentName,
            cas: product?.cas || documentContext || "",
        });

        try {
            await sendInitialPdfDownloadEmail({ form, productInfo, pdfName, pdfFileName });
        } catch (mailError) {
            await form.deleteOne();
            throw mailError;
        }

        setPdfLeadCookie(res, form._id.toString());
        return res.status(201).json({ message: "Form submitted", form });
    } catch (error) {
        if (error.status) return res.status(error.status).json({ message: error.message });
        return res.status(500).json({ message: `Error submitting PDF download form ${error}` });
    }
};

export const notifyRepeatPdfDownload = async (req, res) => {
    try {
        const token = req.cookies[PDF_LEAD_COOKIE];
        if (!token) return res.status(401).json({ message: "PDF form details are required" });

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.status(401).json({ message: "PDF form details have expired" });
        }

        const form = await PdfDownloadForm.findById(payload.pdfDownloadFormId);
        if (!form) return res.status(401).json({ message: "PDF form details were not found" });

        const { productInfo, pdfName, pdfFileName } = await getDocumentDetails(req.body);
        await sendRepeatPdfDownloadEmail({
            userName: form.name,
            productInfo,
            pdfName,
            pdfFileName,
        });

        return res.status(200).json({ message: "Download notification sent" });
    } catch (error) {
        if (error.status) return res.status(error.status).json({ message: error.message });
        return res.status(500).json({ message: `Error sending PDF download notification ${error}` });
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
