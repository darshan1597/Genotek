import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentAdmin } from "../controllers/admin.controller.js"

const adminRouter = express.Router()

adminRouter.get("/get-current-admin", isAuth, getCurrentAdmin)
// adminRouter.get("/all-admins", getAllAdmins);
// adminRouter.delete("/delete-admin/:id", deleteAdmin);
// adminRouter.get("/profile/:id", getAdminProfile);
// adminRouter.put("/change-password/:id", changeAdminPassword);

export default adminRouter
