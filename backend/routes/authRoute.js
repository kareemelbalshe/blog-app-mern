import { Router } from "express";
import { registerUserCtrl, loginUserCtrl, verifyUserAccountCtrl } from "../controllers/authController.js";

const router = new Router()

router.post("/register", registerUserCtrl)

router.post("/login", loginUserCtrl)

router.get("/:userId/verify/:token", verifyUserAccountCtrl)

export default router