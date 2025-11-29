import type { UseFormReturn } from "react-hook-form";
import { type loginFormData } from "@/schema/auth-schema";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./card";
import { Input } from "./input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { Link } from "react-router-dom";

interface LoginFormProps {
  form: UseFormReturn<loginFormData>;
  onSubmit: (formData: loginFormData) => void;
}
const LoginForm = ({ form, onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-brown text-3xl font-bold text-center">
          RENTFLOW
        </CardTitle>
        <CardDescription className="text-center text-xs">Login</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              required
              className="text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-sm font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="text-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full gap-2 mt-4">
            <div className="flex flex-col w-full gap-2">
              <Button
                className="bg-black"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </Button>
            </div>

            <p className="text-xs text-center">
              Don't have an account?{" "}
              <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                <Link to="/sign-up">Sign Up</Link>
              </span>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
