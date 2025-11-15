"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE_WEBHOOK_SECRET = exports.STRIPE_SECRET_KEY = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CloudinaryConfigurationSchema = zod_1.z.object({
    STRIPE_SECRET_KEY: zod_1.z.string(),
    STRIPE_WEBHOOK_SECRET: zod_1.z.string(),
});
_a = CloudinaryConfigurationSchema.parse({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
}), exports.STRIPE_SECRET_KEY = _a.STRIPE_SECRET_KEY, exports.STRIPE_WEBHOOK_SECRET = _a.STRIPE_WEBHOOK_SECRET;
