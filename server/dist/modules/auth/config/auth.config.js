"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRY = exports.JWT_SECRET = exports.JWT_REFRESH_TOKEN_EXPIRY = exports.JWT_REFRESH_TOKEN_SECRET = exports.JWT_ACCESS_TOKEN_EXPIRY = exports.JWT_ACCESS_TOKEN_SECRET = void 0;
const zod_1 = require("zod");
const AuthConfigSchema = zod_1.z.object({
    JWT_ACCESS_TOKEN_SECRET: zod_1.z.string(),
    JWT_ACCESS_TOKEN_EXPIRY: zod_1.z.number(),
    JWT_REFRESH_TOKEN_SECRET: zod_1.z.string(),
    JWT_REFRESH_TOKEN_EXPIRY: zod_1.z.number(),
    JWT_SECRET: zod_1.z.string(),
    JWT_EXPIRY: zod_1.z.number(),
});
_a = AuthConfigSchema.parse({
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: Number(process.env.JWT_EXPIRY),
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRY: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY),
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRY: Number(process.env.JWT_REFRESH_TOKEN_EXPIRY),
}), exports.JWT_ACCESS_TOKEN_SECRET = _a.JWT_ACCESS_TOKEN_SECRET, exports.JWT_ACCESS_TOKEN_EXPIRY = _a.JWT_ACCESS_TOKEN_EXPIRY, exports.JWT_REFRESH_TOKEN_SECRET = _a.JWT_REFRESH_TOKEN_SECRET, exports.JWT_REFRESH_TOKEN_EXPIRY = _a.JWT_REFRESH_TOKEN_EXPIRY, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_EXPIRY = _a.JWT_EXPIRY;
