import SignUpForm from "@/components/ui/sign-up-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type signUpFormData, signUpFormSchema } from "@/schema/auth-schema";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
const SignUpPage = () => {
  const { createUser } = useAuth();

  const form = useForm<signUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (formData: signUpFormData) => {
    try {
      await createUser.mutateAsync(formData);
      toast.success("Account Created Successfully");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

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
