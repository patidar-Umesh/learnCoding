// import all require package and files
import express from 'express'
import connectDB from './config/database.js'
import {config} from 'dotenv'
import userRouter from './routes/user.routes.js'
import courseRouter from './routes/course.routes.js'
import paymentRouter from './routes/payments.routes.js'
import profileRouter from './routes/Profile.routes.js'
import constactUsRouter from './routes/Contact.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { cloudinaryConnect } from './utils/cloudinary.js'
import fileUpload from 'express-fileupload'

// connect db 
connectDB()

// connect dotenv 
config()

// connect cloudinary
cloudinaryConnect()


// create app from express
const app = express()

// set packages for use in our app
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));



// set routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)

// profile route
app.use('/api/v1/profile', profileRouter)

// contact us 
app.use('/api/v1', constactUsRouter)

// payment routes
app.use('/api/v1/payment', paymentRouter)


// set port for server
const Port = process.env.PORT || 5000
app.listen(Port, () => console.log(`Server running on ${Port}`))

