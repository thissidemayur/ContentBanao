import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.lib"
import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/lib/db.lib"
import User from "@/model/user.model"


// PATCH: update account [ api/user]
export async function PATCH(req: NextRequest) {

    const { firstName, lastName, avatar, bio, email, userName } = await req.json()


    const session = await getServerSession(authOptions)


    if (!session) {
        return NextResponse.json(
            { message: "Unauthorize" },
            { status: 401 }
        )
    }

    if (!firstName && !lastName && !avatar && !bio && !email) return NextResponse.json(
        { error: "One field need to present for update " },
        { status: 400 }
    )


    try {
        await connectToDB()

        const user = await User.findOne({ _id: session.user.id }).select("-password")
        if (!user) return NextResponse.json(
            { error: "user not found " },
            { status: 400 }
        )

        if (firstName && user.firstName != firstName) user.firstName = firstName.trim()

        if (lastName && user.lastName != lastName) user.lastName = lastName

        if (avatar) user.avatar = avatar.trim()

        if (bio && bio != user.bio) user.bio = bio

        if (email && user.email != email) user.email = email

        if (userName && user.userName != userName) user.userName = userName

        await user.save({ validateBeforeSave: false })

        return NextResponse.json(
            { message: "data updated successfully", data: user },
            { status: 200 }
        )

    } catch (error) {
        console.error("error while updating user: ", error)
        throw error
    }
}