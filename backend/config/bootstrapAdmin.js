import bcrypt from "bcryptjs"
import Admin from "../models/admin.model.js"
import defaultAdminConfig from "./defaultAdmin.js"

function resolveBootstrapAdmin() {
    return {
        name: String(process.env.DEFAULT_ADMIN_NAME || defaultAdminConfig.name || "").trim(),
        email: String(process.env.DEFAULT_ADMIN_EMAIL || defaultAdminConfig.email || "").trim().toLowerCase(),
        password: String(process.env.DEFAULT_ADMIN_PASSWORD || defaultAdminConfig.password || ""),
    }
}

export const ensurePrimaryAdmin = async () => {
    const existingPrimaryAdmin = await Admin.findOne({ isPrimaryAdmin: true })
    if (existingPrimaryAdmin) return existingPrimaryAdmin

    const existingAdminCount = await Admin.countDocuments()
    if (existingAdminCount > 0) {
        const oldestAdmin = await Admin.findOne().sort({ createdAt: 1 })
        if (oldestAdmin) {
            oldestAdmin.isPrimaryAdmin = true
            await oldestAdmin.save()
            return oldestAdmin
        }
    }

    const bootstrapAdmin = resolveBootstrapAdmin()
    if (!bootstrapAdmin.name || !bootstrapAdmin.email || !bootstrapAdmin.password) {
        console.log("Primary admin bootstrap skipped: missing default admin config.")
        return null
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
    const hashedPassword = await bcrypt.hash(bootstrapAdmin.password, saltRounds)

    const admin = await Admin.create({
        name: bootstrapAdmin.name,
        email: bootstrapAdmin.email,
        password: hashedPassword,
        isPrimaryAdmin: true,
        isActive: true,
    })

    console.log(`Primary admin created for ${admin.email}`)
    return admin
}

export const getBootstrapAdminPreview = () => {
    const bootstrapAdmin = resolveBootstrapAdmin()

    return {
        name: bootstrapAdmin.name,
        email: bootstrapAdmin.email,
        passwordHint: bootstrapAdmin.password ? "Configured" : "Missing",
        source: process.env.DEFAULT_ADMIN_EMAIL ? "env" : "backend/config/defaultAdmin.js",
    }
}
