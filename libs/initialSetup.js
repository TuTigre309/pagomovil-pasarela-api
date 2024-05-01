import ApiKey from '../models/ApiKey.js'

export const createApiKey = async () => {
    try{
        const count = await ApiKey.estimatedDocumentCount()

        if (count > 0) return;
    
        const key = new ApiKey({key: process.env.API_KEY})
        key.key = await key.encryptKey(key.key)
        await key.save()

        console.log('API key created!')
    } catch(err) {
        console.log('Error creating API key : ' + err.message)
    }
}