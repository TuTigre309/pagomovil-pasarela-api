import {Router} from 'express'
import { verifyAPIKey } from '../middlewares/authjwt'
import * as BVC from '../controllers/bvc.controller'

const router = Router()

router.post('/BVC',[verifyAPIKey], BVC.proceedPayment)

export default router