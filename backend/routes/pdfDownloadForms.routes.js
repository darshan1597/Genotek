import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { fetchPdfDownloadForms, notifyRepeatPdfDownload, submitPdfDownloadForm } from "../controllers/pdfDownloadForm.controller.js";

const pdfDownloadFormsRouter = express.Router();

pdfDownloadFormsRouter.post("/", submitPdfDownloadForm);
pdfDownloadFormsRouter.post("/download", notifyRepeatPdfDownload);
pdfDownloadFormsRouter.get("/", isAuth, fetchPdfDownloadForms);

export default pdfDownloadFormsRouter;
