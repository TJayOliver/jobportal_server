import { rateLimit } from "express-rate-limit";

const adminLimiter = rateLimit({
  windowMs: 25 * 60 * 1000,
  limit: 5,
  delayMs: 0,
  handler: (req, res) => {
    res.status(429).json({ error: "You exceeded your request limit" });
  },
});

const userLimiter = rateLimit({
  windowMs: 8 * 60 * 1000,
  limit: 100000000,
  delayMs: 0,
  skip: (req) => req.url === "/admin/signin" || req.url === "/unsubscribe",
  handler: (req, res) => {
    res.status(429).json({ error: "You exceeded your request limit" });
  },
});

export default [adminLimiter, userLimiter];
