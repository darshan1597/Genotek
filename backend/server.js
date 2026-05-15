import express from "express";
import dotenv from "dotenv";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import connectDb from "./config/db.js";
import { ensurePrimaryAdmin } from "./config/bootstrapAdmin.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    const allowedOrigins = (
        process.env.CORS_ORIGIN || "http://localhost:5174,http://127.0.0.1:5174"
    )
        .split(",")
        .map((origin) => origin.trim())
    const requestOrigin = req.headers.origin

    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
        res.setHeader("Access-Control-Allow-Origin", requestOrigin)
    }

    res.setHeader("Vary", "Origin")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")

    if (req.method === "OPTIONS") {
        return res.sendStatus(204)
    }

    return next()
})

app.use(express.json())

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" })
})

app.use("/api/admin", adminAuthRoutes)

const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })

    try {
        await connectDb()
        await ensurePrimaryAdmin()
    } catch (error) {
        console.log("Database startup failed", error.message)
    }
}

startServer().catch((error) => {
    console.log("Server startup failed", error)
    process.exit(1)
})
