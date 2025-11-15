"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const AsyncHandler_1 = require("../../lib/AsyncHandler");
const statistics_service_1 = require("./statistics.service");
const ResponseApi_1 = require("../../lib/ResponseApi");
const statistics_schema_1 = require("./statistics.schema");
const zod_1 = require("zod");
class StatisticsController {
    constructor() {
        this.getStatistics = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const data = await statistics_service_1.StatisticsService.getStatistics();
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Airlines Overview", data);
        });
        this.airlinesOverview = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const data = statistics_schema_1.StatisticsSchema.parse(req.query);
            const response = await statistics_service_1.StatisticsService.airlinesOverview(data);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Airlines Overview", response);
        });
        this.byPassRate = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const date = zod_1.z
                .string()
                .transform((v) => new Date(v))
                .parse(req.query.date);
            const response = await statistics_service_1.StatisticsService.byPassRate(date);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Airlines by pass rate", response);
        });
        this.bySubmissions = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const date = zod_1.z
                .string()
                .transform((v) => new Date(v))
                .parse(req.query.date);
            const response = await statistics_service_1.StatisticsService.bySubmissions(date);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Airlines by pass rate", response);
        });
    }
}
exports.StatisticsController = StatisticsController;
