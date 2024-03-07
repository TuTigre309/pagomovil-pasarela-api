import mongoose from "mongoose"
import * as initialSetup from './libs/initialSetup'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(db => console.log('DB connected'))
.then(async () => {
    await initialSetup.createApiKey()
})
.catch(err => {
    console.log(err)
    process.exit(1)
})
