import { Schema, model } from 'mongoose';

const VerificationTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true })

export default model('VerificationTokenSchema', VerificationTokenSchema)