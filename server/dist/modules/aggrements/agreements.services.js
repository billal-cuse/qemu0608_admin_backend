"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementsService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const HttpError_1 = require("../../lib/HttpError");
class AgreementsService {
    static async get({ type }) {
        const agreement = await prisma_1.default.aggrementInfo.findFirst({
            where: {
                type,
            },
        });
        if (!agreement)
            throw new HttpError_1.HttpError(404, "Agreement not found");
        return agreement;
    }
    static async create({ type, title, content, role, }) {
        return prisma_1.default.aggrementInfo.create({
            data: {
                role,
                type,
                title,
                content,
            },
        });
    }
    static async update(id, update) {
        return prisma_1.default.aggrementInfo.update({
            where: {
                id,
            },
            data: {
                ...update,
            },
        });
    }
}
exports.AgreementsService = AgreementsService;
