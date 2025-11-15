import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const AppConfigurationSchema = z.object({
  PORT: z.number().optional(),
  CLIENT_URL: z.string().optional(),
  NODE_ENV: z.string(),
  BASE_URL: z.string(),
  REDIRECT_URL: z.string(),
});

export const { PORT, CLIENT_URL, NODE_ENV, BASE_URL, REDIRECT_URL } =
  AppConfigurationSchema.parse({
    PORT: Number(process.env.PORT) || 3000,
    CLIENT_URL: process.env.CLIENT_URL,
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    REDIRECT_URL: process.env.REDIRECT_URL,
  });
