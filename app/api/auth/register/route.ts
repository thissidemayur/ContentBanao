import { connectToDB } from "@/lib/db.lib"; // MongoDB connection logic with global caching
import User from "@/model/user.model"; // Mongoose model for User
import { NextRequest, NextResponse } from "next/server"; // Next.js Fetch API equivalents of req & res

// ✅ This route will handle POST requests to `/api/auth/register`
export async function POST(req: NextRequest) {
    try {
        // ⛳ Step 1: Parse incoming JSON data from the request body
        let { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Both email and password are required." },
                { status: 400 }
            );
        }

        email = email.toLowerCase().trim();
        password = password.trim();


        await connectToDB(); // Ensures DB connection (and caches if already connected)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: `User already exists with email: ${email}` },
                { status: 400 }
            );
        }
        if (password.length < 6) {
            return NextResponse.json(
                { error: `Password must be atleast 6 character long` },
                { status: 400 }
            );
        }
        await User.create({ email, password });

        return NextResponse.json(
            { message: "User registered successfully!" },
            { status: 201 }
        );
    } catch (error) {

        console.error("Error :: User registration failed: ", error);
        return NextResponse.json(
            { error: "Failed to register user. Please try again later." },
            { status: 500 }
        );
    }
}


/*************************         *************************
 * 
1. |||   🧠 INTERESTING FACT:    |||
    // In Express (MERN), we connect to MongoDB once in index.js and reuse it.
    // 🔥 But in Next.js App Router (especially when deployed to Vercel), each route runs like a **serverless function**:
    // - There's no always-on backend server.
    // - Each file like `register.ts`, `login.ts`, etc. runs independently on its own.
    // - Therefore, you MUST connect to DB inside each route.
    // - However, using global caching (`global.mongoose`) ensures we reuse existing connections if available.

2. Why next js route work abnormally as compared to Express route:
    -every api file (like /route.ts) behave like a self contained microservice
    -when deployed(eg to vercel) our /api/auth/register might run on a different server than /api/auth/login
    - thats why we must connect to our DB in each route- there is no shared process memory like in express
3. NextRequest , NextResponse follow the web fetch api


 */