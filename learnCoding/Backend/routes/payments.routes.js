import { Router } from "express"

const router = Router()

import { capturePayment, verifySignature, sendPaymentSuccessEmail } from "../controllers/pament.controller.js"
import { verifyJWT, isStudent } from "../middlewares/auth.middleware.js"

router.post("/capturePayment",verifyJWT,  isStudent, capturePayment)
router.post("/verifySignature",  verifyJWT, isStudent, verifySignature)
router.post("/sendPaymentSuccessEmail", verifyJWT, isStudent, sendPaymentSuccessEmail )

export default router