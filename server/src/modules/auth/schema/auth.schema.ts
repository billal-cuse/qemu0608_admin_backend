import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const VerifyOtpSchema = z.object({
  email: z.string(),
  otp: z.string().transform((val) => Number(val)),
});

export type SignupSchemaType = z.infer<typeof SignUpSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type VerifyOtpSchemaType = z.infer<typeof VerifyOtpSchema>;
