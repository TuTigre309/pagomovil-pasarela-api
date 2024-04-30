import {Router} from 'express'
import { verifyAPIKey } from '../middlewares/authjwt'
import { validateRequest  } from '../middlewares/joi'
import { bvcConfirmPayment } from '../schemas/bvcConfirmPayment'
import * as BVCapi from '../controllers/bvc.controller'

const router = Router()

router.post('/BVC-confirm-payment',[validateRequest(bvcConfirmPayment, 'body'),verifyAPIKey], BVCapi.confirmPayment)

export default router