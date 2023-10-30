import express from "express"
import { connectDB } from "./config/connectToDB.js"
import authRoute from './routes/authRoute.js'
import userRoute from "./routes/userRoute.js"
import postRoute from "./routes/postRoute.js"
import commentRoute from "./routes/commentRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import passwordRoute from './routes/passwordRoute.js'
import { errorHandler, notFound } from "./middlewares/error.js"
import cors from 'cors'
import rateLimiting from "express-rate-limit"
import xss from 'xss-clean'
import dotenv from 'dotenv'
import hpp from "hpp"
import helmet from "helmet"
dotenv.config()


connectDB()
const app = express()

app.use(express.json())

app.use(helmet())

app.use(hpp())

app.use(xss())

app.use(rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 200
}))

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/password", passwordRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`start at http://localhost:${process.env.PORT}`)
})
