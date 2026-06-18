import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './upstash.js';

// 🔥 универсальная фабрика
export const createRateLimit = (requests, window) => {
    if (!redis) return null;

    return new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(requests, window),
    });
};

// 🔥 ГОТОВЫЕ ЛИМИТЫ ДЛЯ ПРОЕКТА

// обычные API запросы
export const apiLimiter = createRateLimit(100, '60 s');

// login (защита от brute force)
export const loginLimiter = createRateLimit(5, '60 s');

// register (защита от спама аккаунтов)
export const registerLimiter = createRateLimit(3, '60 s');