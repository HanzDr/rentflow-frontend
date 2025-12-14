import { logoutService } from "../services/auth-service";

export const logoutMutation = () => ({
  mutationKey: ["auth", "logout"],
  mutationFn: () => logoutService(),
});
