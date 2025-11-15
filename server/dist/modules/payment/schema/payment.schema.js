"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const zod_1 = require("zod");
const utils_1 = require("../../../lib/utils");
exports.PaymentSchema = zod_1.z.object({
    amount: zod_1.z
        .union([zod_1.z.string(), zod_1.z.number()])
        .transform((val) => (0, utils_1.convertDollarsToCents)(val)),
});
