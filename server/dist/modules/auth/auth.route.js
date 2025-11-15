"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const protected_1 = require("./gurard/protected");
class AuthRoute {
    constructor(controller = new auth_controller_1.AuthController()) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router.route("/signup").post(controller.signup);
        this.router.route("/login").post(controller.login);
        this.router.route("/refresh-token").get(controller.refreshToken);
        this.router.route("/verify-otp").post(protected_1.Protected, controller.verifyOtp);
        this.router
            .route("/verify-otp-resent")
            .get(protected_1.Protected, controller.resendOtp);
        this.router.route("/verify/:token").get(controller.verifyByToken);
        this.router.route("/forgot-password").post(controller.forgotPassword);
        this.router.route("/forgot-password/otp").post(controller.forgotByOtp);
        this.router
            .route("/reset-password/:token")
            .post(controller.resetPasswordByToken);
        this.router.route("/logout").get(protected_1.Protected, controller.logout);
        this.router.route("/session").get(protected_1.Protected, controller.session);
    }
}
exports.AuthRouter = new AuthRoute().router;
