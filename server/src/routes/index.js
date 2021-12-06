import { Router } from "express";
import authRouter from "./authRoute.js";
import User from "../models/user.js";
const router = Router();

router.use("/auth", authRouter);

router.use(async (req, res) => {
  try {
    const user = await User.findById(req.session.id);
    req.user = user;
    next();
  } catch {
    res
      .status(401)
      .json({ error: "You are not authorized to perform that action" });
  }
});

export default router;
