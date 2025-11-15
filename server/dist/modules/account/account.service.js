"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const argon2_1 = require("argon2");
const HttpError_1 = require("../../lib/HttpError");
const generate_1 = require("../../utlis/generate");
const mail_service_1 = require("../mail/mail.service");
class AccountService {
    static async findById(id) {
        return prisma_1.default.account.findFirst({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
    }
    static async findByEmail(email) {
        return prisma_1.default.account.findFirst({
            where: {
                email,
            },
            include: {
                user: true,
            },
        });
    }
    static async updatePassword(id, currentPassword, { oldPassword, newPassword }) {
        const isValidPassword = await (0, argon2_1.verify)(currentPassword, oldPassword);
        console.log(isValidPassword);
        if (!isValidPassword) {
            throw new HttpError_1.HttpError(401, "Invalid password");
        }
        return prisma_1.default.account.update({
            where: {
                id,
            },
            data: {
                password: await (0, argon2_1.hash)(newPassword),
            },
            include: {
                user: true,
            },
        });
    }
    static async verifyOtp(id, otp) {
        try {
            return await prisma_1.default.account.update({
                where: {
                    id,
                    verifyOtp: otp,
                },
                data: {
                    isVerified: true,
                    verifyOtp: null,
                    verifyToken: null,
                    verifyExpiry: null,
                },
            });
        }
        catch (error) {
            throw new HttpError_1.HttpError(401, "Invalid otp");
        }
    }
    static async verifyByToken(token) {
        const account = await prisma_1.default.account.updateMany({
            where: {
                verifyToken: token,
                verifyExpiry: {
                    gte: new Date(),
                },
            },
            data: {
                isVerified: true,
                verifyOtp: null,
                verifyToken: null,
                verifyExpiry: null,
            },
        });
        if (account.count === 0)
            throw new HttpError_1.HttpError(401, "Invalid token");
        return account;
    }
    static async forgotPassword(email) {
        const user = await prisma_1.default.account.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            throw new HttpError_1.HttpError(401, "Invalid email");
        }
        const otp = (0, generate_1.generateOtp)();
        const token = (0, generate_1.generateToken)();
        const expiry = new Date(Date.now() + 1000 * 60 * 5);
        const account = await prisma_1.default.account.update({
            where: {
                email,
            },
            data: {
                forgottenOtp: otp,
                forgottenToken: token,
                forgottenExpiry: expiry,
            },
            include: {
                user: true,
            },
        });
        await mail_service_1.MailService.sendMail(account.email, "Forgot your password", "please verify your account.", "forgot", {
            otp,
            token,
            name: account.user.name,
        });
        return account;
    }
    static async forgotOtpVerify({ otp, email }) {
        const account = await prisma_1.default.account.findUnique({
            where: {
                email,
                forgottenOtp: otp,
                forgottenExpiry: {
                    gte: new Date(),
                },
            },
        });
        if (!account)
            throw new HttpError_1.HttpError(401, "Invalid otp");
        await prisma_1.default.account.update({
            where: {
                email,
            },
            data: {
                forgottenOtp: null,
            },
        });
        return account;
    }
    static async resetPasswordByToken(token, password) {
        console.log(token);
        const account = await prisma_1.default.account.updateMany({
            where: {
                forgottenToken: token,
                forgottenExpiry: {
                    gte: new Date(),
                },
            },
            data: {
                password: await (0, argon2_1.hash)(password),
                forgottenOtp: null,
                forgottenToken: null,
                forgottenExpiry: null,
            },
        });
        if (account.count === 0)
            throw new HttpError_1.HttpError(400, "Invalid token");
        return account;
    }
    static async resetPasswordByOtp(email, otp, password) {
        try {
            return prisma_1.default.account.update({
                where: {
                    email,
                    forgottenOtp: otp,
                    forgottenExpiry: {
                        gte: new Date(),
                    },
                },
                data: {
                    password: await (0, argon2_1.hash)(password),
                    forgottenOtp: null,
                    forgottenToken: null,
                    forgottenExpiry: null,
                },
            });
        }
        catch (error) {
            throw new HttpError_1.HttpError(401, "Invalid otp");
        }
    }
}
exports.AccountService = AccountService;
