'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 bg-black text-white rounded hover:bg-black/80"
        >
            Logout
        </button>
    );
}
