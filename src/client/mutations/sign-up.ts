import { type signUpFormData } from "@/schema/auth-schema";
import { signUpService } from "../services/auth-service";
export const signUpMutation = () => ({
  mutationKey: ["auth", "sign-up"],
  mutationFn: (formData: signUpFormData) => signUpService(formData),
});
