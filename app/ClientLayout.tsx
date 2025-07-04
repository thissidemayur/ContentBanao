// ClientLayout.tsx
'use client';

import { useSession } from "next-auth/react";
import StoreProvider from "./StoreProvider";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, setUser } from "@/features/auth/authSlice";

export default function ClientLayout({ children }: { children: React.ReactNode; }) {

    const { data: session } = useSession()
    const dispatch = useDispatch()

    useEffect(() => {
        if (session?.user) {
            dispatch(setUser(session.user))
        } else {
            dispatch(logout())
        }
    }, [session, dispatch])
    return <StoreProvider>{children}</StoreProvider>;
}
