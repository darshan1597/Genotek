import multer from "multer"
import path from "path";
import fs from "fs";

const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const createStorage = (folder) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = `./public/${folder}`;
            ensureDir(uploadPath);
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            const base = path.basename(file.originalname, ext);
            cb(null, `${base}-${uniqueSuffix}${ext}`);
        },
    });

const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/webp", "image/jpg", "image/jpeg"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only .jpg, .jpeg, .png, .webp formats allowed!"));
};

export const uploadProductImages = multer({
    storage: createStorage("productImages"),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});
