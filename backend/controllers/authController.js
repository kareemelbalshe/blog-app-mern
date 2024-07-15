import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs'
import UserSchema, { validateRegisterUser, validateLoginUser } from "../models/User.js"
import VerificationTokenSchema from "../models/VerificationToken.js"
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
/** ------------------------
*@desc Register New User
*@router /api/auth/register
*@method Post
*@access public
*----------------------------
*/

export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    let user = await UserSchema.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ message: "user already exist" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    user = new UserSchema({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    await user.save()

    const verificationToken = new VerificationTokenSchema({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
    })
    await verificationToken.save()
<<<<<<< HEAD
    //     let text = "https://blog-app-mern-taupe-seven.vercel.app/profile/653ff161463d9e06f4c2468a";
    // const myArray = text.split("/");

    // document.getElementById("demo").innerHTML = myArray[0]+'//'+myArray[2]; 
    const link = `${process.env.CLINT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`
=======
    const link = `https://blog-app-mern-taupe-seven.vercel.app/users/${user._id}/verify/${verificationToken.token}`
>>>>>>> 52cd4f5c3ce84052f5ac095192fe77da02241934
    const htmlTemplate = `
    <div>
        <p>Click on the link below to verify your email</p>
        <a href="${link}">Verify</a>
    </div>
    `
    await sendEmail(user.email, "Verify your Email", htmlTemplate)

    res.status(201).json({ message: "We send to you an email, please verify your email address" })
})
/** ------------------------
*@desc login New User
*@router /api/auth/login
*@method Post
*@access public
*----------------------------
*/
export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const user = await UserSchema.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ message: "invalid email or password" })
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid email or password" })
    }
    if (!user.isAccountVerified) {
        let verificationToken = await VerificationTokenSchema.findOne({ userId: user._id })
        if (!verificationToken) {
            verificationToken = new VerificationTokenSchema({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            })
            await verificationToken.save()
        }
        const link = `https://blog-app-mern-taupe-seven.vercel.app/users/${user._id}/verify/${verificationToken.token}`
        const htmlTemplate = `
    <div>
        <p>Click on the link below to verify your email</p>
        <a href="${link}">Verify</a>
    </div>
    `
        await sendEmail(user.email, "Verify your Email", htmlTemplate)

        res.status(400).json({ message: "We send to you an email, please verify your email address" })
    }
    const token = user.generateAuthToken()
    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
        username: user.username
    })
})

export const verifyUserAccountCtrl = asyncHandler(async (req, res) => {
    const user = await UserSchema.findById(req.params.userId)
    if (!user) {
        return res.status(400).json({ message: "invalid link" })
    }
    const verificationToken = await VerificationTokenSchema.findOne({
        userId: user._id,
        token: req.params.token
    })
    if (!verificationToken) {
        return res.status(400).json({ message: "invalid link" })
    }
    user.isAccountVerified = true
    await user.save()
    await verificationToken.remove()

    return res.status(200).json({ message: "Your account verified" })
})
