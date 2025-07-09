import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



// GET: get user account    [ api/user/[userId]/]
export async function GET(req: NextRequest) {
    const url = req.nextUrl
    const userName = url.pathname.split("/").pop()


    if (!userName) return NextResponse.json(
        { message: "User Id not found" },
        { status: 400 }
    )

    try {
        await connectToDB()

        const user = await User.findById(userName).select("-password").lean()

        if (!user) return NextResponse.json(
            { message: "User not found" },
            { status: 401 }
        )

        return NextResponse.json(
            { message: "User found successfully", data: user },
            { status: 200 }
        )
    } catch (error) {
        console.error("error while extracting user with its id: ", error)
        throw error
    }
}


