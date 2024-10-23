const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 900000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "The request limit has been reached. Try again later.",
});

module.exports = { limiter };
