import { createTransport } from "nodemailer";
import {
  SMTP_AUTH_PASSWORD,
  SMTP_AUTH_USER,
  SMTP_HOST,
  SMTP_MAIL_FROM,
  SMTP_PORT,
  SMTP_SECURE,
} from "./mail.config";
import { join } from "path";
import ejs from "ejs";
import { HttpError } from "../../lib/HttpError";

export class MailService {
  private static readonly transporter = createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_AUTH_USER,
      pass: SMTP_AUTH_PASSWORD,
    },
  });

  static async sendMail(
    to: string,
    subject: string,
    text: string,
    templateName: string,
    context: ejs.Data = {},
  ) {
    try {
      const templatePath = join(
        process.cwd(),
        "src",
        "modules",
        "mail",
        "templates",
        `${templateName}.ejs`,
      );

      const html = await ejs.renderFile(templatePath, context);

      return this.transporter.sendMail({
        from: SMTP_MAIL_FROM,
        to,
        subject,
        text,
        html,
      });
    } catch (error) {
      throw new HttpError(500, "server side error");
    }
  }
}
