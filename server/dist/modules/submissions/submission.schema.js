"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubmissionSchema = exports.CreateSubmissionSchema = exports.SubmissionSchema = exports.SubmissionQuerySchema = void 0;
const zod_1 = require("zod");
exports.SubmissionQuerySchema = zod_1.z.object({
    _start: zod_1.z
        .string()
        .default("0")
        .transform((value) => Number(value)),
    _end: zod_1.z
        .string()
        .default("0")
        .transform((value) => Number(value)),
});
exports.SubmissionSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    deviceId: zod_1.z.string().min(1, "Device ID is required"),
    selectedYear: zod_1.z.string().optional(), // ISO string date
    status: zod_1.z.enum(["PASS", "FAIL"]),
    airlineId: zod_1.z.string().min(1, "Airline ID is required"),
    assessments: zod_1.z.array(zod_1.z.string()).optional(), // IDs of associated assessments
});
// Schema for create
exports.CreateSubmissionSchema = exports.SubmissionSchema.omit({ id: true });
// Schema for update
exports.UpdateSubmissionSchema = exports.SubmissionSchema.partial();
