"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const AsyncHandler_1 = require("../../lib/AsyncHandler");
const ResponseApi_1 = require("../../lib/ResponseApi");
const user_schema_1 = require("./schema/user.schema");
const user_service_1 = require("./user.service");
const HttpError_1 = require("../../lib/HttpError");
const account_schema_1 = require("../account/schema/account.schema");
const account_service_1 = require("../account/account.service");
class UserController {
    constructor() {
        this.getUser = (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
            return (0, ResponseApi_1.ResponseApi)(res, 200, "User", {
                ...req.user,
            });
        });
        this.updateUser = (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
            const data = user_schema_1.updateUserSchema.parse(req.body);
            const account = await user_service_1.UserService.update(req.user.id, data);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "User updated", account);
        });
        this.updatePassword = (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
            const updates = account_schema_1.updatePasswordSchema.parse(req.body);
            await account_service_1.AccountService.updatePassword(req.account.id, req.account.password, updates);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "password updated", {});
        });
        this.updateAvatar = (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
            console.log(req.file);
            if (!req.file)
                throw new HttpError_1.HttpError(400, "An image required");
            const updates = await user_service_1.UserService.uploadAvatar(req.user.id, req.file);
            return (0, ResponseApi_1.ResponseApi)(res, 201, "Avatar updated", {
                avatar: updates.secure_url,
            });
        });
    }
}
exports.UserController = UserController;
