"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseApi = void 0;
const ResponseApi = (res, status, message, data, optional = {}) => {
    return res.status(status).json({
        success: true,
        statusCode: status,
        message,
        data,
        ...optional,
    });
};
exports.ResponseApi = ResponseApi;
