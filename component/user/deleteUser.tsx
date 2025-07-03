'use client'

import { Lock, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useDeleteUserMutation } from '@/features/auth/authApi'; // adjust path as needed
import { useRouter } from 'next/navigation';

export default function DeleteAccount() {
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [deleteAccount, { error, isSuccess, isLoading }] = useDeleteUserMutation();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password) {
            setErrorMsg('Password is required to delete your account');
            return;
        }

        try {
            await deleteAccount(password);
            setPassword('');
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto bg-white border border-black/20 rounded-xl shadow-2xl p-6 sm:p-8">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black/10 rounded-full mb-4">
                        <AlertTriangle size={32} className="text-black" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-black">Delete Account</h1>
                    <p className="text-black/80 mt-2 text-sm sm:text-base">
                        This action is permanent and cannot be undone. Please enter your password to confirm.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Password Field */}
                    <div className="flex flex-col">
                        <div
                            className="flex items-center border border-black rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-black transition-all duration-200"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    const input = e.currentTarget.querySelector('input');
                                    if (input) (input as HTMLInputElement).focus();
                                }
                            }}
                        >
                            <Lock size={20} className="text-black mr-3 group-focus-within:text-black/80" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-transparent text-black placeholder-black/50 focus:outline-none"
                            />
                        </div>
                        {errorMsg && (
                            <p className="text-sm text-black/80 mt-2">{errorMsg}</p>
                        )}
                    </div>

                    {/* Warning Message */}
                    <div className="bg-white border border-black/20 rounded-md p-4 flex items-start gap-3">
                        <Trash2 size={20} className="text-black/80 flex-shrink-0 mt-1" />
                        <p className="text-sm text-black/80">
                            Deleting your account will remove all your data, including profile information and settings.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-black/80 transition-colors duration-200 focus:ring-2 focus:ring-black focus:outline-none"
                        >
                            {isLoading ? "Action under progress..." : "Delete Account"}
                        </button>
                        <button
                            type="button"
                            className="w-full sm:w-auto px-6 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-200 focus:ring-2 focus:ring-black focus:outline-none"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Status Messages */}
                    {isSuccess && <p className="bg-green-500 text-white text-sm p-2 rounded">Account deleted successfully.</p>}
                    {error && <p className="bg-red-500 text-white text-sm p-2 rounded">{(error as any)?.data?.message}</p>}
                </form>
            </div>
        </div>
    );
}
