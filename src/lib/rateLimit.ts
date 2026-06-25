type RateLimitEntry = {
  count: number;
  timestamp: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

// Default limit: 5 requests per 60 seconds
export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }

  // If the window has expired, reset it
  if (now - entry.timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }

  // If within window and under limit, increment
  if (entry.count < limit) {
    entry.count += 1;
    return { success: true, limit, remaining: limit - entry.count, reset: entry.timestamp + windowMs };
  }

  // Rate limited
  return { success: false, limit, remaining: 0, reset: entry.timestamp + windowMs };
}
