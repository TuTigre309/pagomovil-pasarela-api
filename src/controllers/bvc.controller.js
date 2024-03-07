export function proceedPayment(req,res) {
    console.log(req.body)

    res.status(200).json({'Hello': 'World'})
}