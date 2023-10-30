import { Router } from "express";
import { deleteUserProfileCtrl, getAllUsersCtrl, getUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl, updateUserProfileCtrl } from "../controllers/userController.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndOnlyUser } from "../middlewares/verifyToken.js";
import validateObject from "../middlewares/validateObject.js";
import { photoUpload } from "../middlewares/photoUpload.js";

const router = new Router()

router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl)

router.route("/profile/:id")
    .get(validateObject, getUserProfileCtrl)
    .put(validateObject, verifyTokenAndOnlyUser, updateUserProfileCtrl)
    .delete(validateObject, verifyTokenAndAuthorization, deleteUserProfileCtrl)

router.route("/profile/profile-photo-upload")
    .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl)

router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl)


export default router