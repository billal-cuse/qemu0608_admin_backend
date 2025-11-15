import { asyncHandler } from "../../lib/AsyncHandler";
import {
  LoginSchema,
  SignUpSchema,
  VerifyOtpSchema,
} from "./schema/auth.schema";
import { CookieOptions, JWT } from "./jwt";
import { HttpError } from "../../lib/HttpError";
import { ResponseApi } from "../../lib/ResponseApi";
import { AccountService } from "../account/account.service";
import { AuthService } from "./auth.service";
import { REDIRECT_URL } from "../../config/env/app.env";

export class AuthController {
  signup = asyncHandler(async (req, res) => {
    const user = await AuthService.signup(SignUpSchema.parse(req.body));
    const [accessToken, refreshToken] =
      JWT.generateAccessTokenRefreshToken(user);

    res.cookie("accessToken", accessToken, CookieOptions.accessCookie);
    res.cookie("refreshToken", refreshToken, CookieOptions.refreshCookie);

    res.header("Authorization", `Bearer ${accessToken}`);
    res.header("x-refresh-token", refreshToken);

    return ResponseApi(res, 201, "Signed up successfully");
  });

  login = asyncHandler(async (req, res) => {
    const account = await AuthService.login(LoginSchema.parse(req.body));

    const [accessToken, refreshToken] =
      JWT.generateAccessTokenRefreshToken(account);

    res.cookie("accessToken", accessToken, CookieOptions.accessCookie);
    res.cookie("refreshToken", refreshToken, CookieOptions.refreshCookie);

    res.header("Authorization", `Bearer ${accessToken}`);
    res.header("x-refresh-token", refreshToken);

    return ResponseApi(res, 200, "Logged in successfully", {
      accessToken,
      refreshToken,
      user: account.user,
    });
  });

  logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", CookieOptions.accessCookie);
    res.clearCookie("refreshToken", CookieOptions.refreshCookie);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });

  refreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken;
    const account = await AuthService.refreshToken(token);

    const [accessToken, refreshToken] =
      JWT.generateAccessTokenRefreshToken(account);

    res.cookie("accessToken", accessToken, CookieOptions.accessCookie);
    res.cookie("refreshToken", refreshToken, CookieOptions.refreshCookie);

    res.header("Authorization", `Bearer ${accessToken}`);
    res.header("x-refresh-token", refreshToken);

    return ResponseApi(res, 200, "Refreshed successfully");
  });

  session = asyncHandler(async (req, res) => {
    return ResponseApi(res, 200, "Session successfully", {
      account: req.account,
    });
  });

  verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const { id } = req.account;

    if (await AuthService.checkIsVerified(id))
      return res.status(200).json({
        success: false,
        message: "Account already verified",
        data: {
          isVerified: true,
        },
      });

    await AccountService.verifyOtp(id, otp);

    return ResponseApi(res, 200, "Verified successfully");
  });

  resendOtp = asyncHandler(async (req, res) => {
    await AuthService.resendOtp(req.user.id);

    return ResponseApi(res, 200, "Resend successfully");
  });

  verifyByToken = asyncHandler(async (req, res) => {
    const { token } = req.params;
    if (!token) throw new HttpError(401, "Token is required");
    await AccountService.verifyByToken(token);

    return res.redirect(REDIRECT_URL);
  });

  forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const account = await AccountService.forgotPassword(email);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  });

  forgotByOtp = asyncHandler(async (req, res) => {
    const { otp, email } = VerifyOtpSchema.parse(req.body);
    const account = await AccountService.forgotOtpVerify({ otp, email });

    return ResponseApi(res, 200, "Otp Verified", {
      token: account.forgottenToken,
      email,
    });
  });

  resetPasswordByToken = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    await AccountService.resetPasswordByToken(token, password);
    return ResponseApi(res, 200, "Password reset successfully");
  });
}
