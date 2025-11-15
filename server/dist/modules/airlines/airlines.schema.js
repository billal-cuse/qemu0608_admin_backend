"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAirlinesSchema = exports.CreateAirlinesSchema = exports.AirlinesSchema = void 0;
const zod_1 = require("zod");
// Base schema for an airline
exports.AirlinesSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(2, "Airline name is required"),
});
// Schema used when creating a new airline
exports.CreateAirlinesSchema = exports.AirlinesSchema.omit({ id: true });
// Schema used when updating an airline
exports.UpdateAirlinesSchema = exports.AirlinesSchema.partial();
