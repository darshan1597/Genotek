import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { addAdmin, changeAdminPassword, deleteAdmin, getAllAdmins, getCurrentAdmin } from "../controllers/admin.controller.js"

const adminRouter = express.Router()

adminRouter.get("/get-current-admin", isAuth, getCurrentAdmin)
adminRouter.put("/change-password", isAuth, changeAdminPassword)
adminRouter.post("/add-admin", isAuth, addAdmin)
adminRouter.get("/all-admins", isAuth, getAllAdmins)
adminRouter.delete("/delete-admin/:id", isAuth, deleteAdmin)
// adminRouter.get("/profile/:id", getAdminProfile);

export default adminRouter
