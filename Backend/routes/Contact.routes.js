import { Router } from "express"
import { contactUsEmailSender } from "../controllers/ContactUs.controller.js"

const router = Router()

router.post("/contact", contactUsEmailSender)

export default router