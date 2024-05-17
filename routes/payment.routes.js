import {Router} from 'express'
import { verifyAPIKey } from '../middlewares/authJwt.js'
import { validateRequest  } from '../middlewares/joi.js'
import { bvcConfirmPayment } from '../schemas/bvcConfirmPayment.js'
import * as BVCapi from '../controllers/bvc.controller.js'
import https from 'https'

const router = Router()

router.post('/BVC-confirm-payment',[validateRequest(bvcConfirmPayment, 'body'),verifyAPIKey], BVCapi.confirmPayment)

/*
    SABER IP PUBLICA DEL SERVIDOR USANDO LAMBDA AWS
*/

// router.get('/none', (req, res) => {
//   const url = 'https://api.ipify.org?format=json';
//   const options = {
//     method: 'GET',
//     agent: new https.Agent({ rejectUnauthorized: false })
//   };

//   https.get(url, options, (httpRes) => {
//     let responseData = '';

//     httpRes.on('data', (chunk) => {
//       responseData += chunk;
//     });

//     httpRes.on('end', () => {
//       if (httpRes.statusCode === 200) {
//         res.json({ ip: JSON.parse(responseData).ip });
//       } else {
//         res.status(httpRes.statusCode).json({ error: 'Error al obtener la IP' });
//       }
//     });
//   }).on('error', (error) => {
//     console.error('Error al obtener la IP del servidor:', error);
//     res.status(500).json({ error: true, message: 'Error al obtener la IP del servidor' });
//   });
// });


export default router