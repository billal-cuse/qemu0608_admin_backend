"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const HttpError_1 = require("../../lib/HttpError");
const statistics_1 = require("../statistics");
class SubmissionService {
    static async getByDeviceId(deviceId) {
        const data = await prisma_1.default.submission.findMany({
            where: {
                deviceId,
            },
            include: { assessments: true, airline: true },
            orderBy: { createdAt: "desc" },
        });
        const submissions = data.map((submission) => ({
            id: submission.id,
            deviceId: submission.deviceId,
            selectedYear: submission.date,
            status: submission.status,
            airline: submission.airline.name,
            createdAt: submission.createdAt,
            updatedAt: submission.updatedAt,
            assessments: submission.assessments.map((assessment) => assessment.name),
        }));
        return {
            total: submissions.length,
            submissions,
        };
    }
    static async getSubmissionByDeviceId(deviceId, airlineId) {
        return prisma_1.default.submission.findMany({
            where: {
                deviceId,
                airlineId,
                createdAt: {
                    gte: new Date(new Date().getFullYear(), 0, 1),
                    lt: new Date(new Date().getFullYear() + 1, 0, 1),
                },
            },
        });
    }
    static async createSubmission(data) {
        const { deviceId, selectedYear, status, airlineId, assessments } = data;
        const countSubmission = await prisma_1.default.submission.count({
            where: {
                deviceId,
                createdAt: {
                    gte: new Date(new Date().getFullYear(), 0, 1),
                    lt: new Date(new Date().getFullYear() + 1, 0, 1),
                },
            },
        });
        if (countSubmission > 8)
            throw new HttpError_1.HttpError(409, "You maximum 8 submission per device in one year");
        const submission = await this.getSubmissionByDeviceId(deviceId, airlineId);
        if (submission.length > 0)
            throw new HttpError_1.HttpError(409, "Submission already submitted");
        const submissions = await prisma_1.default.submission.create({
            data: {
                deviceId,
                selectedYear: selectedYear ? new Date(selectedYear) : undefined,
                status,
                airlineId,
                assessments: assessments
                    ? { connect: assessments.map((id) => ({ id })) }
                    : undefined,
            },
            include: { assessments: true, airline: true },
        });
        const { totalSubmissions, totalPass } = await statistics_1.StatisticsService.getStatistics();
        return {
            name: submissions.airline.name,
            date: submissions.date,
            totalResponse: totalSubmissions,
            successRate: (totalPass / totalSubmissions) * 100,
        };
    }
    static async getAllSubmissions(start, end) {
        console.log(start, end);
        const [submissions, total] = await Promise.all([
            prisma_1.default.submission.findMany({
                include: { assessments: true, airline: true },
                orderBy: { createdAt: "desc" },
                ...(start && end
                    ? {
                        skip: start,
                        take: end,
                    }
                    : {}),
            }),
            prisma_1.default.submission.count(),
        ]);
        return {
            total,
            submissions,
        };
    }
    static async getSubmissionById(id) {
        const submission = await prisma_1.default.submission.findUnique({
            where: { id },
            include: { assessments: true, airline: true },
        });
        if (!submission)
            throw new HttpError_1.HttpError(404, "Submission not found");
        return submission;
    }
    static async updateSubmission(id, data) {
        return await prisma_1.default.submission.update({
            where: { id },
            data: {
                deviceId: data.deviceId,
                selectedYear: data.selectedYear
                    ? new Date(data.selectedYear)
                    : undefined,
                status: data.status,
                airlineId: data.airlineId,
                assessments: data.assessments
                    ? { set: data.assessments.map((id) => ({ id })) }
                    : undefined,
            },
            include: { assessments: true, airline: true },
        });
    }
    static async deleteSubmission(id) {
        await prisma_1.default.submission.delete({ where: { id } });
        return { message: "Submission deleted successfully" };
    }
}
exports.SubmissionService = SubmissionService;
