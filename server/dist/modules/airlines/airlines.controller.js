"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlinesController = void 0;
const AsyncHandler_1 = require("../../lib/AsyncHandler");
const ResponseApi_1 = require("../../lib/ResponseApi");
const airlines_service_1 = require("./airlines.service");
const airlines_schema_1 = require("./airlines.schema");
class AirlinesController {
    constructor() {
        this.getAll = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const airlines = await airlines_service_1.AirlinesService.getAllAirlines();
            return (0, ResponseApi_1.ResponseApi)(res, 200, "All Airlines", airlines);
        });
        this.getById = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const airline = await airlines_service_1.AirlinesService.getAirlineById(id);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Airline Details", airline);
        });
        this.create = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const body = airlines_schema_1.CreateAirlinesSchema.parse(req.body);
            const airline = await airlines_service_1.AirlinesService.createAirline(body.name);
            return (0, ResponseApi_1.ResponseApi)(res, 201, "Airline Created", airline);
        });
        this.update = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const body = airlines_schema_1.UpdateAirlinesSchema.parse(req.body);
            const airline = await airlines_service_1.AirlinesService.updateAirline(id, body.name);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Airline Updated", airline);
        });
        this.delete = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            await airlines_service_1.AirlinesService.deleteAirline(id);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Airline Deleted");
        });
        this.search = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { airline: query } = req.query;
            const assessments = await airlines_service_1.AirlinesService.searchAirlines(query);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Search Results", assessments);
        });
    }
}
exports.AirlinesController = AirlinesController;
