import express from "express";
import { addTeamMember, deleteTeamMember, fetchTeamMember, fetchTeamMembers, updateTeamMember } from "../controllers/teamMember.controller.js";
import { uploadTeamImages } from "../middlewares/multer.js";

const teamMembersRouter = express.Router();

teamMembersRouter.get("/", fetchTeamMembers);
teamMembersRouter.get("/:id", fetchTeamMember);
teamMembersRouter.post("/", uploadTeamImages.single("image"), addTeamMember);
teamMembersRouter.put("/:id", uploadTeamImages.single("image"), updateTeamMember);
teamMembersRouter.delete("/:id", deleteTeamMember);

export default teamMembersRouter;
