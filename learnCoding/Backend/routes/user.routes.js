import {Router} from 'express'
import { changePassword, login, sendOTP, signUp } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { forgotPassword, forgotPasswordToken } from '../controllers/resetPassword.controller.js'

const router = Router()


// signup and login
router.post('/signUp', signUp)
router.post('/login', login)

// change password
router.put('/change-password', verifyJWT, changePassword)

// otp routes
router.post('/sendotp', sendOTP)


// generate token for reset password
router.post('/reset-password-token', forgotPasswordToken)

// resest password
router.post('/reset-password', forgotPassword)





export default router