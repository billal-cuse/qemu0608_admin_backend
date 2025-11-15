"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = exports.CookieOptions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("./config/auth.config");
class CookieOptions {
}
exports.CookieOptions = CookieOptions;
CookieOptions.accessCookie = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
};
CookieOptions.refreshCookie = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/auth/refresh-token",
    sameSite: "lax",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
};
class JWT {
    static generateVerificationToken(email) {
        return jsonwebtoken_1.default.sign({ email }, auth_config_1.JWT_SECRET, {
            expiresIn: auth_config_1.JWT_EXPIRY,
        });
    }
    static verifyVerificationToken(token) {
        if (!token)
            throw new Error("Invalid token");
        return jsonwebtoken_1.default.verify(token, auth_config_1.JWT_SECRET);
    }
    static generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, auth_config_1.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: auth_config_1.JWT_ACCESS_TOKEN_EXPIRY,
        });
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, auth_config_1.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: auth_config_1.JWT_REFRESH_TOKEN_EXPIRY,
        });
    }
    static generateAccessTokenRefreshToken(user) {
        const AccessToken = this.generateAccessToken({
            id: user.id,
        });
        const RefreshToken = this.generateRefreshToken({
            id: user.id,
        });
        return [AccessToken, RefreshToken];
    }
    static verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, auth_config_1.JWT_ACCESS_TOKEN_SECRET);
    }
    static verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, auth_config_1.JWT_REFRESH_TOKEN_SECRET);
    }
}
exports.JWT = JWT;
