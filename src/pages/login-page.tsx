import LoginForm from "@/components/ui/login-form";
import { type loginFormData, loginFormSchema } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = async () => {};
  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/background/login.jpg')" }}
    >
      <LoginForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
