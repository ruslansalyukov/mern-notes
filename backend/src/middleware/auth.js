import jwt from 'jsonwebtoken';


export const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No token' })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is missing')
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.userId = decoded.userId;
        next()

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}