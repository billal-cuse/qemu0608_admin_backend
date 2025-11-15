"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AsyncHandler_1 = require("../../lib/AsyncHandler");
const auth_schema_1 = require("./schema/auth.schema");
const jwt_1 = require("./jwt");
const HttpError_1 = require("../../lib/HttpError");
const ResponseApi_1 = require("../../lib/ResponseApi");
const account_service_1 = require("../account/account.service");
const auth_service_1 = require("./auth.service");
const app_env_1 = require("../../config/env/app.env");
class AuthController {
    constructor() {
        this.signup = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const user = await auth_service_1.AuthService.signup(auth_schema_1.SignUpSchema.parse(req.body));
            const [accessToken, refreshToken] = jwt_1.JWT.generateAccessTokenRefreshToken(user);
            res.cookie("accessToken", accessToken, jwt_1.CookieOptions.accessCookie);
            res.cookie("refreshToken", refreshToken, jwt_1.CookieOptions.refreshCookie);
            res.header("Authorization", `Bearer ${accessToken}`);
            res.header("x-refresh-token", refreshToken);
            return (0, ResponseApi_1.ResponseApi)(res, 201, "Signed up successfully");
        });
        this.login = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const account = await auth_service_1.AuthService.login(auth_schema_1.LoginSchema.parse(req.body));
            const [accessToken, refreshToken] = jwt_1.JWT.generateAccessTokenRefreshToken(account);
            res.cookie("accessToken", accessToken, jwt_1.CookieOptions.accessCookie);
            res.cookie("refreshToken", refreshToken, jwt_1.CookieOptions.refreshCookie);
            res.header("Authorization", `Bearer ${accessToken}`);
            res.header("x-refresh-token", refreshToken);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Logged in successfully", {
                accessToken,
                refreshToken,
                user: account.user,
            });
        });
        this.logout = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            res.clearCookie("accessToken", jwt_1.CookieOptions.accessCookie);
            res.clearCookie("refreshToken", jwt_1.CookieOptions.refreshCookie);
            res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        });
        this.refreshToken = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const token = req.cookies.refreshToken;
            const account = await auth_service_1.AuthService.refreshToken(token);
            const [accessToken, refreshToken] = jwt_1.JWT.generateAccessTokenRefreshToken(account);
            res.cookie("accessToken", accessToken, jwt_1.CookieOptions.accessCookie);
            res.cookie("refreshToken", refreshToken, jwt_1.CookieOptions.refreshCookie);
            res.header("Authorization", `Bearer ${accessToken}`);
            res.header("x-refresh-token", refreshToken);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Refreshed successfully");
        });
        this.session = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Session successfully", {
                account: req.account,
            });
        });
        this.verifyOtp = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { otp } = req.body;
            const { id } = req.account;
            if (await auth_service_1.AuthService.checkIsVerified(id))
                return res.status(200).json({
                    success: false,
                    message: "Account already verified",
                    data: {
                        isVerified: true,
                    },
                });
            await account_service_1.AccountService.verifyOtp(id, otp);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Verified successfully");
        });
        this.resendOtp = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            await auth_service_1.AuthService.resendOtp(req.user.id);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Resend successfully");
        });
        this.verifyByToken = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { token } = req.params;
            if (!token)
                throw new HttpError_1.HttpError(401, "Token is required");
            await account_service_1.AccountService.verifyByToken(token);
            return res.redirect(app_env_1.REDIRECT_URL);
        });
        this.forgotPassword = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { email } = req.body;
            const account = await account_service_1.AccountService.forgotPassword(email);
            return res.status(200).json({
                success: true,
                message: "Email sent successfully",
            });
        });
        this.forgotByOtp = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { otp, email } = auth_schema_1.VerifyOtpSchema.parse(req.body);
            const account = await account_service_1.AccountService.forgotOtpVerify({ otp, email });
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Otp Verified", {
                token: account.forgottenToken,
                email,
            });
        });
        this.resetPasswordByToken = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { password } = req.body;
            const { token } = req.params;
            await account_service_1.AccountService.resetPasswordByToken(token, password);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Password reset successfully");
        });
    }
}
exports.AuthController = AuthController;
