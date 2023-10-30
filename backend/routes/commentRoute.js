import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { createCommentCtrl, deleteCommentCtrl, getAllCommentsCtrl, updateCommentCtrl } from "../controllers/commentController.js";
import validateObject from "../middlewares/validateObject.js";

const router = new Router()

router.route("/")
    .post(verifyToken, createCommentCtrl)
    .get(verifyTokenAndAdmin, getAllCommentsCtrl)

router.route("/:id")
    .delete(validateObject, verifyToken, deleteCommentCtrl)
    .put(validateObject, verifyToken, updateCommentCtrl)

export default router