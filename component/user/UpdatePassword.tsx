"use client";

import { useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/userAuth";
import { Lock } from "lucide-react";

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

export default function UpdatePasswordForm() {
  const { userAuth } = useAuth();
  const userName = userAuth?.userName;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordFormValues>();

  const [updatePassword, { isLoading, isSuccess, error }] =
    useUpdatePasswordMutation();

  const router = useRouter();

  const onSubmit = async (data: PasswordFormValues) => {
    if (!userName) return alert("User not authenticated!");

    try {
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        userName,
      }).unwrap();

      reset();
      alert("Password updated successfully");
      router.push("/");
    } catch (err) {
      console.error("Update password error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          🔐 Change Password
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 transition-all duration-300"
        >
          {/* Input Fields */}
          <div className="space-y-5">
            {/* Old Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Old Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  {...register("oldPassword", {
                    required: "Old password is required",
                  })}
                  placeholder="Enter your old password"
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
              {errors.oldPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "New password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter new password"
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-sm p-3 rounded-md">
              {(error as any)?.data?.message || "Failed to update password."}
            </div>
          )}
          {isSuccess && (
            <div className="bg-green-50 border border-green-300 text-green-700 text-sm p-3 rounded-md">
              Password updated successfully!
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Change Password"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
