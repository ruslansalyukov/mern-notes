import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import notesRoutes from './routes/notesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js';
import rateLimitMiddleware from './middleware/rateLimit.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173'
]

app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))

app.use('/api/auth', authRoutes)
app.use('/api/notes', rateLimitMiddleware('api'), notesRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started in PORT:', PORT)
    })
})
