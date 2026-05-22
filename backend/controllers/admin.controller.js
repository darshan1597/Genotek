import Admin from "../models/admin.model.js"
import bcrypt from "bcryptjs"

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
