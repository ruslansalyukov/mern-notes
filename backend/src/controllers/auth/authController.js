import User from '../../models/User.js';

import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/generateToken.js';




export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({
            email,
        })

        if (existingUser) {
            return res.status(400).json({ message: 'The user with this email already exists' })
        }
        if (!email || !password) {
            return res.status(400).json({ message: 'Required field' })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'The password must be at least 8 characters long' })
        }
        if (password.length > 72) {
            return res.status(400).json({ message: 'The password should not exceed 72 characters' })
        }

        const hashedPassword = await bcrypt.hash(
            password,
            12
        );
        await User.create({
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'User created' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email,
        }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const match = await bcrypt.compare(
            password,
            user.password
        )
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = generateToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({ message: 'Logged in' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        res.status(200).json({
            success: true,
            message: 'Logged out succesfully'
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const me = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('email name');
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}