import {Router} from 'express'
import { sendOTP } from '../controllers/auth.controller.js'

const router = Router()

router.post('/sendotp', sendOTP)

export default router