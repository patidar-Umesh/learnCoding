import { Router } from "express"
import { contactUsEmailSender } from "../controllers/ContactUs.controller"

const router = Router()

router.post("/contact", contactUsEmailSender)

export default router