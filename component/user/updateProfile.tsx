'use client'

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
    useGetCurrentUserQuery,
    useUpdateProfileMutation,
    useUploadUserImgMutation,
} from '@/features/auth/authApi';
import { User, Mail, Phone, Cake, User2, Image, X } from 'lucide-react';

export default function UpdateProfile() {
    const router = useRouter();
    const { data: currentUserData, error: fetchError, isLoading: isFetching } = useGetCurrentUserQuery();
    const userData = currentUserData?.data;

    const [updateProfile, { error: updateTextError, isSuccess: updateTextSuccess, isLoading: updateDataLoading }] =
        useUpdateProfileMutation();
    const [updateUserImg, { error: imgUpdateError, isSuccess: imgUpdateSuccess, isLoading: imgUpdateLoading }] =
        useUploadUserImgMutation();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: '',
            gender: '',
        },
    });

    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (userData) {
            setValue('firstName', userData.firstName || '');
            setValue('lastName', userData.lastName || '');
            setValue('email', userData.email || '');
            setValue('phoneNumber', userData.phoneNumber || '');
            setValue('dob', userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '');
            setValue('gender', userData.gender || '');
            setImagePreview(userData.userImg || null);
        }
    }, [userData, setValue]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageRemove = () => {
        setSelectedFile(null);
        setImagePreview(userData?.userImg || null);
    };

    const onSubmit = async (data: any) => {
        try {
            let hasUpdates = false;
            const updates: Record<string, string> = {};

            if (data.firstName && data.firstName !== (userData?.firstName || '')) updates.firstName = data.firstName;
            if (data.lastName && data.lastName !== (userData?.lastName || '')) updates.lastName = data.lastName;
            if (data.email && data.email !== (userData?.email || '')) updates.email = data.email;
            if (data.phoneNumber && data.phoneNumber !== (userData?.phoneNumber || '')) updates.phoneNumber = data.phoneNumber;
            if (data.dob && data.dob !== (userData?.dob ? new Date(userData.dob).toISOString().split('T')[0] : '')) updates.dob = data.dob;
            if (data.gender && data.gender !== (userData?.gender || '')) updates.gender = data.gender;

            if (Object.keys(updates).length > 0) {
                await updateProfile(updates).unwrap();
                hasUpdates = true;
            }

            if (selectedFile) {
                const formData = new FormData();
                formData.append('userImg', selectedFile);
                await updateUserImg(formData).unwrap();
                hasUpdates = true;
            }

            if (hasUpdates) {
                alert('Profile updated successfully!');
                router.push('/profile');
            } else {
                alert('No changes detected.');
            }
        } catch (err) {
            alert('Error updating profile');
            console.error(err);
        }
    };

    if (isFetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Error loading profile</p>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-white p-4 sm:p-6">
                <div className="max-w-md sm:max-w-lg mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6">Edit Profile</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white border border-black rounded-lg shadow-lg p-6 sm:p-8 space-y-6"
                    >
                        {/* Image Preview and Upload */}
                        <div className="flex items-center gap-4 mb-4">
                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        className="w-44 h-44 rounded-full object-cover border border-black"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleImageRemove}
                                        className="absolute -top-2 -right-2 bg-white border border-black rounded-full p-1 hover:bg-black/10 transition-colors duration-150"
                                    >
                                        <X size={16} className="text-black" />
                                    </button>
                                </div>
                            ) : (
                                <User size={64} className="text-black" />
                            )}
                            <div>
                                <p className="text-sm text-black">Profile Image</p>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="mt-2 border border-black rounded-md p-1 text-black"
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <div className="flex items-center border border-black rounded-md p-2">
                                    <User size={20} className="text-black mr-2" />
                                    <input
                                        type="text"
                                        {...register('firstName', { required: 'First Name is required' })}
                                        placeholder="First Name"
                                        className="w-full bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="text-sm text-black mt-1">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center border border-black rounded-md p-2">
                                    <User size={20} className="text-black mr-2" />
                                    <input
                                        type="text"
                                        {...register('lastName', { required: 'Last Name is required' })}
                                        placeholder="Last Name"
                                        className="w-full bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="text-sm text-black mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col sm:col-span-2">
                                <div className="flex items-center border border-black rounded-md p-2">
                                    <Mail size={20} className="text-black mr-2" />
                                    {/* <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="Email"
                  className="w-full bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                /> */}
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-black mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center border border-black rounded-md p-2">
                                    <Phone size={20} className="text-black mr-2" />
                                    <input
                                        type="tel"
                                        {...register('phoneNumber')}
                                        placeholder="Phone Number"
                                        className="w-full bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center border border-black rounded-md p-2">
                                    <Cake size={20} className="text-black mr-2" />
                                    <input
                                        type="date"
                                        {...register('dob')}
                                        className="w-full bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:col-span-2">
                                <div className="flex items-center border border-black rounded-md p-2">
                                    <User2 size={20} className="text-black mr-2" />
                                    <select
                                        {...register('gender')}
                                        className="w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Error Messages from API */}
                        {updateTextError && (
                            <p className="text-sm text-black">{updateTextError.data?.message || 'Error updating profile'}</p>
                        )}
                        {imgUpdateError && (
                            <p className="text-sm text-black">{imgUpdateError.data?.message || 'Error uploading profile image'}</p>
                        )}

                        {/* Success Messages */}
                        {updateTextSuccess && (
                            <p className="bg-black text-white p-3 rounded-md">Profile text updated successfully!</p>
                        )}
                        {imgUpdateSuccess && (
                            <p className="bg-black text-white p-3 rounded-md">Profile image updated successfully!</p>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={updateDataLoading || imgUpdateLoading}
                                className="w-full sm:w-auto px-4 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-150 cursor-pointer disabled:opacity-50"
                            >
                                {updateDataLoading || imgUpdateLoading ? 'Updating...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="w-full sm:w-auto px-4 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-150 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
