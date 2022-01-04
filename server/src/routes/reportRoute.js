import { Router } from "express";
import { getReportSummary } from "../controller/reportController.js";

const router = Router();

router.get("", getReportSummary);

export default router;
