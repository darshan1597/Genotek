import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { changeAdminPassword, getCurrentAdmin } from "../controllers/admin.controller.js"

const adminRouter = express.Router()

adminRouter.get("/get-current-admin", isAuth, getCurrentAdmin)
adminRouter.put("/change-password", isAuth, changeAdminPassword)
// adminRouter.get("/all-admins", getAllAdmins);
// adminRouter.delete("/delete-admin/:id", deleteAdmin);
// adminRouter.get("/profile/:id", getAdminProfile);

export default adminRouter
