import { Context, Next } from "hono";
import { getConnInfo } from "hono/bun";
import { LRUCache } from "lru-cache";

const MAX_ENTRIES = 16384;

interface RateLimiterOptions {
  limit: number;
  windowMs: number;
  max?: number;
}

export const createRateLimiter = ({
  limit,
  windowMs,
  max = MAX_ENTRIES,
}: RateLimiterOptions) => {
  const cache = new LRUCache<string, { count: number; resetTime: number }>({
    max,
    ttl: windowMs,
  });

  return async (c: Context, next: Next) => {
    const connInfo = getConnInfo(c);

    const clientIp = [
      c.req.header("cf-connecting-ip"),
      c.req.header("x-real-ip"),
      c.req.header("x-forwarded-for")?.split(",")[0]?.trim(),
      connInfo.remote.address,
    ].find(Boolean);

    if (!clientIp) {
      return await next();
    }

    const now = Date.now();
    const entry = cache.get(clientIp) || {
      count: 0,
      resetTime: now + windowMs,
    };

    if (now >= entry.resetTime) {
      entry.count = 0;
      entry.resetTime = now + windowMs;
    }

    if (entry.count >= limit) {
      return c.json(
        {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Rate limit exceeded",
        },
        429,
        {
          "Retry-After": Math.ceil((entry.resetTime - now) / 1000).toString(),
        }
      );
    }

    entry.count++;
    cache.set(clientIp, entry);

    return await next();
  };
};
