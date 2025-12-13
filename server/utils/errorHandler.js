// class ApiError extends Error {
//   constructor(statusCode, message) {
//     super(message);
//     this.statusCode = statusCode;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }
const ApiError = (statusCode, message) => {
  let error = new Error();
  error.message = message;
  error.statusCode = statusCode;
  error.stack = Error.captureStackTrace(error, ApiError);
  return error;
};
module.exports = ApiError;
