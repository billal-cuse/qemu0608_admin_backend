"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const cloudinary_1 = require("../../lib/cloudinary");
class UserService {
    static async findById(id) {
        return prisma_1.default.user.findUnique({
            where: {
                id,
            },
        });
    }
    static async update(id, data) {
        const { phone, ...updates } = data;
        return prisma_1.default.user.update({
            where: {
                id,
            },
            data: {
                ...updates,
            },
        });
    }
    static async uploadAvatar(id, file) {
        const oldAvatar = await this.findById(id);
        const uploadedAvatar = await cloudinary_1.Uploader.upload("avatar", file.buffer);
        await prisma_1.default.user.update({
            where: {
                id,
            },
            data: {
                avatar: uploadedAvatar.secure_url,
            },
        });
        if (oldAvatar?.avatar)
            await cloudinary_1.Uploader.destroy(oldAvatar.avatar);
        return uploadedAvatar;
    }
}
exports.UserService = UserService;
