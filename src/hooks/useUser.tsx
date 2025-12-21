// src/hooks/use-user.ts
import { useQuery } from "@tanstack/react-query";
import { userQuery } from "@/client/queries/get-user";

export const useUser = () => {
  return useQuery(userQuery());
};
