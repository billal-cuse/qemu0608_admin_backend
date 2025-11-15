"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementsSchema = exports.UpdateAgreementsSchema = exports.CreateAgreementsSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.CreateAgreementsSchema = zod_1.z.object({
    type: zod_1.z.enum(client_1.AggrementInfoType),
    content: zod_1.z.string(),
    role: zod_1.z.enum(client_1.Role),
    title: zod_1.z.string(),
});
exports.UpdateAgreementsSchema = zod_1.z.object({
    type: zod_1.z.enum(client_1.AggrementInfoType),
    content: zod_1.z.string(),
    role: zod_1.z.enum(client_1.Role),
    title: zod_1.z.string(),
});
exports.AgreementsSchema = zod_1.z.object({
    type: zod_1.z.enum(client_1.AggrementInfoType),
});
