import { rateLimit } from "express-rate-limit";

const adminlimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 1000,
  delayMs: 0,
  handler: (req, res) => {
    res.status(429).json({ error: "Too Many Request" });
  },
});

const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  delayMs: 0,
  skip: (req) => req.url === "/admin/signin",
  handler: (req, res) => {
    res.status(429).json({ error: "Too Many Request" });
  },
});

export default [adminlimiter, userLimiter];
