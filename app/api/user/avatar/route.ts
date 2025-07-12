import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// app/api/[userId]/avtar/
export async function POST(req: NextRequest) {
    const { avatarUrl } = await req.json()
    console.log("avatarUrl: ", avatarUrl)
    if (!avatarUrl) return NextResponse.json(
        { message: "avatar not found,please upload avatar" },
        { status: 400 }
    )



    const session = await getServerSession(authOptions)
    console.log("Session: ", session)
    if (!session) return NextResponse.json(
        { message: "unathorized!!" },
        { status: 401 }
    )


    try {
        await connectToDB()

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { $set: { avatar: avatarUrl } },
            { new: true }
        )
        console.log("User: ", user)
        if (!user) return NextResponse.json(
            { message: "user not found!!" },
            { status: 400 }
        )

        return NextResponse.json(
            { message: "avatar updated successfully!!", data: {} },
            { status: 200 }
        )


    } catch (error) {
        console.log("something went wrong while uploading avatar: ", error)
        throw error
    }
}


// update avatar
export async function PUT(req: NextRequest) {
    const { avatarUrl } = await req.json()
    if (!avatarUrl) return NextResponse.json(
        { message: "avatar not found,please upload avatar" },
        { status: 400 }
    )

    const url = req.nextUrl
    const segment = url.pathname.split("/")
    const userName = segment[segment.length - 2]


    const session = await getServerSession(authOptions)
    console.log("Session: ", session)
    console.log("userName: ", userName)
    if (!session || session.user.userName != userName) return NextResponse.json(
        { message: "unathorize access!!" },
        { status: 401 }
    )


    try {
        await connectToDB()

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { $set: { avatar: avatarUrl } },
            { new: true }
        )
        if (!user) return NextResponse.json(
            { message: "user not found!!" },
            { status: 400 }
        )

        return NextResponse.json(
            { message: "avatar updated successfully!!", data: {} },
            { status: 200 }
        )


    } catch (error) {
        console.log("something went wrong while uploading avatar: ", error)
        throw error
    }
}

// delete avatar
export async function DELETE(req: NextRequest) {


    const url = req.nextUrl
    const segment = url.pathname.split("/")
    const userName = segment[segment.length - 2]


    const session = await getServerSession(authOptions)
    console.log("Session: ", session)
    console.log("userName: ", userName)
    if (!session || session.user.userName != userName) return NextResponse.json(
        { message: "unathorize access!!" },
        { status: 401 }
    )


    try {
        await connectToDB()

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { $unset: { avatar: "" } },
            { new: true }
        )
        if (!user) return NextResponse.json(
            { message: "user not found!!" },
            { status: 400 }
        )

        return NextResponse.json(
            { message: "avatar deleted successfully!!", data: {} },
            { status: 200 }
        )


    } catch (error) {
        console.log("something went wrong while uploading avatar: ", error)
        throw error
    }
}