// store video url at database from Frontend

import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import Video, { IVideo } from "@/model/video.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET request for video url to display
export async function GET() {
    try {
        await connectToDB()

        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()

        if (!videos || videos.length == 0) {
            return NextResponse.json(
                [],
                { status: 200 }
            )
        }

        return NextResponse.json(
            videos,
            { status: 200 }
        )

    } catch (error) {
        console.error("Error at ::video[api] = ", error);
        return NextResponse.json(
            { error: "Failed to fetch videos!" },
            { status: 500 }
        )
    }
}


// POST request for uploading videoUrl in backend from Frontend
// for authorized user only
export async function POST(req: NextRequest) {
    try {
        const session = getServerSession(authOptions)

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized user" },
                { status: 401 }
            )
        }

        await connectToDB()

        const body: IVideo = await req.json() //parse json

        if (!body.title || !body.thumbnailUrl || !body.descrition || !body.videourl) return NextResponse.json(
            { error: "Missing fields" },
            { status: 400 }
        )

        const videoData: IVideo = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation.quality ?? 100, // from imagekit via frontend
            }
        }

        const newVideo = await Video.create(videoData)
        return NextResponse.json(
            newVideo,
            { status: 201 }
        )
    } catch (error) {
        console.error("Error ::video = ", error)
        return NextResponse.json(
            { error: "Failed to create video!" },
            { status: 500 }
        )
    }

}
