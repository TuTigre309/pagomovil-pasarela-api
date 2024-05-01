import {Router} from 'express'
import { verifyAPIKey } from '../middlewares/authJwt.js'
import { validateRequest  } from '../middlewares/joi.js'
import { bvcConfirmPayment } from '../schemas/bvcConfirmPayment.js'
import * as BVCapi from '../controllers/bvc.controller.js'

const router = Router()

router.post('/BVC-confirm-payment',[validateRequest(bvcConfirmPayment, 'body'),verifyAPIKey], BVCapi.confirmPayment)

export default router