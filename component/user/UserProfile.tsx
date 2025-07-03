import { useEffect, useState } from 'react';
import { User, Mail, Phone, Cake, User2, Package } from 'lucide-react';
import Link from 'next/link';
import { useGetCurrentUserQuery } from '@/features/auth/authApi';

export default function ViewProfile() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [userImg, setUserImg] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');

    const { data: currentUserData, error, isLoading } = useGetCurrentUserQuery();
    const userData = currentUserData?.data;

    useEffect(() => {
        if (userData) {
            setFullName(userData?.fullName || '');
            setEmail(userData?.email || '');
            setUserImg(userData?.userImg || '');
            setPhoneNumber(userData?.phoneNumber || '');
            setGender(userData?.gender || '');
            setDob(userData?.dob || '');
        }
    }, [userData]);


    // Placeholder for purchased products (from Product schema)
    const purchasedProducts = [
        { productName: 'Coats & Jackets', price: 99.99, purchasedAt: '2025-04-20' },
        { productName: 'Joggers', price: 49.99, purchasedAt: '2025-04-15' },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-black text-lg">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-black text-lg">Error: {error.data?.message || 'Failed to load profile'}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6">Your Profile</h1>
                <div className="bg-white border border-black rounded-lg shadow-lg p-6 sm:p-8">
                    {/* Profile Card */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                        {userImg ? (
                            <img
                                src={userImg}
                                alt="Profile"
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-black"
                            />
                        ) : (
                            <User size={80} className="text-black" />
                        )}

                        <div className="flex-1">
                            <p className="text-xl sm:text-2xl font-semibold text-black mb-2">{fullName || 'User'}</p>
                            <div className="space-y-2">
                                {email && (
                                    <p className="text-sm text-black flex items-center gap-2">
                                        <Mail size={16} className="text-black" /> {email}
                                    </p>
                                )}

                                {phoneNumber && (
                                    <p className="text-sm text-black flex items-center gap-2">
                                        <Phone size={16} className="text-black" /> {phoneNumber}
                                    </p>
                                )}

                                {gender && (
                                    <p className="text-sm text-black flex items-center gap-2">
                                        <User2 size={16} className="text-black" /> {gender}
                                    </p>
                                )}

                                {dob && (
                                    <p className="text-sm text-black flex items-center gap-2">
                                        <Cake size={16} className="text-black" /> {new Date(dob).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Recent Purchases */}
                    <div className="border-t border-black pt-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">Recent Purchases</h2>
                        {purchasedProducts.length > 0 ? (
                            <ul className="space-y-4">
                                {purchasedProducts.map((product, index) => (
                                    <li
                                        key={index}
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-black rounded-md hover:bg-black/10 transition-colors duration-150 cursor-pointer"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-black">{product.productName}</p>
                                            <p className="text-xs text-black/70">Purchased: {product.purchasedAt}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-black mt-2 sm:mt-0">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-black">No purchases yet.</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/update-profile"
                            className="px-4 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-150 cursor-pointer text-center"
                        >
                            Edit Profile
                        </Link>
                        <Link
                            href="/orders"
                            className="px-4 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-150 cursor-pointer text-center"
                        >
                            View All Orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}