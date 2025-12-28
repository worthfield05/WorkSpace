const config = require("../config/config");
const ZodError = require("zod").ZodError;
const ApiError = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  let error = err;
  if (err?.name === "ZodError") {
    error = new ApiError(400, "Validation failed", err.flatten());
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(409, `${field} already exists`);
  } else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = new ApiError(400, "Validation failed", errors);
  } else if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token expired");
  } else if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token");
  }
  if (!error?.isOperational) {
    error = new ApiError(500, "Internal Server Error");
  }
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    errors: error.errors,
    stack: config.NODE_ENV === "development" ? error.stack : undefined,
  });
};
