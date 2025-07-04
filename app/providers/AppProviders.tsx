'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

const store = makeStore()
export default function AppProviders({ children }: { children: ReactNode }) {

    return (
        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    );
}
