import { type loginFormData } from "@/schema/auth-schema";

import { loginService } from "../services/auth-service";

export const loginMutation = () => ({
  mutationKey: ["auth", "login"],
  mutationFn: (formData: loginFormData) => loginService(formData),
});
