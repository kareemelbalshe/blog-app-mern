import asyncHandler from "express-async-handler"
import UserSchema, { validateUpdateUser } from "../models/User.js"
import bcrypt from 'bcryptjs'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from "fs"
import { cloudinaryRemoveImage, cloudinaryRemoveMultipleImage, cloudinaryUplodeImage } from "../utils/cloudinary.js"
import CommentSchema from "../models/Comment.js";
import PostSchema from "../models/Post.js";



export const getAllUsersCtrl = asyncHandler(async (req, res) => {
    const users = await UserSchema.find().select("-password")
    res.status(200).json(users)
})

export const getUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await UserSchema.findById(req.params.id).select("-password").populate("posts")
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    res.status(200).json(user)
})

export const updateUserProfileCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    const updateUser = await UserSchema.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    }, { new: true }).select("-password").populate("posts")
    res.status(200).json(updateUser)
})

export const getUsersCountCtrl = asyncHandler(async (req, res) => {
    const count = await UserSchema.count()
    res.status(200).json(count)
})

export const profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "no file provided" })
    }

    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await cloudinaryUplodeImage(imagePath)

    const user = await UserSchema.findById(req.user.id)

    if (user.profilePhoto.publicId !== null) {
        await cloudinaryRemoveImage(user.profilePhoto.publicId)
    }

    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }

    await user.save()

    res.status(200).json({
        message: "your profile photo uploaded successfully",
        profilePhoto: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })

    fs.unlinkSync(imagePath)
})

export const deleteUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await UserSchema.findById(req.params.id)

    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }

    const posts = await PostSchema.find({ user: user.id })
    const publicIds = posts?.map((post) => post.image.publicId)

    if (publicIds?.length > 0) {
        await cloudinaryRemoveMultipleImage(publicIds)
    }

    if (user.profilePhoto.publicId !== null) {
        await cloudinaryRemoveImage(user.profilePhoto.publicId)
    }

    await PostSchema.deleteMany({ user: user._id })
    await CommentSchema.deleteMany({ user: user._id })

    await UserSchema.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "your profile has been deleted" })
})
