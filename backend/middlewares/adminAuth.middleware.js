import jwt from "jsonwebtoken"
import Admin from "../models/admin.model.js"

export const requireAdminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || ""
        const [scheme, token] = authHeader.split(" ")

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Admin authentication required." })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const adminId = payload.adminId || payload.id
        const admin = await Admin.findById(adminId).select("-password")

        if (!admin || !admin.isActive) {
            return res.status(401).json({ message: "Admin authentication required." })
        }

        req.admin = admin
        return next()
    } catch (error) {
        return res.status(401).json({ message: "Admin authentication required." })
    }
}
