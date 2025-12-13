const config = require("../config/config");
const ApiError = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  let error = err;
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    error = ApiError(400, message);
  }
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = ApiError(400, messages.join(", "));
  }
  if (err.name === "TokenExpiredError") {
    error = ApiError(401, "Token expired");
  }
  if (err.name === "JsonWebTokenError") {
    error = ApiError(401, "Invalid token");
  }
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    stack: config.NODE_ENV === "development" ? err.stack : undefined,
  });
};
