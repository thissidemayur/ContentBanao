'use client'

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useUpdatePasswordMutation } from '@/features/auth/authApi';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [formErrors, setFormErrors] = useState<{ oldPassword?: string; newPassword?: string }>({});
    const [updatePassword, { error, isSuccess, isLoading }] = useUpdatePasswordMutation();
    const router = useRouter();

    const validate = () => {
        const errors: { oldPassword?: string; newPassword?: string } = {};
        if (!oldPassword) errors.oldPassword = 'Old Password is required';
        if (!newPassword) errors.newPassword = 'New Password is required';
        else if (newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters';
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            await updatePassword({ oldPassword, newPassword }).unwrap();
            setOldPassword('');
            setNewPassword('');
            alert('Password updated successfully');
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-center">Change Password</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-black rounded-lg shadow-lg p-6 sm:p-8 space-y-6"
                >
                    <div className="space-y-4">
                        {/* Old Password */}
                        <div className="flex flex-col">
                            <div
                                className="flex items-center border border-black rounded-md p-2 focus-within:ring-2 focus-within:ring-black transition-all duration-150"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        const input = e.currentTarget.querySelector('input');
                                        if (input) (input as HTMLInputElement).focus();
                                    }
                                }}
                            >
                                <Lock size={20} className="text-black mr-2 group-focus-within:text-black/80" />
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Old Password"
                                    className="w-full bg-white text-black placeholder-black/50 focus:outline-none"
                                />
                            </div>
                            {formErrors.oldPassword && (
                                <p className="text-sm text-black/80 mt-1">{formErrors.oldPassword}</p>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col">
                            <div
                                className="flex items-center border border-black rounded-md p-2 focus-within:ring-2 focus-within:ring-black transition-all duration-150"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        const input = e.currentTarget.querySelector('input');
                                        if (input) (input as HTMLInputElement).focus();
                                    }
                                }}
                            >
                                <Lock size={20} className="text-black mr-2 group-focus-within:text-black/80" />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="w-full bg-white text-black placeholder-black/50 focus:outline-none"
                                />
                            </div>
                            {formErrors.newPassword && (
                                <p className="text-sm text-black/80 mt-1">{formErrors.newPassword}</p>
                            )}
                        </div>
                    </div>

                    {/* Error and Success Messages */}
                    {error && (
                        <p className="text-sm text-black/80 bg-white border border-black/50 p-3 rounded-md">
                            {(error as any)?.data?.message || 'Error updating password'}
                        </p>
                    )}
                    {isSuccess && (
                        <p className="text-sm text-white bg-black p-3 rounded-md">
                            Password updated successfully
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-150 cursor-pointer disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Change Password'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full sm:w-auto px-6 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-150 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
