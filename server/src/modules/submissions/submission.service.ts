import prisma from "../../config/prisma";
import { HttpError } from "../../lib/HttpError";
import {
  CreateSubmissionSchemaType,
  UpdateSubmissionSchemaType,
} from "./submission.schema";
import { StatisticsService } from "../statistics";

export class SubmissionService {
  static async getByDeviceId(deviceId: string) {
    const data = await prisma.submission.findMany({
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

  static async getSubmissionByDeviceId(deviceId: string, airlineId: string) {
    return prisma.submission.findMany({
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

  static async createSubmission(data: CreateSubmissionSchemaType) {
    const { deviceId, selectedYear, status, airlineId, assessments } = data;

    const countSubmission = await prisma.submission.count({
      where: {
        deviceId,
        createdAt: {
          gte: new Date(new Date().getFullYear(), 0, 1),
          lt: new Date(new Date().getFullYear() + 1, 0, 1),
        },
      },
    });
    if (countSubmission > 8)
      throw new HttpError(
        409,
        "You maximum 8 submission per device in one year",
      );

    const submission = await this.getSubmissionByDeviceId(deviceId, airlineId);
    if (submission.length > 0)
      throw new HttpError(409, "Submission already submitted");

    const submissions = await prisma.submission.create({
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

    const { totalSubmissions, totalPass } =
      await StatisticsService.getStatistics();
    return {
      name: submissions.airline.name,
      date: submissions.date,
      totalResponse: totalSubmissions,
      successRate: (totalPass / totalSubmissions) * 100,
    };
  }

  static async getAllSubmissions(start: number, end: number) {
    console.log(start, end);
    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        include: { assessments: true, airline: true },
        orderBy: { createdAt: "desc" },
        ...(start && end
          ? {
              skip: start,
              take: end,
            }
          : {}),
      }),
      prisma.submission.count(),
    ]);

    return {
      total,
      submissions,
    };
  }

  static async getSubmissionById(id: string) {
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { assessments: true, airline: true },
    });
    if (!submission) throw new HttpError(404, "Submission not found");
    return submission;
  }

  static async updateSubmission(id: string, data: UpdateSubmissionSchemaType) {
    return await prisma.submission.update({
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

  static async deleteSubmission(id: string) {
    await prisma.submission.delete({ where: { id } });
    return { message: "Submission deleted successfully" };
  }
}
