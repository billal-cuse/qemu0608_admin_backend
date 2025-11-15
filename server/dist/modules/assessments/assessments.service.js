"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentsService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const HttpError_1 = require("../../lib/HttpError");
class AssessmentsService {
    static async createAssessment(name) {
        if (!name)
            throw new HttpError_1.HttpError(400, "Assessment name is required");
        return prisma_1.default.assessment.create({ data: { name } });
    }
    static async getAllAssessments() {
        return prisma_1.default.assessment.findMany({ orderBy: { createdAt: "desc" } });
    }
    static async getAssessmentById(id) {
        const assessment = await prisma_1.default.assessment.findUnique({ where: { id } });
        if (!assessment)
            throw new HttpError_1.HttpError(404, "Assessment not found");
        return assessment;
    }
    static async searchAssessments(query) {
        if (!query)
            throw new HttpError_1.HttpError(400, "Search query required");
        return prisma_1.default.assessment.findMany({
            where: { name: { contains: query, mode: "insensitive" } },
            orderBy: { name: "asc" },
        });
    }
    static async updateAssessment(id, name) {
        if (!name)
            throw new HttpError_1.HttpError(400, "Assessment name is required");
        const updated = await prisma_1.default.assessment.update({
            where: { id },
            data: { name },
        });
        if (!updated)
            throw new HttpError_1.HttpError(404, "Assessment not found");
        return updated;
    }
    static async deleteAssessment(id) {
        const deleted = await prisma_1.default.assessment.delete({ where: { id } });
        if (!deleted)
            throw new HttpError_1.HttpError(404, "Assessment not found");
        return { message: "Assessment deleted successfully" };
    }
}
exports.AssessmentsService = AssessmentsService;
