import { Router } from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoryCtrl } from "../controllers/categoryController.js";
import validateObject from "../middlewares/validateObject.js";

const router = new Router()

router.route("/")
    .post(verifyTokenAndAdmin, createCategoryCtrl)
    .get(getAllCategoryCtrl)

router.route("/:id").delete(validateObject, verifyTokenAndAdmin, deleteCategoryCtrl)

export default router