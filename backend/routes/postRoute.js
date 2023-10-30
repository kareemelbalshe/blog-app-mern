import { Router } from "express";
import { photoUpload } from "../middlewares/photoUpload.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createPostCtrl, deletePostCtrl, getAllPostsCtrl, getPostsCountCtrl, getSenglePostsCtrl, toggleLikeCtrl, updatePostCtrl, updatePostPhoto } from "../controllers/postController.js";
import validateObject from "../middlewares/validateObject.js";

const router = new Router()

router.route("/")
    .post(verifyToken, photoUpload.single("image"), createPostCtrl)
    .get(getAllPostsCtrl)

router.route("/count").get(getPostsCountCtrl)

router.route("/:id")
    .get(validateObject, getSenglePostsCtrl)
    .delete(validateObject, verifyToken, deletePostCtrl)
    .put(validateObject, verifyToken, updatePostCtrl)

router.route("/update-image/:id")
    .put(validateObject, verifyToken, photoUpload.single("image"), updatePostPhoto)

router.route("/like/:id").put(validateObject, verifyToken, toggleLikeCtrl)

export default router