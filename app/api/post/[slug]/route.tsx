import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Blog as IBlog } from "@/types/blog.types";// DELETE: 


// post/[slug]  ; delete post not connected
export async function DELETE(req: NextRequest) {
    const url = req.nextUrl
    const slug = url.pathname.split("/").pop()
    const session = await getServerSession(authOptions)
    const authorId = session?.user.id

    if (!authorId || !slug) return NextResponse.json(
        { error: "please ensure you are authorise user or slug should not empty" },
        { status: 400 }
    );

    if (!slug) {
        return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    console.log("slug: ", slug)


    try {
        await connectToDB();

        const blog: IBlog | null = await Blog.findOne({ slug });

        console.log("Blog: ", blog)

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        console.log("Logged-in user ID:", session.user.id);
        console.log("Blog author ID (from DB):", blog.authorId?.toString());

        // Now you can check authorId and delete if authorized

        // For example:
        if (blog.authorId?.toString() !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        await Blog.findOneAndDelete({ slug, authorId: blog.authorId });
        console.log("blog deleted successfully")

        return NextResponse.json(
            { message: "Post deleted successfully", data: {} },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error while deleting post: ", error);
        throw error;
    }

}


// PATCH: post/[slug] ; update post
export async function PATCH(req: NextRequest) {
    const {
        title, description, content, summary, image, tags, isPublished, userName
    } = await req.json()
    const session = await getServerSession(authOptions)
    console.log("session: ", session)

    if (!session || session.user.userName != userName) {
        console.error("error while sigining in")
        return NextResponse.json(
            { error: "unauthorize!" },
            { status: 401 }
        )
    }

    const url = req.nextUrl;
    const slug = url.pathname.split("/").pop();
    console.log("slug: ", slug)
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
        const blog = await Blog.findOne({ slug, authorId: session?.user.id })
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
                { message: "Blog update successfully!", data: { data: blog } },
                { status: 200 }
            )

        }

    } catch (error) {
        console.error("error while updating post:: ", error)

        return NextResponse.json(
            { message: "internal server error while updating blog!" },
            { status: 400 }
        )
    }


}


// GET:post/[slug]   ; get single post
export async function GET(req: NextRequest) {
    const url = req.nextUrl
    const encodingSlug = url.pathname.split("/").pop()
    const slug = decodeURIComponent(encodingSlug || "")
    console.log("slugBackend: ", slug)
    console.log("encodingSlugBackend: ", encodingSlug)
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
