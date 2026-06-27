import express from "express";
import { submitContactEnquiry } from "../controllers/contact.controller.js";

const contactRouter = express.Router();

contactRouter.post("/", submitContactEnquiry);

export default contactRouter;
