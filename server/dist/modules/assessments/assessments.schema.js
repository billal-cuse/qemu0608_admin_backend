"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssessmentsSchema = exports.CreateAssessmentsSchema = exports.AssessmentsSchema = void 0;
const zod_1 = require("zod");
// Base schema for an assessment
exports.AssessmentsSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(2, "Assessment name is required"),
});
// Create schema
exports.CreateAssessmentsSchema = exports.AssessmentsSchema.omit({ id: true });
// Update schema (all optional)
exports.UpdateAssessmentsSchema = exports.AssessmentsSchema.partial();
