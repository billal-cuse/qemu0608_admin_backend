"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsSchema = void 0;
const zod_1 = require("zod");
exports.StatisticsSchema = zod_1.z.object({
    name: zod_1.z.string(),
    date: zod_1.z.string().transform((value) => new Date(value)),
});
