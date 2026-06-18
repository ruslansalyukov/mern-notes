import { apiLimiter, loginLimiter, registerLimiter } from '../config/rateLimiterFactory.js';

const rateLimitMiddleware = (type = 'api') => {
    return async (req, res, next) => {
        try {

            let limiter;

            // 🔥 выбираем лимит
            if (type === 'login') limiter = loginLimiter;
            else if (type === 'register') limiter = registerLimiter;
            else limiter = apiLimiter;

            // 🔥 если Upstash нет → просто пропускаем
            if (!limiter) return next();

            const key = req.ip;

            const { success } = await limiter.limit(key);

            if (!success) {
                return res.status(429).json({
                    message: 'Too many requests, try again later',
                });
            }

            next();

        } catch (error) {
            console.log('Rate limit error:', error);

            // 🔥 fallback — не ломаем API
            next();
        }
    };
};

export default rateLimitMiddleware;