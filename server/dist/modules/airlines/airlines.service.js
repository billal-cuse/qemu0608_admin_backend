"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlinesService = void 0;
const HttpError_1 = require("../../lib/HttpError");
const prisma_1 = __importDefault(require("../../config/prisma"));
class AirlinesService {
    static async createAirline(name) {
        if (!name)
            throw new HttpError_1.HttpError(400, "Airline name is required");
        return prisma_1.default.airlines.create({ data: { name } });
    }
    static async getAllAirlines() {
        return prisma_1.default.airlines.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    static async getAirlineById(id) {
        const airline = await prisma_1.default.airlines.findUnique({ where: { id } });
        if (!airline)
            throw new HttpError_1.HttpError(404, "Airline not found");
        return airline;
    }
    static async searchAirlines(query) {
        if (!query)
            throw new HttpError_1.HttpError(400, "Search query required");
        console.log(query);
        return prisma_1.default.airlines.findMany({
            where: { name: { contains: query, mode: "insensitive" } },
            orderBy: { name: "asc" },
        });
    }
    static async updateAirline(id, name) {
        if (!name)
            throw new HttpError_1.HttpError(400, "Airline name is required");
        const updated = await prisma_1.default.airlines.update({
            where: { id },
            data: { name },
        });
        if (!updated)
            throw new HttpError_1.HttpError(404, "Airline not found");
        return updated;
    }
    static async deleteAirline(id) {
        const deleted = await prisma_1.default.airlines.delete({ where: { id } });
        if (!deleted)
            throw new HttpError_1.HttpError(404, "Airline not found");
        return { message: "Airline deleted successfully" };
    }
}
exports.AirlinesService = AirlinesService;
