"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const protected_1 = require("./protected");
const AsyncHandler_1 = require("../../../lib/AsyncHandler");
exports.Authenticate = [
    protected_1.Protected,
    (0, AsyncHandler_1.asyncHandler)((req, res, next) => {
        if (!req.account.isVerified)
            throw new Error("Account is not verified");
        next();
    }),
];
