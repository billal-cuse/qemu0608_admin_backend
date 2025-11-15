"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protected = void 0;
const AsyncHandler_1 = require("../../../lib/AsyncHandler");
const jwt_1 = require("../jwt");
const prisma_1 = __importDefault(require("../../../config/prisma"));
const jwt = new jwt_1.JWT();
exports.Protected = (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    const user = jwt_1.JWT.verifyAccessToken(token);
    if (!user)
        return res.status(401).json({ message: "Unauthorized" });
    const validateUser = await prisma_1.default.account.findUnique({
        where: {
            id: user.id,
        },
        include: {
            user: true,
        },
    });
    if (!validateUser)
        return res.status(401).json({ message: "Unauthorized" });
    req.user = validateUser.user;
    req.account = validateUser;
    next();
});
