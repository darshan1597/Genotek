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

const createUploader = (folder) => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 },
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

export const uploadCategoryImages = createUploader("categoryImages");

export const uploadSubcategoryImages = createUploader("subcategoryImages");
