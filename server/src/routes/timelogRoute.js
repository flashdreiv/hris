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
  updateTimelogCorrection,
  deleteTimelogCorrection,
} from "../controller/timelogcorrectionController.js";
const router = Router();

router.get("/check", timeCheckStatus);
router
  .route("/correction")
  .get(getTimelogCorrections)
  .post(addTimelogCorrection);
router
  .route("/correction/:timelogId")
  .patch(updateTimelogCorrection)
  .delete(deleteTimelogCorrection);
router.get("/:page", getTimeLogs);
router.route("").post(timeIn).patch(timeOut);
router.route("/:timelogId").get(getTimeLog);

export default router;
