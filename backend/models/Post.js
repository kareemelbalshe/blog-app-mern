import { Schema, model } from 'mongoose';
import Joi from 'joi';


const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 200,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        default: {
            url: "",
            publicId: null,
        }
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "UserSchema"
        }
    ],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

PostSchema.virtual("comments", {
    ref: "CommentSchema",
    foreignField: "postId",
    localField: "_id"
})

export const validateCreatePost = function (obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200).required(),
        description: Joi.string().trim().min(10).required(),
        category: Joi.string().trim().required(),
    })
    return schema.validate(obj)
}

export const validateUpdatePost = function (obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200),
        description: Joi.string().trim().min(10),
        category: Joi.string().trim(),
    })
    return schema.validate(obj)
}

export default model('PostSchema', PostSchema)