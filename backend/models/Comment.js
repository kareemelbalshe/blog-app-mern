import { Schema, model } from 'mongoose';
import Joi from 'joi';

const CommentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "PostSchema",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
}, { timestamps: true })

export const validateCreateComment = function (obj) {
    const schema = Joi.object({
        postId: Joi.string().required().label("Post ID"),
        text: Joi.string().trim().required().label("Text"),
    })
    return schema.validate(obj)
}

export const validateUpdateComment = function (obj) {
    const schema = Joi.object({
        text: Joi.string().trim(),
    })
    return schema.validate(obj)
}

export default model('CommentSchema', CommentSchema)