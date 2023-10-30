import { Schema, model } from 'mongoose';
import Joi from 'joi';

const CategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true })

export const validateCreateCategory = function (obj) {
    const schema = Joi.object({
        title: Joi.string().trim().required().label("Title"),
    })
    return schema.validate(obj)
}

export default model('CategorySchema', CategorySchema)