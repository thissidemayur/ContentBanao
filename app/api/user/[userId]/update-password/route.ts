import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
        return NextResponse.json(
            { message: "Old and new passwords are required" },
            { status: 400 }
        );
    }

    if (newPassword.length < 6) {
        return NextResponse.json(
            { message: "New password must be at least 6 characters long" },
            { status: 400 }
        );
    }

    const url = req.nextUrl;
    const segments = url.pathname.split("/");
    const userName = segments[segments.length - 2]; // extract userId from URL

    const session = await getServerSession(authOptions);
    // Check if user is authenticated and the userId matches the session user
    if (!session || session.user.userName !== userName) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        await connectToDB();

        const user = await User.findById({ _id: session.user.id });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Check if old password is correct
        const isMatch = await user.validatePassword(oldPassword)
        if (!isMatch) {
            return NextResponse.json(
                { message: "Old password is incorrect" },
                { status: 400 }
            );
        }

        // Hash new password and save
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
