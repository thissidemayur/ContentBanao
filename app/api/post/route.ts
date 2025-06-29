import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


// GET: api/post  ; get all post
export async function GET() {
    await connectToDB()

    const allBlogs = await Blog.find({}).lean()

    if (!allBlogs) return NextResponse.json(
        { error: "No post present" },
        { status: 404 }
    )

    return NextResponse.json(
        {
            message: "Blog reterive successfully",
            data: allBlogs,
        },
        { status: 200 }
    )

}


// POST: api/post  ; create post
export async function POST(req: NextRequest) {
    let {
        title, description, content, summary, image, tags, isPublished
    } = await req.json()

    // validation check for required field
    let requiredField = [title, description, content, image, tags]

    const fieldName = ["title", "description", "content", "image", "tags"]
    const session = await getServerSession(authOptions)
    requiredField.map(((field, index) => {
        if (field === null || field === undefined || field === "")
            return NextResponse.json(
                { error: `${fieldName[index]} is compulsary field` },
                { status: 400 }
            )
    })
    )
    try {

        await connectToDB()

        const createBlog = await Blog.create({
            title,
            authorId: session?.user.id,
            content,
            summary,
            media: (image) ? {
                type: 'image',
                url: image
            } : null,
            tags,
            isPublished,
        })

        if (!createBlog) return NextResponse.json(
            { error: "Error while creating a post" },
            { status: 500 }
        )

        return NextResponse.json(
            {
                message: "Post created successfully!",
                data: {}
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.error("error while creating post:: ", error)
        throw error
    }
}