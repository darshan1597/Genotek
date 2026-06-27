import { sendContactEnquiryEmail } from "../utils/pdfDownloadMailer.js";

export const submitContactEnquiry = async (req, res) => {
    try {
        const name = String(req.body.name || "").trim();
        const organization = String(req.body.organization || "").trim();
        const email = String(req.body.email || "").trim();
        const subject = String(req.body.subject || "").trim();
        const message = String(req.body.message || "").trim();

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email and message are required" });
        }

        await sendContactEnquiryEmail({
            name,
            organization,
            email,
            subject,
            message,
        });

        return res.status(200).json({ message: "Your enquiry has been sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Unable to send your enquiry. Please try again." });
    }
};
