import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
  message:
    "Too many failed login attempts from this IP, please try again after 15 minutes",
});

export { authLimiter };
