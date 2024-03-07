import express from 'express'
import morgan from 'morgan'
import paymentRoutes from './routes/payment.routes'
import helmet from "helmet";
import cors from 'cors';

require('dotenv').config()

const app = express()

app.use(cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true
}));

app.use(helmet());
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/payment',paymentRoutes)

export default app;