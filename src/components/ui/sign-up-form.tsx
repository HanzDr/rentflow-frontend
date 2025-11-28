import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "./checkbox";
import { Link } from "react-router-dom";
import { type signUpFormData } from "@/schema/auth-schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "./input";
import { PhoneInput } from "./phone-input";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./button";

//Test
interface SignUpFormProps {
  form: UseFormReturn<signUpFormData>;
  onSubmit: (signUpFormData: signUpFormData) => void;
}

const SignUpForm = ({ form, onSubmit }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className="w-full max-w-sm px-4 py-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-brown text-3xl font-bold text-center">
          RENTFLOW
        </CardTitle>
        <CardDescription className="text-center text-xs">
          Create your account
        </CardDescription>
      </CardHeader>

      {/* 👇 Move form to wrap content + footer  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-2">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName" className="text-sm font-semibold">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                required
                className="text-sm"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="text-sm font-semibold">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                required
                className="text-sm"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                className="text-sm"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <Label htmlFor="number" className="text-sm font-semibold">
                Mobile Number
              </Label>
              <Controller
                name="mobileNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    id="number"
                    defaultCountry="PH"
                    placeholder="9XXXXXXXXX"
                    required
                  />
                )}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-semibold">
                Enter your password
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="text-sm"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-semibold"
              >
                Confirm your password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="text-sm"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex gap-2">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me" className="text-xs font-semibold">
                Remember me
              </Label>
            </div>

            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 hover:underline text-center"
            >
              Forgot Password?
            </Link>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col w-full gap-2">
              {/* 👇 now this is inside the form */}
              <Button
                className="bg-black"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </Button>

              <p className="text-center font-bold text-xs">or</p>

              <Button className="bg-white border-2 text-black hover:bg-accent">
                <FcGoogle /> Continue with Google
              </Button>
            </div>

            <p className="text-xs text-center">
              Already have an account?{" "}
              <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                Login
              </span>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
