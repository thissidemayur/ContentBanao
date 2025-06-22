// lib/auth.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./db.lib";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";

// This file contains all the configuration options for NextAuth
// We export this separately so that it can be reused across the app (like in middleware)

export const authOptions: NextAuthOptions = {
    // Step 1: Define your authentication providers (Google, GitHub, or custom credentials)
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password", placeholder: "********" }
            },

            // Step 1.1: Authorize function runs ONLY for credential provider (not for Google etc.)
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    await connectToDB(); // connect to MongoDB

                    const user = await User.findOne({ email: credentials.email });
                    if (!user) throw new Error(`No user found with ${credentials.email}`);

                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) throw new Error("Invalid password!");

                    // If login success, return user object (attached to token)
                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };
                } catch (error) {
                    console.error("Auth Error: ", error);
                    throw new Error("Unauthorized login attempt");
                }
            }
        })
    ],

    // Step 2: Callbacks allow you to modify behavior at various stages
    callbacks: {
        // Called when JWT is created or updated
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // attach user ID to JWT
            }
            return token;
        },

        // Called when session is accessed by frontend
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },

    // Step 3: Redirects based on outcome of login/logout
    pages: {
        signIn: "/login",
        error: "/login"
    },

    // Step 4: Choose session strategy (JWT or database)
    session: {
        strategy: "jwt", // using JWT token instead of DB session
        maxAge: 30 * 24 * 60 * 60 // session lasts 30 days
    },

    // Step 5: Secret key to sign/verify JWT (must be set in .env)
    secret: process.env.NEXTAUTH_SECRET!
};


/************************************** KEEPING AUTH OPTIONS IN lib/auth.ts IS BEST PRACTISE BEACUSE **************************************
 
YOU HAVE TO REUSE THIS CODE IT IN:
1 getServerSession(authOptions) in middleware
2.Protected page logic
3.Any custom auth utility

*/