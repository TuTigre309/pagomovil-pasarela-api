import * as BVCapi from '../libs/BVCapi'

export async function createPayment(req,res) {
    const data = req.body

    try{
    const response = await BVCapi.cobroC2P(data)
    res.status(200).json({'response': response})
    } catch(err) {
        res.status(500).json({'error': err})
    }
}

export async function confirmPayment(req,res) {
    let {referencia, fecha, banco, telefonoP, monto} = req.body
    const processPayment = true

    telefonoP = '58' + telefonoP

    const data = {
        referencia, fecha, banco, telefonoP, monto, processPayment
    }

    try{
        const response = await BVCapi.VerificacionPagoMovilP2C(data)
        res.status(200).json({error : false ,message: response.descripcion})
    } catch(error) {
        if (error.status) return res.status(error.status).json({error: true, message: error.error.descripcion || error.error.mensaje || error.error})
        res.status(500).json({error: true, message: error})
    }
}