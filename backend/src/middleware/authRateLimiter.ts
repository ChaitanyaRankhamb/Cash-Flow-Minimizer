import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests
  message: {
    message: "Too many login attempts. Try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip + (req.body.email || ""),
});