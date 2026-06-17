import express from 'express';
import { login, logout, me, register } from '../controllers/auth/authController.js';
import { auth } from '../middleware/auth.js';



const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', auth, me)

export default router