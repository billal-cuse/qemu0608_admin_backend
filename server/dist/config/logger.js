"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const app_env_1 = require("./env/app.env");
exports.logger = (0, pino_1.default)({
    level: process.env.LOG_LEVEL || "info",
    timestamp: pino_1.default.stdTimeFunctions.isoTime,
    transport: app_env_1.NODE_ENV !== "production"
        ? {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "HH:MM:ss",
                ignore: "pid,hostname",
            },
        }
        : undefined,
});
