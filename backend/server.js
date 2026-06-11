import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import adminAuthRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import categoryRouter from "./routes/categories.routes.js";
import productRouter from "./routes/products.routes.js";
import subcategoryRouter from "./routes/subcategories.routes.js";
import heroSlidesRouter from "./routes/heroSlides.routes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(process.cwd(), "public")))

app.use("/api/auth/admin", adminAuthRouter)

app.use("/api/admin", adminRouter)

app.use("/api/categories", categoryRouter)

app.use("/api/subcategories", subcategoryRouter)

app.use("/api/products", productRouter)

app.use("/api/hero-slides", heroSlidesRouter)

const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })

    try {
        await connectDb()
    } catch (error) {
        console.log("Database startup failed", error.message)
    }
}

startServer().catch((error) => {
    console.log("Server startup failed", error)
    process.exit(1)
})
