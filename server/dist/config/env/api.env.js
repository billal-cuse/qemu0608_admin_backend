"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_MAP_API_KEY = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppConfigurationSchema = zod_1.z.object({
    GOOGLE_MAP_API_KEY: zod_1.z.string(),
});
exports.GOOGLE_MAP_API_KEY = AppConfigurationSchema.parse({
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
}).GOOGLE_MAP_API_KEY;
