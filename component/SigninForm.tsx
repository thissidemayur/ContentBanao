"use client";

import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";

import { useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface formInput {
  email: string;
  password: string;
}
export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const siginData: SubmitHandler<formInput> = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // stay on same page to handle manually
      });

      if (result?.error === "CredentialsSignin" || result?.error) {
        toast.error(result?.error || "Login failed!");
      }
      if (result?.ok) {
        toast.success("Login Successfully!");
        reset();
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      toast.error((error as any).data.error);
    }
  };

  const onError = async (errors: FieldErrors<formInput>) => {
    if (errors.email?.message) toast.error(errors.email?.message);
    if (errors.password?.message) toast.error(errors.password?.message);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">Sign in</h2>
          <p className="text-sm text-gray-500">Welcome back to our platform</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(siginData, onError)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <Mail className="h-5 w-5 mx-3 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 outline-none"
                {...register("email", {
                  required: "Email is required required",
                })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <Lock className="h-5 w-5 mx-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-3 outline-none"
                {...register("password", {
                  required: "Password is  required",
                  minLength: {
                    value: 6,
                    message: "password has atleast 6 characters!",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-cyan-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            <FaGoogle className="h-5 w-5" />
            Continue with Google
          </button> */}
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/register"
            className="text-cyan-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
