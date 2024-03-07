import app from './app'
import './database'

const port = process.env.PORT || 443;

app.listen(port, () => {
    console.log(`Server listening to https://localhost:${port}/`)
})