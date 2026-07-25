const rateLimit = require('express-rate-limit');

// Rate limiter for authentication routes (Login & Register)
// Limits each IP to 5 requests per 15 minutes window
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.'
  }
});

module.exports = {
  authRateLimiter
};
