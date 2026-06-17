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
    origin: 'https://mern-notes-frontend-eta.vercel.app',
    credentials: true,
}))

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started in PORT:', PORT)
    })
})
