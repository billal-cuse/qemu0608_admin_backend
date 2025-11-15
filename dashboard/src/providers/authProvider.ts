import { ApiClient } from "../lib/apiClient";
import { AxiosError } from "axios";
import { CustomAuthProvider } from "./type";

export const authProvider: CustomAuthProvider = {
  register: async ({ email, password, name }) => {
    await ApiClient.post("/auth/signup", {
      email,
      password,
      name,
    });

    return {
      success: true,
      redirectTo: "/",
    };
  },

  login: async ({ email, password }) => {
    await ApiClient.post("/auth/login", {
      email,
      password,
    });

    return {
      success: true,
      redirectTo: "/",
    };
  },

  logout: async () => {
    await ApiClient.get("/auth/logout");
    return {
      success: true,
      redirectTo: "/auth",
    };
  },

  onError: async (error) => {
    console.log(error);
    if (error instanceof AxiosError) {
      return {
        error,
      };
    }
    return {
      error,
    };
  },

  check: async () => {
    try {
      await ApiClient.get("/auth/session");
      return {
        authenticated: true,
      };
    } catch (err) {
      return {
        authenticated: false,
        redirectTo: "/auth",
      };
    }
  },

  getIdentity: async () => {
    const { data } = await ApiClient.get("/auth/session");
    return data;
  },

  getPermissions: async () => {
    return null;
  },

  forgotPassword: async ({ email }) => {
    await ApiClient.post("/auth/forgot-password", { email });
    return {
      success: true,
      redirectTo: "/auth/otp?email=" + email,
    };
  },

  updatePassword: async ({ oldPassword, password }) => {
    console.log(oldPassword, password);
    await ApiClient.post("/profile/change-password", {
      oldPassword,
      password,
    });

    return {
      success: true,
    };
  },

  resetPassword: async () => {
    return {
      success: true,
    };
  },

  verifyOtp: async ({ otp }) => {
    await ApiClient.post("/auth/reset-password", {
      otp,
    });
    return {
      success: true,
    };
  },
};
