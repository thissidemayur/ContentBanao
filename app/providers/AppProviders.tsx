"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { makeStore } from "@/lib/store";
import { logout, setUser } from "@/features/auth/authSlice";
import { useAuth } from "@/hooks/userAuth";

const store = makeStore();
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
