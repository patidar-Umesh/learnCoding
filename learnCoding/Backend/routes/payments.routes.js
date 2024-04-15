import { Router } from "express"

const router = Router()

import { capturePayment, verifySignature } from "../controllers/pament.controller.js"
import { verifyJWT, isAdmin, isInstructor, isStudent } from "../middlewares/auth.middleware.js"

router.post("/capturePayment", verifyJWT, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

export default router