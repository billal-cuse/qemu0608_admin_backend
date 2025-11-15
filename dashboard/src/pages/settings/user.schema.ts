import {z} from "zod";

export const UserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    avatar: z.string().optional(),
})

export const UpdateUserSchema = UserSchema.partial()

export type UserSchemaType = z.infer<typeof UserSchema>
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>

export const UpdatePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
})

export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>