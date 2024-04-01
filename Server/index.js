// import all require package and files
import express from 'express'
import connectDB from './config/database.js'
import {config} from 'dotenv'
import userRouter from './routes/user.routes.js'

// import db and connect or dotenv
connectDB()
config()

// create app from express
const app = express()
app.use(express.json())


// set routes
app.use('/api/v1', userRouter)

// set port for server
const Port = process.env.PORT || 5000
app.listen(Port, () => console.log(`Server running on ${Port}`))

