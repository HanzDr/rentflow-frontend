import { type signUpFormData, type loginFormData } from "@/schema/auth-schema";
import { apiRequest } from "@/lib/api-client";

export interface GetUserResponse {
  user: AuthUser;
}

export interface SignUpResponse {
  message: string;
  user: AuthUser;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  role: string;
  avatarUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const mapSignUpFormToPayload = (payload: signUpFormData) => {
  return {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    mobileNumber: payload.mobileNumber,
    password: payload.password,
  };
};

const mapLoginFormToPayload = (payload: loginFormData) => {
  return {
    email: payload.email,
    password: payload.password,
  };
};

export const signUpService = async (signUpFormData: signUpFormData) => {
  const payload = mapSignUpFormToPayload(signUpFormData);
  console.log(payload);
  return apiRequest<SignUpResponse>("auth/signup", {
    method: "POST",
    body: payload,
  });
};

export const loginService = async (loginFormData: loginFormData) => {
  console.log("HELLOO");
  const payload = mapLoginFormToPayload(loginFormData);
  return apiRequest<LoginResponse>("auth/login", {
    method: "POST",
    body: payload,
  });
};

export const logoutService = async () => {
  return apiRequest<{ message: string }>("auth/logout", {
    method: "POST",
  });
};

export const refreshTokenService = async () => {
  return apiRequest<LoginResponse>("auth/refresh", {
    method: "POST",
  });
};

export const getUserService = async () => {
  return apiRequest<GetUserResponse>("auth/me", {
    method: "GET",
  });
};
