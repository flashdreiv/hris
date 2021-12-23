import { Router } from "express";
import authRouter from "./authRoute.js";
import { authToken, generateRefreshToken } from "../middleware/authorize.js";
import timelogRouter from "./timelogRoute.js";
import userRouter from "./userRoute.js";
const router = Router();

router.use("/auth", authRouter);
router.use(authToken);
router.post("/token", generateRefreshToken);
router.use("/users", userRouter);
router.use("/timelog", timelogRouter);

export default router;
