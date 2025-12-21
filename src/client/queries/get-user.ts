// src/queries/user-query.ts
import { getUserService } from "../services/auth-service";

export const userQuery = () => ({
  queryKey: ["user", "me"],
  queryFn: () => getUserService(),
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: false,
});
