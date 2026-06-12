import Admin from "../models/admin.model.js"
import bcrypt from "bcryptjs"

const requireSuperAdmin = async (adminId) => {
    const admin = await Admin.findById(adminId)
    return admin?.role === "superAdmin" ? admin : null
}

export const getCurrentAdmin = async (req, res) => {
    try {
        const adminId = req.adminId
        if(!adminId){
            return res.status(400).json({message: "Admin id not found"})
        }
        const admin = await Admin.findById(adminId).select("-password")
        if(!admin){
            return res.status(400).json({message: "Admin not found"})
        }
        return res.status(200).json({admin})
    } catch (error) {
        return res.status(500).json({message: `Error while finding current Admin: ${error}`})
    }
}

export const changeAdminPassword = async (req, res) => {
    try {
        const adminId = req.adminId
        const { currentPassword, newPassword, confirmPassword } = req.body

        if (!adminId) {
            return res.status(400).json({ message: "Admin id not found" })
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All password fields are required" })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" })
        }

        const admin = await Admin.findById(adminId)

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" })
        }

        const passwordMatch = await bcrypt.compare(currentPassword, admin.password)

        if (!passwordMatch) {
            return res.status(400).json({ message: "Current password is incorrect" })
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10")
        admin.password = await bcrypt.hash(newPassword, saltRounds)
        await admin.save()

        return res.status(200).json({ message: "Password changed successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Error while changing password: ${error}` })
    }
}

export const addAdmin = async (req, res) => {
    try {
        const currentAdmin = await requireSuperAdmin(req.adminId)
        if (!currentAdmin) {
            return res.status(403).json({ message: "Only a super admin can add admins" })
        }

        const name = req.body.name?.trim()
        const email = req.body.email?.trim().toLowerCase()
        const password = req.body.password
        const role = req.body.role === "superAdmin" ? "superAdmin" : "admin"

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        if (await Admin.findOne({ email })) {
            return res.status(400).json({ message: "Admin already exists" })
        }

        const passwordHash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"))
        const admin = await Admin.create({ name, email, password: passwordHash, role })

        return res.status(201).json({
            message: "Admin added successfully",
            admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role, isActive: admin.isActive },
        })
    } catch (error) {
        return res.status(500).json({ message: `Error adding admin: ${error}` })
    }
}

export const getAllAdmins = async (req, res) => {
    try {
        const currentAdmin = await requireSuperAdmin(req.adminId)
        if (!currentAdmin) {
            return res.status(403).json({ message: "Only a super admin can view admins" })
        }

        const admins = await Admin.find().select("-password").sort({ createdAt: 1 })
        return res.status(200).json(admins)
    } catch (error) {
        return res.status(500).json({ message: `Error fetching admins: ${error}` })
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const currentAdmin = await requireSuperAdmin(req.adminId)
        if (!currentAdmin) {
            return res.status(403).json({ message: "Only a super admin can delete admins" })
        }

        if (req.params.id === req.adminId) {
            return res.status(400).json({ message: "You cannot delete your own account" })
        }

        const admin = await Admin.findById(req.params.id)
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" })
        }

        if (admin.role === "superAdmin" && await Admin.countDocuments({ role: "superAdmin" }) <= 1) {
            return res.status(400).json({ message: "The final super admin cannot be deleted" })
        }

        await admin.deleteOne()
        return res.status(200).json({ message: "Admin deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Error deleting admin: ${error}` })
    }
}
