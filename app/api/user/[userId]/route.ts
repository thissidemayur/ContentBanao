import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// PATCH: update account [ api/user/[userId]/]
export async function PATCH(req: NextRequest) {
    const { firstName, lastName, avtar, bio, email, userName } = await req.json()
    console.log("UserName: ", userName, " firstName:", firstName)

    const session = await getServerSession(authOptions)
    console.log("session: ", session)

    if (!session) {
        return NextResponse.json(
            { message: "You must be logged in." },
            { status: 401 }
        )
    }

    if (!firstName && !lastName && !avtar && !bio && !email) return NextResponse.json(
        { error: "One field need to present for update " },
        { status: 400 }
    )


    try {
        await connectToDB()

        const user = await User.findOne({ _id: session.user.id })
        if (!user) return NextResponse.json(
            { error: "user not found " },
            { status: 400 }
        )

        if (firstName && user.firstName != firstName) user.firstName = firstName.trim()

        if (lastName && user.lastName != lastName) user.lastName = lastName

        if (avtar) user.avtar = avtar.trim()

        if (bio && bio != user.bio) user.bio = bio

        if (email && user.email != email) user.email = email

        if (userName && user.userName != userName) user.userName = userName

        await user.save({ validateBeforeSave: false })

        console.log("User: ", user)
        return NextResponse.json(
            { message: "data updated successfully", data: {} },
            { status: 200 }
        )

    } catch (error) {
        console.error("error while updating user: ", error)
        throw error
    }
}
// PUT