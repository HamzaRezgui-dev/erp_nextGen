class ApiError extends Error {
  /**
   * @param {number} statusCode - The HTTP status code of the error (e.g., 404, 400).
   * @param {string} message - A clear, user-friendly error message.
   * @param {boolean} [isOperational=true] - A flag to distinguish between predictable, operational errors and true programming bugs.
   * @param {string} [stack=''] - The stack trace for the error.
   */
  constructor(statusCode, message, isOperational = true, stack = "") {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
