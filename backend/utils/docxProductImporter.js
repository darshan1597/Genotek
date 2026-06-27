import crypto from "crypto";
import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { DOMParser } from "@xmldom/xmldom";
import sharp from "sharp";

const WORD_NAMESPACE = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const DRAWING_NAMESPACE = "http://schemas.openxmlformats.org/drawingml/2006/main";
const RELATIONSHIP_NAMESPACE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const previewRoot = path.join(process.cwd(), "public", "productImportPreviews");
const previewLifetimeMs = 24 * 60 * 60 * 1000;

const ensureDir = (directory) => {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
};

export const normalizeCas = (value) => {
    const normalized = String(value || "")
        .replace(/\s+/g, "")
        .replace(/[–—]/g, "-")
        .trim();

    return normalized.toUpperCase() === "N.A." ? "N.A." : normalized;
};

export const isValidCas = (value) => {
    const normalized = normalizeCas(value);
    return normalized.toUpperCase() === "N.A." || /^\d{2,7}-\d{2}-\d$/.test(normalized);
};

const parseProductText = (text) => {
    const sourceText = String(text || "");
    const marker = /CAS\s*No\s*\.?\s*[:.]?\s*/i.exec(sourceText);

    if (!marker) {
        return { name: sourceText.trim(), cas: "", errors: ["CAS number was not detected"] };
    }

    const name = sourceText.slice(0, marker.index).trim();
    const casText = sourceText.slice(marker.index + marker[0].length);
    const casMatch = casText.match(/[0-9][0-9\s–—-]*[0-9]/);
    const cas = normalizeCas(casMatch?.[0] || "");
    const errors = [];

    if (!name) errors.push("Product name was not detected");
    if (!isValidCas(cas)) errors.push("CAS number is invalid");

    return { name, cas, errors };
};

const relationshipMap = (relationshipsXml) => {
    const document = new DOMParser().parseFromString(relationshipsXml, "application/xml");
    const relationships = document.getElementsByTagName("Relationship");
    const mapping = new Map();

    for (let index = 0; index < relationships.length; index += 1) {
        const relationship = relationships[index];
        mapping.set(relationship.getAttribute("Id"), relationship.getAttribute("Target"));
    }

    return mapping;
};

const cellText = (cell) => {
    const paragraphs = cell.getElementsByTagNameNS(WORD_NAMESPACE, "p");
    const paragraphTexts = [];

    for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex += 1) {
        const textNodes = paragraphs[paragraphIndex].getElementsByTagNameNS(WORD_NAMESPACE, "t");
        let paragraphText = "";

        for (let textIndex = 0; textIndex < textNodes.length; textIndex += 1) {
            paragraphText += textNodes[textIndex].textContent;
        }

        if (paragraphText.length) paragraphTexts.push(paragraphText);
    }

    return paragraphTexts.join("\n");
};

const cellImageDetails = (cell) => {
    const images = cell.getElementsByTagNameNS(DRAWING_NAMESPACE, "blip");
    if (!images.length) return { relationshipId: "", crop: null };

    const relationshipId = images[0].getAttributeNS(RELATIONSHIP_NAMESPACE, "embed")
        || images[0].getAttribute("r:embed")
        || "";
    const cropNodes = cell.getElementsByTagNameNS(DRAWING_NAMESPACE, "srcRect");
    const cropNode = cropNodes[0];
    const crop = cropNode
        ? {
            left: Number(cropNode.getAttribute("l") || 0),
            top: Number(cropNode.getAttribute("t") || 0),
            right: Number(cropNode.getAttribute("r") || 0),
            bottom: Number(cropNode.getAttribute("b") || 0),
        }
        : null;

    return { relationshipId, crop };
};

const applyWordCrop = async (imageBuffer, crop) => {
    if (!crop || !Object.values(crop).some((value) => value > 0)) {
        return sharp(imageBuffer);
    }

    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;

    if (!width || !height) return sharp(imageBuffer);

    const left = Math.max(0, Math.min(width - 1, Math.round(width * crop.left / 100000)));
    const top = Math.max(0, Math.min(height - 1, Math.round(height * crop.top / 100000)));
    const right = Math.max(0, Math.min(width - left - 1, Math.round(width * crop.right / 100000)));
    const bottom = Math.max(0, Math.min(height - top - 1, Math.round(height * crop.bottom / 100000)));

    return sharp(imageBuffer).extract({
        left,
        top,
        width: width - left - right,
        height: height - top - bottom,
    });
};

export const cleanupExpiredProductImportPreviews = () => {
    ensureDir(previewRoot);
    const expiryTime = Date.now() - previewLifetimeMs;

    for (const entry of fs.readdirSync(previewRoot, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;

        const directory = path.join(previewRoot, entry.name);
        if (fs.statSync(directory).mtimeMs < expiryTime) {
            fs.rmSync(directory, { recursive: true, force: true });
        }
    }
};

export const parseDocxProductPreview = async (buffer) => {
    cleanupExpiredProductImportPreviews();

    const zip = await JSZip.loadAsync(buffer);
    const documentEntry = zip.file("word/document.xml");
    const relationshipsEntry = zip.file("word/_rels/document.xml.rels");

    if (!documentEntry || !relationshipsEntry) {
        throw new Error("The uploaded file is not a valid DOCX document");
    }

    const [documentXml, relationshipsXml] = await Promise.all([
        documentEntry.async("string"),
        relationshipsEntry.async("string"),
    ]);
    const document = new DOMParser().parseFromString(documentXml, "application/xml");
    const cells = document.getElementsByTagNameNS(WORD_NAMESPACE, "tc");
    const relationships = relationshipMap(relationshipsXml);
    const token = crypto.randomUUID();
    const previewDirectory = path.join(previewRoot, token);
    const products = [];

    ensureDir(previewDirectory);

    try {
        for (let index = 0; index < cells.length; index += 1) {
            const cell = cells[index];
            const text = cellText(cell);
            const { relationshipId, crop } = cellImageDetails(cell);

            if (!text && !relationshipId) continue;

            const parsed = parseProductText(text);
            const errors = [...parsed.errors];
            let imageFile = "";

            if (!relationshipId) {
                errors.push("Product image was not detected");
            } else {
                const target = relationships.get(relationshipId);
                const normalizedTarget = target?.replace(/^(\.\.\/)+/, "") || "";
                const imageEntry = normalizedTarget ? zip.file(`word/${normalizedTarget}`) : null;

                if (!imageEntry) {
                    errors.push("Product image could not be read");
                } else {
                    const imageBuffer = await imageEntry.async("nodebuffer");
                    imageFile = `product-${String(products.length + 1).padStart(3, "0")}.webp`;
                    const imagePipeline = await applyWordCrop(imageBuffer, crop);
                    await imagePipeline
                        .rotate()
                        .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
                        .webp({ quality: 88 })
                        .toFile(path.join(previewDirectory, imageFile));
                }
            }

            products.push({
                sourceIndex: index,
                name: parsed.name,
                cas: parsed.cas,
                imageFile,
                errors,
            });
        }

        if (!products.length) {
            throw new Error("No product cells were detected in the DOCX document");
        }

        const manifest = {
            createdAt: new Date().toISOString(),
            products: products.map(({ sourceIndex, imageFile }) => ({ sourceIndex, imageFile })),
        };
        fs.writeFileSync(
            path.join(previewDirectory, "manifest.json"),
            JSON.stringify(manifest, null, 2),
            "utf8"
        );

        return {
            token,
            products: products.map((product) => ({
                ...product,
                imageUrl: product.imageFile
                    ? `/productImportPreviews/${token}/${product.imageFile}`
                    : "",
            })),
        };
    } catch (error) {
        fs.rmSync(previewDirectory, { recursive: true, force: true });
        throw error;
    }
};

export const readProductImportPreview = (token) => {
    if (!/^[0-9a-f-]{36}$/i.test(String(token || ""))) return null;

    const directory = path.join(previewRoot, token);
    const manifestPath = path.join(directory, "manifest.json");
    if (!fs.existsSync(manifestPath)) return null;

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (Date.now() - new Date(manifest.createdAt).getTime() > previewLifetimeMs) {
        fs.rmSync(directory, { recursive: true, force: true });
        return null;
    }

    return { directory, manifest };
};

export const removeProductImportPreview = (token) => {
    if (!/^[0-9a-f-]{36}$/i.test(String(token || ""))) return;
    fs.rmSync(path.join(previewRoot, token), { recursive: true, force: true });
};
