import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import notesRoutes from './routes/notesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js';
import rateLimited from './middleware/RateLimited.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cookieParser())
app.use(rateLimited)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    })
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started in PORT:', PORT)
    })
})
