import { useMutation } from "@tanstack/react-query";
import { signUpMutation } from "@/client/mutations/sign-up";

const useAuth = () => {
  const createUser = useMutation(signUpMutation());

  return { createUser };
};

export default useAuth;
