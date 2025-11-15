"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOtpSchema = exports.LoginSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(["ADMIN", "USER"]).optional(),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.VerifyOtpSchema = zod_1.z.object({
    email: zod_1.z.string(),
    otp: zod_1.z.string().transform((val) => Number(val)),
});
