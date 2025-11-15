"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIRECT_URL = exports.BASE_URL = exports.NODE_ENV = exports.CLIENT_URL = exports.PORT = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppConfigurationSchema = zod_1.z.object({
    PORT: zod_1.z.number().optional(),
    CLIENT_URL: zod_1.z.string().optional(),
    NODE_ENV: zod_1.z.string(),
    BASE_URL: zod_1.z.string(),
    REDIRECT_URL: zod_1.z.string(),
});
_a = AppConfigurationSchema.parse({
    PORT: Number(process.env.PORT) || 3000,
    CLIENT_URL: process.env.CLIENT_URL,
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    REDIRECT_URL: process.env.REDIRECT_URL,
}), exports.PORT = _a.PORT, exports.CLIENT_URL = _a.CLIENT_URL, exports.NODE_ENV = _a.NODE_ENV, exports.BASE_URL = _a.BASE_URL, exports.REDIRECT_URL = _a.REDIRECT_URL;
