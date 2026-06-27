import nodemailer from "nodemailer";

const escapeHtml = (value) =>
    String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

const row = (label, value) => `
    <tr>
        <td style="padding:8px 12px;border:1px solid #d7e5ee;font-weight:600;color:#214f86">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border:1px solid #d7e5ee;color:#23384d">${escapeHtml(value || "-")}</td>
    </tr>
`;

const getTransporter = () => {
    const port = Number(process.env.SMTP_PORT || 465);

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASS must be configured");
    }

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: process.env.SMTP_SECURE
            ? process.env.SMTP_SECURE === "true"
            : port === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

const sendNotification = async ({ subject, heading, rows }) => {
    const from = process.env.PDF_MAIL_FROM || "website@genotekbio.com";
    const to = process.env.PDF_NOTIFICATION_TO || "info@genotekbio.com";

    await getTransporter().sendMail({
        from: `Genotek Website <${from}>`,
        to,
        subject,
        text: rows.map(([label, value]) => `${label}: ${value || "-"}`).join("\n"),
        html: `
            <div style="font-family:Arial,sans-serif;max-width:680px;color:#23384d">
                <h2 style="color:#214f86">${escapeHtml(heading)}</h2>
                <table style="width:100%;border-collapse:collapse">
                    ${rows.map(([label, value]) => row(label, value)).join("")}
                </table>
            </div>
        `,
    });
};

export const sendInitialPdfDownloadEmail = async ({ form, productInfo, pdfName, pdfFileName }) =>
    sendNotification({
        subject: `PDF download form: ${pdfName}`,
        heading: "New PDF download form submission",
        rows: [
            ["Name", form.name],
            ["Organization", form.organization],
            ["Email", form.email],
            ["Mobile No.", form.number],
            ["Product / Category", productInfo],
            ["PDF name", pdfName],
            ["PDF file", pdfFileName],
        ],
    });

export const sendRepeatPdfDownloadEmail = async ({ userName, productInfo, pdfName, pdfFileName }) =>
    sendNotification({
        subject: `Repeat PDF download: ${pdfName}`,
        heading: "This user already Submitted the form",
        rows: [
            ["Form status", "Already submitted - view full user details in the admin panel"],
            ["Name", userName],
            ["Product / Category", productInfo],
            ["PDF name", pdfName],
            ["PDF file", pdfFileName],
        ],
    });

export const sendContactEnquiryEmail = async ({ name, organization, email, subject, message }) => {
    const from = process.env.PDF_MAIL_FROM || "website@genotekbio.com";
    const to = process.env.PDF_NOTIFICATION_TO || "info@genotekbio.com";
    const enquirySubject = subject || "New Genotek website enquiry";
    const rows = [
        ["Name", name],
        ["Organization", organization],
        ["Email", email],
        ["Subject", enquirySubject],
        ["Message", message],
    ];

    await getTransporter().sendMail({
        from: `Genotek Website <${from}>`,
        to,
        replyTo: email,
        subject: enquirySubject,
        text: rows.map(([label, value]) => `${label}: ${value || "-"}`).join("\n"),
        html: `
            <div style="font-family:Arial,sans-serif;max-width:680px;color:#23384d">
                <h2 style="color:#214f86">Website Contact enquiry</h2>
                <table style="width:100%;border-collapse:collapse">
                    ${rows.map(([label, value]) => row(label, value)).join("")}
                </table>
            </div>
        `,
    });
};
