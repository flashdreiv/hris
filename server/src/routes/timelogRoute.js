import { Router } from "express";
import {
  getTimeLogs,
  getTimeLog,
  timeIn,
  timeOut,
  timeCheckStatus,
} from "../controller/timelogController.js";
import {
  addTimelogCorrection,
  getTimelogCorrections,
} from "../controller/timelogcorrectionController.js";
const router = Router();

router.get("/check", timeCheckStatus);
router
  .route("/correction")
  .get(getTimelogCorrections)
  .post(addTimelogCorrection);
router.get("/:page", getTimeLogs);
router.route("").post(timeIn).patch(timeOut);
router.get("/:timelogId", getTimeLog);

export default router;
