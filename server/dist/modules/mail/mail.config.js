"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_MAIL_FROM = exports.SMTP_PORT = exports.SMTP_SECURE = exports.SMTP_AUTH_PASSWORD = exports.SMTP_AUTH_USER = exports.SMTP_HOST = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = {
    SMTP_HOST: zod_1.z.string().parse(process.env.SMTP_HOST),
    SMTP_PORT: zod_1.z
        .string()
        .transform((val) => Number(val))
        .parse(process.env.SMTP_PORT),
    SMTP_SECURE: zod_1.z.string().parse(process.env.SMTP_SECURE),
    SMTP_AUTH_USER: zod_1.z.string().parse(process.env.SMTP_AUTH_USER),
    SMTP_AUTH_PASSWORD: zod_1.z.string().parse(process.env.SMTP_AUTH_PASSWORD),
    SMTP_MAIL_FROM: zod_1.z.string().parse(process.env.SMTP_MAIL_FROM),
}, exports.SMTP_HOST = _a.SMTP_HOST, exports.SMTP_AUTH_USER = _a.SMTP_AUTH_USER, exports.SMTP_AUTH_PASSWORD = _a.SMTP_AUTH_PASSWORD, exports.SMTP_SECURE = _a.SMTP_SECURE, exports.SMTP_PORT = _a.SMTP_PORT, exports.SMTP_MAIL_FROM = _a.SMTP_MAIL_FROM;
