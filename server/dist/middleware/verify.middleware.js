"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../modules/auth/config/auth.config");
const prisma_1 = __importDefault(require("../config/prisma"));
const verifyMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers["authorization"]?.split(" ")[1]; // Get token from 'Authorization: Bearer <token>'
        if (!token)
            return next({ name: "authorization", message: "No token provided" });
        const decoded = jsonwebtoken_1.default.verify(token, auth_config_1.JWT_ACCESS_TOKEN_SECRET);
        if (!decoded)
            return next({ name: "authorization", message: "No token provided" });
        const user = await prisma_1.default.account.findFirst({
            where: { id: decoded.id },
        });
        if (!user)
            return next({ name: "authorization", message: "unauthorized" });
        socket.data.userId = user.userId;
        next();
    }
    catch (err) {
        next({ name: "authorization", message: "No token provided" });
    }
};
exports.verifyMiddleware = verifyMiddleware;
