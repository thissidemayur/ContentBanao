import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// DELETE: post/[slug]  ; delete post
export async function DELETE(req: NextRequest) {
    const { authorId, slug } = await req.json()

    if (!authorId || slug) return NextResponse.json(
        { error: "please ensure you are authorise user or slug should not empty" },
        { status: 400 }
    )

    const session = await getServerSession(authOptions)

    try {
        await connectToDB()
        const deletedPost = await Blog.findOneAndDelete(
            { $and: [{ _id: session?.user?.id }, { slug }] },
        ).lean()

        if (deletedPost) {
            console.log('Post deleted successfully:', deletedPost);

            return NextResponse.json(
                { message: "Post deleted successfully", data: {} },
                { status: 204 }
            )
        }
        else return NextResponse.json(
            { error: "no post matched" },
            { status: 404 }
        )

    } catch (error) {
        console.error("Error while deleting post: ", error)
        throw error
    }
}


// PUT: post/[slug] ; update post
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    const {
        title, description, content, summary, image, tags, isPublished
    } = await req.json()

    const session = await getServerSession(authOptions)

    const { slug } = params
    if (!slug) {
        console.log("Slug: ", slug)
        return NextResponse.json(
            { error: "slug is not present!" },
            { status: 400 }
        )
    }
    if (!title && !description && !content && !summary && !image && !tags.length && !isPublished) return NextResponse.json(
        { error: "Atleast one field should present to modifed post" },
        { status: 400 }
    )


    try {

        await connectToDB()
        const blog = await Blog.findOne({ $and: [{ slug }, { _id: session?.user.id }] })
        if (!blog) return NextResponse.json(
            { error: "Blog not found" },
            { status: 404 }
        )

        if (title && title !== blog.title) blog.title = title

        if (description && description !== blog.description) blog.description = description

        if (summary && blog.summary !== summary) blog.summary = summary

        if (image && blog.media[0].url !== image) blog.media[0].url = image;

        if (tags.length && Array.isArray(tags)) {
            {
                blog.tags = tags
            }

            if (isPublished && blog.isPublished !== isPublished) blog.isPublished = isPublished

            await blog.save({ validateBeforeSave: false })

            return NextResponse.json(
                { message: "Blog update successfully!", data: {} },
                { status: 204 }
            )

        }

    } catch (error) {
        console.error("error while updating post:: ", error)
        throw error
    }


}


// GET:post/[slug]   ; get single post
export async function GET({ query }: { query: { slug: string } }) {
    const { slug } = query

    if (!slug) {
        console.log("SLug: ", slug)
        return NextResponse.json(
            { error: "slug is not present!" },
            { status: 200 }
        )
    }


    try {

        await connectToDB();
        const blog = await Blog.findOne({ slug }).lean()

        if (!blog) return NextResponse.json(
            { error: "Blog not found" },
            { status: 404 }
        )

        return NextResponse.json(
            { message: "Blog found successfully", data: blog },
            { status: 200 }
        )
    } catch (error) {
        console.error("error while fetching post: ", error)
        throw error
    }

}
