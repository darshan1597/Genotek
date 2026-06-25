import multer from "multer"
import path from "path";
import fs from "fs";
import sharp from "sharp";

const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const createFilename = (originalName) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(originalName);
    const base = path
        .basename(originalName, ext)
        .replace(/[^a-z0-9_-]/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

    return `${base || "image"}-${uniqueSuffix}.webp`;
};

const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/webp", "image/jpg", "image/jpeg"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only .jpg, .jpeg, .png, .webp formats allowed!"));
};

const createUploader = (folder, maxFileSize = 5 * 1024 * 1024) => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: maxFileSize },
        fileFilter,
    });

    const processImage = async (req, res, next) => {
        if (!req.file) return next();

        try {
            const uploadPath = path.join(process.cwd(), "public", folder);
            const filename = createFilename(req.file.originalname);
            const outputPath = path.join(uploadPath, filename);

            ensureDir(uploadPath);

            await sharp(req.file.buffer)
                .rotate()
                .trim({
                    background: "#ffffff",
                    threshold: 12,
                })
                .resize({
                    width: 1200,
                    height: 1200,
                    fit: "inside",
                    withoutEnlargement: true,
                })
                .webp({ quality: 88 })
                .toFile(outputPath);

            req.file.filename = filename;
            req.file.path = outputPath;
            req.file.destination = uploadPath;
            req.file.mimetype = "image/webp";

            return next();
        } catch (error) {
            return next(error);
        }
    };

    return {
        single: (fieldName) => [upload.single(fieldName), processImage],
    };
};

export const uploadProductImages = createUploader("productImages");

const productAssetsUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const isImage = file.fieldname === "image" && ["image/png", "image/webp", "image/jpg", "image/jpeg"].includes(file.mimetype);
        const isPdf = file.fieldname === "pdf" && file.mimetype === "application/pdf";

        if (isImage || isPdf) cb(null, true);
        else cb(new Error("Only product images and PDF files are allowed"));
    },
});

const processProductAssets = async (req, res, next) => {
    try {
        const imageFile = req.files?.image?.[0];
        const pdfFile = req.files?.pdf?.[0];

        if (imageFile) {
            const uploadPath = path.join(process.cwd(), "public", "productImages");
            const filename = createFilename(imageFile.originalname);
            ensureDir(uploadPath);

            await sharp(imageFile.buffer)
                .rotate()
                .trim({ background: "#ffffff", threshold: 12 })
                .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
                .webp({ quality: 88 })
                .toFile(path.join(uploadPath, filename));

            imageFile.filename = filename;
        }

        if (pdfFile) {
            const uploadPath = path.join(process.cwd(), "public", "productPdfs");
            const base = path.basename(pdfFile.originalname, path.extname(pdfFile.originalname))
                .replace(/[^a-z0-9_-]/gi, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "")
                .toLowerCase();
            const filename = `${base || "product"}-${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`;

            ensureDir(uploadPath);
            fs.writeFileSync(path.join(uploadPath, filename), pdfFile.buffer);
            pdfFile.filename = filename;
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

export const uploadProductAssets = [
    productAssetsUpload.fields([
        { name: "image", maxCount: 1 },
        { name: "pdf", maxCount: 1 },
    ]),
    processProductAssets,
];

export const uploadCategoryImages = createUploader("categoryImages");

export const uploadSubcategoryImages = createUploader("subcategoryImages");

export const uploadHeroImages = createUploader("heroImages", 25 * 1024 * 1024);

export const uploadHeroSidebarImages = createUploader("heroSidebarImages", 15 * 1024 * 1024);

export const uploadTeamImages = createUploader("teamImages");

const chromatographyAssetsUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const isImage = file.fieldname.includes("Image") && ["image/png", "image/webp", "image/jpg", "image/jpeg"].includes(file.mimetype);
        const isPdf = file.fieldname.includes("Document") && file.mimetype === "application/pdf";

        if (isImage || isPdf) cb(null, true);
        else cb(new Error("Only chromatography images and PDF files are allowed"));
    },
});

const createPdfFilename = (originalName) => {
    const base = path.basename(originalName, path.extname(originalName))
        .replace(/[^a-z0-9_-]/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

    return `${base || "document"}-${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`;
};

const processChromatographyAssets = async (req, res, next) => {
    try {
        const imageUploadPath = path.join(process.cwd(), "public", "chromatographyImages");
        const pdfUploadPath = path.join(process.cwd(), "public", "chromatographyPdfs");

        for (const file of req.files || []) {
            if (file.mimetype === "application/pdf") {
                const filename = createPdfFilename(file.originalname);
                ensureDir(pdfUploadPath);
                fs.writeFileSync(path.join(pdfUploadPath, filename), file.buffer);
                file.filename = filename;
                continue;
            }

            const filename = createFilename(file.originalname);
            ensureDir(imageUploadPath);

            await sharp(file.buffer)
                .rotate()
                .trim({ background: "#ffffff", threshold: 12 })
                .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
                .webp({ quality: 88 })
                .toFile(path.join(imageUploadPath, filename));

            file.filename = filename;
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

export const uploadChromatographyAssets = [
    chromatographyAssetsUpload.any(),
    processChromatographyAssets,
];
