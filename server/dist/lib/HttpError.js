"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundHandler = exports.HttpError = void 0;
// Http error
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HttpError = HttpError;
// Not found error handler
const NotFoundHandler = (_req, _res, next) => {
    next(new HttpError(404, "Not Found"));
};
exports.NotFoundHandler = NotFoundHandler;
