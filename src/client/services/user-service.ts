import { apiRequest } from "@/lib/api-client";
import { type AuthUser } from "./auth-service";

export interface GetUserResponse {
  user: AuthUser;
}
export const getUserService = async () => {
  return apiRequest<GetUserResponse>("auth/me", {
    method: "GET",
  });
};
