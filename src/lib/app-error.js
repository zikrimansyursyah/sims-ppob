class AppError extends Error {
  constructor(message, statusCode, appStatus) {
    super(message);
    this.statusCode = statusCode;
    this.appStatus = appStatus;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
