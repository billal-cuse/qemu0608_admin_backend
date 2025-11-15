"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    address: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.date().optional(),
});
