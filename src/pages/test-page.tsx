import SignUpForm from "@/components/ui/sign-up-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type signUpFormData, signUpFormSchema } from "@/schema/auth-schema";

const TestPage = () => {
  const form = useForm<signUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });
  const onSubmit = async () => {};
  return (
    <div>
      <SignUpForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default TestPage;
