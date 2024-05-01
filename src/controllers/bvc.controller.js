import * as BVCapi from '../libs/BVCapi'
import * as BCVapi from '../libs/BCVapi'

export async function confirmPayment(req,res) {
    let {referencia, fecha, banco, telefonoP, monto} = req.body
    const processPayment = false

    telefonoP = '58' + telefonoP

    const data = {
        referencia, fecha, banco, telefonoP, monto, processPayment
    }

    try{
        const response = await BVCapi.VerificacionPagoMovilP2C(data)

        const exchangeRate = await BCVapi.bcvExchange()

        const USD = exchangeRate === 0.00 ? 0.00 : (data.monto / exchangeRate).toFixed(2)

        res.status(200).json({error : false ,message: response.descripcion, USD})
    } catch(error) {
        if (error.status) return res.status(error.status).json({error: true, message: error.error.descripcion || error.error.mensaje || error.error})
        res.status(500).json({error: true, message: error})
    }
}