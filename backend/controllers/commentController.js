import asyncHandler from "express-async-handler"
import CommentSchema, { validateCreateComment, validateUpdateComment } from "../models/Comment.js"
import UserSchema from "../models/User.js"


export const createCommentCtrl = asyncHandler(async (req, res) => {
    const { error } = validateCreateComment(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const profile = await UserSchema.findById(req.user.id)

    const Comment = await CommentSchema.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username,
    })

    res.status(201).json(Comment)
})

export const getAllCommentsCtrl = asyncHandler(async (req, res) => {

    const comments = await CommentSchema.find().populate("user")

    res.status(201).json(comments)
})

export const deleteCommentCtrl = asyncHandler(async (req, res) => {

    const comment = await CommentSchema.findById(req.params.id)
    if (!comment) {
        return res.status(404).json({ message: "comment not found" })
    }

    if (req.user.isAdmin || req.user.id === comment.user._id.toString()) {
        await CommentSchema.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "comment has been deleted" })
    }
    else {
        res.status(403).json({ message: "access denied,not allowed" })
    }

    res.status(201).json(comment)
})

export const updateCommentCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUpdateComment(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const comment = await CommentSchema.findById(req.params.id)
    if (!comment) {
        return res.status(404).json({ message: "comment not found" })
    }

    if (req.user.id !== comment.user.toString()) {
        return res.status(403).json({ message: "access denied, only user himself can edit his comment" })
    }

    const updateComment = await CommentSchema.findByIdAndUpdate(req.params.id, {
        $set: {
            text: req.body.text,
        }
    }, { new: true })

    res.status(201).json(updateComment)
})