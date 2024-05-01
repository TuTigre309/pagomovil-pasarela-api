import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const apiKeySchema = new Schema({
    key: String,
    salt: String,
}, {
    timestamps: true,
    versionKey: false
})

apiKeySchema.methods.encryptKey = async function (key) {
    if (this.salt) {
        return await bcrypt.hash(key, this.salt)
    } else {
        this.salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(key, this.salt)
    }
}

apiKeySchema.methods.compareKey = async function (key) {
    const hashedKey = await this.encryptKey(key)
    return hashedKey === this.key
}

export default model('ApiKey', apiKeySchema)