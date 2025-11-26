import SignUpForm from "@/components/ui/sign-up-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type signUpFormData, signUpFormSchema } from "@/schema/auth-schema";
const SignUpPage = () => {
  const form = useForm<signUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });
  const onSubmit = async () => {};
  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/background/sign-up.jpg')" }}
    >
      <SignUpForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default SignUpPage;
