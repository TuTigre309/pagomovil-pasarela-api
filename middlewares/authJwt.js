import ApiKey from '../models/ApiKey.js'
import dotenv from 'dotenv';

dotenv.config();

export const verifyAPIKey = async (req, res, next) => {
    try {
        const apiKey = req.headers['api_key']
        if (!apiKey) {
            return res.status(403).json({error: true, message: "No API key provided"})
        }

        const apiKeyRecord = await ApiKey.findOne()
        if (!apiKeyRecord || !await apiKeyRecord.compareKey(apiKey)) {
            return res.status(403).json({error: true, message: "Invalid API key"})
        }

        next()
    } catch(err) {
        return res.status(500).json({error: true, message: "Error verifying API key"})
    }
}
