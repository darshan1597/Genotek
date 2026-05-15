import bcrypt from "bcryptjs"
import Admin from "../models/admin.model.js"
import genToken from "../utils/token.js"

const toPublicAdmin = (admin) => ({
    id: admin._id,
    name: admin.name,
    email: admin.email,
    isPrimaryAdmin: admin.isPrimaryAdmin,
})

export const loginAdmin = async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase()
        const password = String(req.body.password || "")

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." })
        }

        const admin = await Admin.findOne({ email })
        if (!admin || !admin.isActive) {
            return res.status(401).json({ message: "Invalid admin credentials." })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid admin credentials." })
        }

        const token = await genToken(admin._id)
        if (!token) {
            return res.status(500).json({ message: "Unable to create login session." })
        }

        return res.json({
            token,
            admin: toPublicAdmin(admin),
        })
    } catch (error) {
        console.log("Admin login error", error)
        return res.status(500).json({ message: "Unable to login right now." })
    }
}

export const getCurrentAdmin = async (req, res) => {
    return res.json({ admin: toPublicAdmin(req.admin) })
}
