import BCVExchange from "../models/BCVExchange";

export async function bcvExchange() {
    try{
        const existingDocument = await BCVExchange.findOne()

        return existingDocument.exchange
    }
    catch(err) {
        console.log(err)
        return 0.00
    }
}