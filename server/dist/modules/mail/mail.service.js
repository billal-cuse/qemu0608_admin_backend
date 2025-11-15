"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = require("nodemailer");
const mail_config_1 = require("./mail.config");
const path_1 = require("path");
const ejs_1 = __importDefault(require("ejs"));
const HttpError_1 = require("../../lib/HttpError");
class MailService {
    static async sendMail(to, subject, text, templateName, context = {}) {
        try {
            const templatePath = (0, path_1.join)(process.cwd(), "src", "modules", "mail", "templates", `${templateName}.ejs`);
            const html = await ejs_1.default.renderFile(templatePath, context);
            return this.transporter.sendMail({
                from: mail_config_1.SMTP_MAIL_FROM,
                to,
                subject,
                text,
                html,
            });
        }
        catch (error) {
            throw new HttpError_1.HttpError(500, "server side error");
        }
    }
}
exports.MailService = MailService;
MailService.transporter = (0, nodemailer_1.createTransport)({
    host: mail_config_1.SMTP_HOST,
    port: Number(mail_config_1.SMTP_PORT) || 587,
    secure: mail_config_1.SMTP_SECURE === "true",
    auth: {
        user: mail_config_1.SMTP_AUTH_USER,
        pass: mail_config_1.SMTP_AUTH_PASSWORD,
    },
});
