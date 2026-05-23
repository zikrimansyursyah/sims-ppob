const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const pinoHttp = require("pino-http");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { randomUUID } = require("crypto");
const { RESPONSE_STATUS, HTTP_STATUS } = require("../config/constants");
const { formatDuration } = require("../lib/date");
const logger = require("../config/logger");
const { maxFileSizeOnMB } = require("./file-upload");

const helmetMiddleware = helmet({ contentSecurityPolicy: false });

const corsMiddleware = cors({ origin: "*", credentials: true });

const requestIdAndTimestamp = (req, res, next) => {
  req.requestId = randomUUID();
  req.requestTimestamp = new Date();

  next();
};

const loggerMiddleware = pinoHttp({
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname,req,res,responseTime,err",
          },
        }
      : undefined,
  customSuccessMessage: (req, res) => {
    const duration = formatDuration(new Date(), req.requestTimestamp);
    return `Request ID ${req.requestId}: ${req.method} ${req.originalUrl} - ${res.statusCode} Done in ${duration}`;
  },
  customErrorMessage: (req, res, err) => {
    const duration = formatDuration(new Date(), req.requestTimestamp);
    return `Request ID ${req.requestId}: ${req.method} ${req.originalUrl} - ${res.statusCode} Failed (${err.message})`;
  },
});

const rateLimitterMiddleware = rateLimit({ windowMs: 1 * 60 * 1000, max: 30 });

const cookieParserMiddleware = cookieParser();

const bodyParserMiddleware = bodyParser.json({ limit: "50mb", extended: true });

const expressJsonMiddleware = express.json();

const expressUrlEncodedMiddleware = express.urlencoded({ extended: true });

const onErrorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_ERROR;
  let appStatus = err.appStatus || RESPONSE_STATUS.INTERNAL_SERVER_ERROR;

  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = HTTP_STATUS.VALIDATION_ERROR;
    appStatus = RESPONSE_STATUS.INVALID_PARAMETERS;
    err.message = `File maksimal ${maxFileSizeOnMB}MB`;
  }

  if (err.statusCode === undefined || err.statusCode === HTTP_STATUS.INTERNAL_ERROR) {
    logger.error(err);
  }

  return res.status(statusCode).json({
    status: appStatus,
    message: statusCode === HTTP_STATUS.INTERNAL_ERROR ? "Terjadi kesalahan pada internal server" : err.message || "Terjadi kesalahan pada internal server",
    data: null,
  });
};

const onNotFoundMiddleware = (req, res) => {
  return res.status(HTTP_STATUS.RESOURCE_NOT_FOUND_ERROR).json({
    status: RESPONSE_STATUS.FORBIDDEN_ACCESS,
    message: "Route not found",
    data: null,
  });
};

module.exports = {
  initialMiddleware: [
    helmetMiddleware,
    corsMiddleware,
    requestIdAndTimestamp,
    loggerMiddleware,
    // rateLimitterMiddleware, // disable due to deploying error
    cookieParserMiddleware,
    bodyParserMiddleware,
    expressJsonMiddleware,
    expressUrlEncodedMiddleware,
  ],
  onErrorMiddleware,
  onNotFoundMiddleware,
};
