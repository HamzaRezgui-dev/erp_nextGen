import httpStatus from "http-status";
import config from "../../config/config.js";
import ApiError from "../utils/ApiError.js";

/**
 * Middleware to convert any error that isn't an instance of ApiError
 * into an ApiError. This standardizes all errors before they reach the
 * final error handler.
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

/**
 * The final error handling middleware. It takes an error and sends a
 * standardized JSON response. In production, it hides the stack trace.
 * @param {ApiError} err - The ApiError object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function (unused here).
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

export { errorHandler, errorConverter };
