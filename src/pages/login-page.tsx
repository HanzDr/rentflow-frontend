import LoginForm from "@/components/ui/login-form";
import { type loginFormData, loginFormSchema } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginMutation } from "@/client/mutations/login";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate: login } = useMutation({
    ...loginMutation(),
    onSuccess: (data) => {
      toast.success(data.message || "Login successful!");
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to log in");
    },
  });

  const onSubmit = async (data: loginFormData) => {
    login(data);
  };

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
