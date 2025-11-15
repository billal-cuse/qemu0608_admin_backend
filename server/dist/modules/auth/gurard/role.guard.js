"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const AsyncHandler_1 = require("../../../lib/AsyncHandler");
const HttpError_1 = require("../../../lib/HttpError");
const Roles = (role, ...others) => (0, AsyncHandler_1.asyncHandler)((req, res, next) => {
    const roles = [role, ...others];
    console.log(roles);
    if (!roles.includes(req.user.role)) {
        throw new HttpError_1.HttpError(401, "You do not have permission to access this route.");
    }
    next();
});
exports.Roles = Roles;
