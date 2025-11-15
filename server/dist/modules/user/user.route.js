"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = exports.UserRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const protected_1 = require("../auth/gurard/protected");
const multer_1 = require("../../lib/multer");
class UserRoute {
    constructor(controller = new user_controller_1.UserController()) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router
            .route("/")
            .get(protected_1.Protected, controller.getUser)
            .patch(protected_1.Protected, controller.updateUser);
        this.router
            .route("/change-password")
            .patch(protected_1.Protected, controller.updatePassword);
        this.router
            .route("/avatar")
            .put(protected_1.Protected, multer_1.upload.single("avatar"), controller.updateAvatar);
    }
}
exports.UserRoute = UserRoute;
exports.UserRouter = new UserRoute().router;
