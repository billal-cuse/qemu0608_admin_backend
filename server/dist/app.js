"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const HttpError_1 = require("./lib/HttpError");
const ErrorHandler_1 = require("./middleware/ErrorHandler");
const auth_1 = require("./modules/auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = require("./modules/user");
const aggrements_1 = require("./modules/aggrements");
const logger_1 = require("./config/logger");
const airlines_1 = require("./modules/airlines");
const assessments_1 = require("./modules/assessments");
const submission_route_1 = require("./modules/submissions/submission.route");
const statistics_1 = require("./modules/statistics");
const payment_1 = require("./modules/payment");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        callback(null, origin || "*"); // return the requesting origin
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.router
    .route("/payment/webhook")
    .all(express_1.default.raw({ type: "application/json" }), payment_1.PaymentController.webhook);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.get("/", (_req, res) => {
    logger_1.logger.info("Server is running");
    res.json({
        success: true,
        message: "Server is running",
    });
});
app.use("/payment", payment_1.PaymentRouter);
app.use("/auth", auth_1.AuthRouter);
app.use("/profile", user_1.UserRouter);
app.use("/agreements", aggrements_1.AgreementsRouter);
app.use("/airlines", airlines_1.AirlinesRouter);
app.use("/assessments", assessments_1.AssessmentsRouter);
app.use("/submissions", submission_route_1.SubmissionRouter);
app.use("/statistics", statistics_1.StatisticsRouter);
app.use(HttpError_1.NotFoundHandler); // Handle doesn't exist routes
app.use(ErrorHandler_1.DefaultErrorHandler); // Default error handler
exports.default = app;
