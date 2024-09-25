const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const ERROR_CODES = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return ERROR_CODES.AUTHORIZATION_ERROR(res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    ERROR_CODES.AUTHORIZATION_ERROR(res);
  }

  req.user = payload;

  return next();
};
