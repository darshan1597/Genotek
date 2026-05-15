import express from "express"
import { getCurrentAdmin, loginAdmin } from "../controllers/adminAuth.controller.js"
import { requireAdminAuth } from "../middlewares/adminAuth.middleware.js"

const router = express.Router()

router.post("/login", loginAdmin)
router.get("/me", requireAdminAuth, getCurrentAdmin)

export default router
