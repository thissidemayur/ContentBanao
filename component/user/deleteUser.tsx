"use client";

import { Lock, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useDeleteUserMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteAccount, { error, isSuccess, isLoading }] =
    useDeleteUserMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setErrorMsg("Password is required to delete your account");
      return;
    }

    try {
      await deleteAccount({ password });
      setPassword("");
      dispatch(logout());
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-5">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Delete Account
          </h1>
          <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
            This action is{" "}
            <span className="font-semibold text-red-600">permanent</span> and
            cannot be undone. Please enter your password to confirm.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 transition"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  const input = e.currentTarget.querySelector("input");
                  if (input) (input as HTMLInputElement).focus();
                }
              }}
            >
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            {errorMsg && (
              <p className="text-xs text-red-500 mt-1">{errorMsg}</p>
            )}
          </div>

          {/* Warning Message */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Trash2 size={20} className="text-yellow-600 flex-shrink-0 mt-1" />
            <p className="text-sm text-yellow-700 leading-relaxed">
              Deleting your account will permanently erase all your profile
              information, preferences, and associated data. This cannot be
              reversed.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-red-600 hover:bg-red-700 transition focus:ring-2 focus:ring-red-500 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition focus:ring-2 focus:ring-gray-300 focus:outline-none"
            >
              Cancel
            </button>
          </div>

          {/* Status Messages */}
          {isSuccess && (
            <p className="bg-green-50 border border-green-300 text-green-700 text-sm p-3 rounded-md">
              Account deleted successfully.
            </p>
          )}
          {error && (
            <p className="bg-red-50 border border-red-300 text-red-700 text-sm p-3 rounded-md">
              {(error as any)?.data?.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
