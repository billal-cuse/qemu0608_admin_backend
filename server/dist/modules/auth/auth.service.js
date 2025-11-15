"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const argon2_1 = require("argon2");
const account_service_1 = require("../account/account.service");
const HttpError_1 = require("../../lib/HttpError");
const jwt_1 = require("./jwt");
const generate_1 = require("../../utlis/generate");
const mail_service_1 = require("../mail/mail.service");
class AuthService {
    static async signup({ name, email, password, role }) {
        const existingUser = await account_service_1.AccountService.findByEmail(email);
        if (existingUser)
            throw new HttpError_1.HttpError(409, "Email already exists");
        const hashedPassword = await (0, argon2_1.hash)(password);
        const verifyOtp = (0, generate_1.generateOtp)();
        const verifyToken = (0, generate_1.generateToken)();
        const verifyExpiry = new Date(Date.now() + 1000 * 60 * 5);
        const account = await prisma_1.default.account.create({
            data: {
                email,
                password: hashedPassword,
                verifyOtp,
                verifyToken,
                verifyExpiry,
                user: {
                    create: {
                        name,
                        role,
                    },
                },
            },
            include: {
                user: true,
            },
        });
        mail_service_1.MailService.sendMail(account.email, "Verification", "please verify your account.", "verify", {
            otp: verifyOtp,
            token: verifyToken,
            name: account.user.name,
        });
        return account;
    }
    static async login({ email, password }) {
        const account = await account_service_1.AccountService.findByEmail(email);
        if (!account) {
            throw new HttpError_1.HttpError(401, "Invalid credentials");
        }
        const isMatch = await (0, argon2_1.verify)(account.password, password);
        if (!isMatch) {
            throw new HttpError_1.HttpError(401, "Invalid credentials");
        }
        if (!account.isVerified) {
            const verifyOtp = (0, generate_1.generateOtp)();
            const verifyToken = (0, generate_1.generateToken)();
            const verifyExpiry = new Date(Date.now() + 1000 * 60 * 5);
            await prisma_1.default.account.update({
                where: {
                    id: account.id,
                },
                data: {
                    verifyOtp,
                    verifyToken,
                    verifyExpiry,
                },
            });
            // Todo: send verification mail
        }
        return account;
    }
    static async refreshToken(token) {
        const id = jwt_1.JWT.verifyRefreshToken(token).id;
        const account = await account_service_1.AccountService.findById(id);
        if (!account) {
            throw new HttpError_1.HttpError(401, "Invalid credentials");
        }
        return account;
    }
    static async checkIsVerified(id) {
        const account = await account_service_1.AccountService.findById(id);
        return account?.isVerified ?? false;
    }
    static async verifyOtp(id, otp) {
        return account_service_1.AccountService.verifyOtp(id, otp);
    }
    static async resendOtp(id) {
        const verifyOtp = (0, generate_1.generateOtp)();
        const verifyToken = (0, generate_1.generateToken)();
        const verifyExpiry = new Date(Date.now() + 1000 * 60 * 5);
        const existing = await prisma_1.default.user.findUnique({
            where: { id },
            include: { account: true },
        });
        if (!existing || !existing.account)
            throw new HttpError_1.HttpError(401, "unauthorized");
        const user = await prisma_1.default.user.update({
            where: {
                id,
            },
            data: {
                account: {
                    update: {
                        verifyOtp,
                        verifyToken,
                        verifyExpiry,
                    },
                },
            },
            include: {
                account: true,
            },
        });
        await mail_service_1.MailService.sendMail(existing.account.email, "Verification", "please verify your account.", "verify", {
            otp: verifyOtp,
            token: verifyToken,
            name: user.name,
        });
    }
    static async verifyByToken(token) {
        return account_service_1.AccountService.verifyByToken(token);
    }
    static async forgotPassword(email) {
        return account_service_1.AccountService.forgotPassword(email);
    }
    static async forgotOtpVerify({ otp, email }) {
        return account_service_1.AccountService.forgotOtpVerify({ otp, email });
    }
    static async resetPasswordByToken(token, password) {
        return account_service_1.AccountService.resetPasswordByToken(token, password);
    }
    static async resetPasswordByOtp(email, otp, password) {
        return account_service_1.AccountService.resetPasswordByOtp(email, otp, password);
    }
}
exports.AuthService = AuthService;
