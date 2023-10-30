import asyncHandler from "express-async-handler"
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const __dirname = path.resolve();
import fs from "fs"
import PostSchema, { validateCreatePost, validateUpdatePost } from "../models/Post.js"
import { cloudinaryRemoveImage, cloudinaryUplodeImage } from "../utils/cloudinary.js"
import CommentSchema from "../models/Comment.js";


export const createPostCtrl = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "no image provided" })
    }

    const { error } = validateCreatePost(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await cloudinaryUplodeImage(imagePath)

    const post = await PostSchema.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user: req.user.id,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })
    res.status(201).json(post)

    fs.unlinkSync(imagePath)
})

export const getAllPostsCtrl = asyncHandler(async (req, res) => {
    const POST_PER_PAGE = 3
    const { pageNumber, category } = req.query
    let posts
    if (pageNumber) {
        posts = await PostSchema.find()
            .skip((pageNumber - 1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({ createdAt: -1 })
            .populate("user", ["-password","-isAdmin"])
    }
    else if (category) {
        posts = await PostSchema.find({ category: category })
            .sort({ createdAt: -1 })
            .populate("user", ["-password","-isAdmin"])
    }
    else {
        posts = await PostSchema.find()
            .sort({ createdAt: -1 })
            .populate("user", ["-password","-isAdmin"])
    }
    res.status(200).json(posts)
})

export const getSenglePostsCtrl = asyncHandler(async (req, res) => {
    const post = await PostSchema.findById(req.params.id)
        .populate("user", ["-password"])
        .populate("comments")//اليوسير هنا زي الاسم الفي model
    if (!post) {
        return res.status(404).json({ message: 'post not found' })
    }

    res.status(200).json(post)
})

export const getPostsCountCtrl = asyncHandler(async (req, res) => {
    const count = await PostSchema.count()

    res.status(200).json(count)
})

export const deletePostCtrl = asyncHandler(async (req, res) => {
    const post = await PostSchema.findById(req.params.id)
    if (!post) {
        return res.status(404).json({ message: 'post not found' })
    }

    if (req.user.isAdmin || req.user.id === post.user.toString()) {
        await PostSchema.findByIdAndDelete(req.params.id)
        await cloudinaryRemoveImage(post.image.publicId)

        await CommentSchema.deleteMany({ postId: post._id })

        res.status(200).json({ message: "post has been deleted successfully", postId: post._id })
    }
    else {
        res.status(403).json({ message: "access denied, forbidden" })
    }
})

export const updatePostCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUpdatePost(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const post = await PostSchema.findById(req.params.id)
    if (!post) {
        return res.status(404).json({ message: 'post not found' })
    }

    if (req.user.id !== post.user.toString()) {
        return res.status(403).json({ message: 'access denied,you are not allowed' })
    }

    const updatePost = await PostSchema.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }
    }, { new: true }).populate("user", ["-password","-isAdmin"])

    res.status(200).json(updatePost)
})

export const updatePostPhoto = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const post = await PostSchema.findById(req.params.id)
    if (!post) {
        return res.status(404).json({ message: 'post not found' })
    }

    if (req.user.id !== post.user.toString()) {
        return res.status(403).json({ message: 'access denied,you are not allowed' })
    }

    await cloudinaryRemoveImage(post.image.publicId)

    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await cloudinaryUplodeImage(imagePath)

    const updatePost = await PostSchema.findByIdAndUpdate(req.params.id, {
        $set: {
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        }
    }, { new: true })

    res.status(200).json(updatePost)
    fs.unlinkSync(imagePath)
})

export const toggleLikeCtrl = asyncHandler(async (req, res) => {
    const loggendUser = req.user.id
    const { id: postId } = req.params
    let post = await PostSchema.findById(postId)
    if (!post) {
        return res.status(404).json({ message: "post not found" })
    }
    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === loggendUser)
    if (isPostAlreadyLiked) {
        post = await PostSchema.findByIdAndUpdate(postId, {
            $pull: {
                likes: loggendUser
            }
        }, { new: true })
    }
    else {
        post = await PostSchema.findByIdAndUpdate(postId, {
            $push: {
                likes: loggendUser
            }
        }, { new: true })
    }

    res.status(200).json(post)
})
