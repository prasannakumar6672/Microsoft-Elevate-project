// In-memory rate limiting map for IP rate limiting
const requestsMap = new Map();

export const rateLimiter = (options = { windowMs: 15 * 60 * 1000, max: 100 }) => {
  return (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    const record = requestsMap.get(ip) || { count: 0, startTime: now };

    if (now - record.startTime > options.windowMs) {
      record.count = 1;
      record.startTime = now;
    } else {
      record.count += 1;
    }

    requestsMap.set(ip, record);

    if (record.count > options.max) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again later.',
        },
      });
    }

    next();
  };
};
