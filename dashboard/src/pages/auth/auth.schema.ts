import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const ChangePasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will show on confirmPassword field
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
