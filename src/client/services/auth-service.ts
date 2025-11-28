import { type signUpFormData } from "@/schema/auth-schema";
import { apiRequest } from "@/lib/api-client";

export interface SignUpResponse {
  user: AuthUser;
  token: string;
}

export interface AuthUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  role: string;
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

export const signUpService = async (signUpFormData: signUpFormData) => {
  const payload = mapSignUpFormToPayload(signUpFormData);
  console.log(payload);
  return apiRequest<SignUpResponse>("/auth/signup", {
    method: "POST",
    body: payload,
  });
};
