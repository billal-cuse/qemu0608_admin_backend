import {AuthActionResponse, AuthProvider} from "@refinedev/core";
import {UpdateUserSchemaType} from "../pages/settings/user.schema";
import {LoginSchemaType} from "../pages/auth/auth.schema";

export interface CustomAuthProvider extends AuthProvider{
    resetPassword: (params: UpdateUserSchemaType) => Promise<AuthActionResponse>;
    login: (params: LoginSchemaType) => Promise<AuthActionResponse>;
    verifyOtp: (params: {otp: string}) => Promise<AuthActionResponse>;
}
