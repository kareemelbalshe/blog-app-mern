import { Schema, model } from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import passwordComplexity from 'joi-password-complexity';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_640.png",
            publicId: null,
        }
    },
    bio: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

UserSchema.virtual("posts", {
    ref: "PostSchema",
    foreignField: "user",
    localField: "_id"
})

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRIT)
}

export const validateRegisterUser = function (obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: passwordComplexity().required()
    })
    return schema.validate(obj)
}

export const validateLoginUser = function (obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj)
}

export const validateUpdateUser = function (obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        password: passwordComplexity(),
        bio: Joi.string()
    })
    return schema.validate(obj)
}

export const validateEmail = function (obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
    })
    return schema.validate(obj)
}

export const validateNewPassword = function (obj) {
    const schema = Joi.object({
        password: passwordComplexity().required(),
    })
    return schema.validate(obj)
}

export default model('UserSchema', UserSchema)