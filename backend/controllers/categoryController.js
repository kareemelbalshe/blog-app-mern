import asyncHandler from "express-async-handler"
import CategorySchema, { validateCreateCategory } from "../models/Category.js"


export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { error } = validateCreateCategory(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const category = await CategorySchema.create({
        title: req.body.title,
        user: req.user.id
    })

    res.status(201).json(category)
})

export const getAllCategoryCtrl = asyncHandler(async (req, res) => {
    const categories = await CategorySchema.find()

    res.status(201).json(categories)
})

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await CategorySchema.findById(req.params.id)
    if (!category) {
        return res.status(404).json({ message: 'category not found' })
    }

    await CategorySchema.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message: 'category has been deleted successfully',
        categoryId: category._id
    })
})