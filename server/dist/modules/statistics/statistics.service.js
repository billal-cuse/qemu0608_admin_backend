"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class StatisticsService {
    static async getStatistics() {
        const [totalSubmissions, totalPass, totalFail, totalAirlines] = await Promise.all([
            prisma_1.default.submission.count(),
            prisma_1.default.submission.count({
                where: {
                    status: "PASS",
                },
            }),
            prisma_1.default.submission.count({
                where: {
                    status: "FAIL",
                },
            }),
            prisma_1.default.airlines.count(),
        ]);
        return {
            totalSubmissions,
            totalPass,
            totalFail,
            totalAirlines,
        };
    }
    static async airlinesOverview({ name, date }) {
        let month;
        let year;
        if (date) {
            month = date.getMonth() + 1; // getMonth() is 0-based
            year = date.getFullYear();
        }
        const submissions = await prisma_1.default.submission.findMany({
            where: month && year
                ? {
                    airline: {
                        name,
                    },
                    createdAt: {
                        gte: new Date(year, month - 1, 1),
                        lt: new Date(year, month, 1),
                    },
                }
                : undefined,
            include: {
                airline: true,
                assessments: true,
            },
        });
        // Group by airline
        const overviewMap = new Map();
        submissions.forEach((sub) => {
            const airlineId = sub.airline.id;
            if (!overviewMap.has(airlineId)) {
                overviewMap.set(airlineId, {
                    airlineId,
                    airlineName: sub.airline.name,
                    totalSubmissions: 0,
                    pass: 0,
                    fail: 0,
                    totalAssessments: 0,
                });
            }
            const data = overviewMap.get(airlineId);
            data.totalSubmissions += 1;
            data.pass += sub.status === "PASS" ? 1 : 0;
            data.fail += sub.status === "FAIL" ? 1 : 0;
            data.totalAssessments += sub.assessments.length;
        });
        // compute assessments
        const assessments = new Set();
        submissions.forEach((a) => a.assessments.forEach((e) => {
            assessments.add(e.name);
        }));
        // Compute success rate
        return Array.from(overviewMap.values()).map((d) => ({
            ...d,
            successRate: d.totalSubmissions ? (d.pass / d.totalSubmissions) * 100 : 0,
            assessments: Array.from(assessments),
        }))[0];
    }
    static async byPassRate(date) {
        let startDate;
        let endDate;
        if (date) {
            const year = date.getFullYear();
            startDate = new Date(year, 0, 1);
            endDate = new Date(year + 1, 0, 1);
        }
        // Step 1: Group by airlineId and status to get counts
        const grouped = await prisma_1.default.submission.groupBy({
            by: ["airlineId", "status"],
            where: startDate && endDate
                ? {
                    createdAt: { gte: startDate, lt: endDate },
                }
                : undefined,
            _count: { id: true },
        });
        // Step 2: Fetch airline names
        const airlineIds = Array.from(new Set(grouped.map((g) => g.airlineId)));
        const airlines = await prisma_1.default.airlines.findMany({
            where: { id: { in: airlineIds } },
            select: { id: true, name: true },
        });
        // Step 3: Merge counts per airline
        const overviewMap = new Map();
        airlines.forEach((a) => {
            overviewMap.set(a.id, {
                airlineName: a.name,
                totalSubmissions: 0,
                totalPass: 0,
                totalFail: 0,
            });
        });
        grouped.forEach((g) => {
            const data = overviewMap.get(g.airlineId);
            if (!data)
                return;
            data.totalSubmissions += g._count.id;
            if (g.status === "PASS")
                data.totalPass = g._count.id;
            if (g.status === "FAIL")
                data.totalFail = g._count.id;
        });
        const data = Array.from(overviewMap.values());
        return data
            .map((item) => ({
            name: item.airlineName,
            successRate: item.totalSubmissions
                ? (item.totalPass / item.totalSubmissions) * 100
                : 0,
        }))
            .sort((a, b) => b.successRate - a.successRate);
    }
    static bySubmissions(date) {
        const year = date.getFullYear();
        const startDate = new Date(year, 0, 1); // Jan 1
        const endDate = new Date(year + 1, 0, 1); // Jan 1 next year
        return prisma_1.default.airlines.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            include: {
                _count: {
                    select: {
                        submissions: true, // total submissions per airline
                    },
                },
            },
            orderBy: {
                submissions: {
                    _count: "desc",
                },
            },
        });
    }
}
exports.StatisticsService = StatisticsService;
