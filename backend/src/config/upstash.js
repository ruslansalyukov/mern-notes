import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

let redis = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  console.log('✅ Upstash Redis connected');
} else {
  console.warn('⚠️ Upstash not configured — rate limit disabled');
}

export { redis };