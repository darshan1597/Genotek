import Admin from "../models/admin.model.js"

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
