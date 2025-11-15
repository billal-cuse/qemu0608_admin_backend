"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorHandler = DefaultErrorHandler;
const HttpError_1 = require("../lib/HttpError");
const app_env_1 = require("../config/env/app.env");
const logger_1 = require("../config/logger");
const zod_1 = require("zod");
const ResponseApi_1 = require("../lib/ResponseApi");
const client_1 = require("@prisma/client");
function DefaultErrorHandler(err, req, res, next) {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof HttpError_1.HttpError) {
        statusCode = err.status;
        message = err.message;
    }
    else if (app_env_1.NODE_ENV !== "production") {
        message = err.message;
    }
    logger_1.logger.error({
        stack: err.stack,
        path: req.path,
        method: req.method,
        statusCode,
        message: err.message,
    });
    if (err instanceof zod_1.ZodError) {
        return (0, ResponseApi_1.ResponseApi)(res, statusCode, "Validation Failed", {
            errors: err._zod,
        });
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return (0, ResponseApi_1.ResponseApi)(res, statusCode, "Validation Failed", {
            errors: err,
        });
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
}
