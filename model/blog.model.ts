// import mongoose, { model, models, Schema } from "mongoose";
/*   Why import mongoose, { Schema, model, models } from "mongoose" can cause problems in Next.js App Router projects

In serverless runtimes (like Vercel, or Next.js App Directory / API routes), every API route can run in its own isolated execution context.
If you do: import mongoose, { Schema, model, models } from "mongoose"

in multiple files — those are separate instances of mongoose’s model registry per import scope.

So when:

One file registers User to its mongoose instance

And another file tries .populate("authorId") from its own different mongoose instance
→ That instance won’t know the User model → leading to your exact error:  MissingSchemaError: Schema hasn't been registered for model "User".

*/

import mongoose from "@/lib/db.lib";
import { Schema, model, models } from "mongoose"

import User from "./user.model";
import { MediaItem } from "@/types/media.types";
import slugify from "slugify";


interface IBlog {
    _id?: mongoose.Types.ObjectId,
    title: string,
    slug: string,
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: any
    },
    content: string,
    summary?: string,
    media?: MediaItem[], // for image only
    tags?: string[],
    createdAt: Date,
    updatedAt: Date,
    isPublished: boolean,
    likes?: [{ type: mongoose.Types.ObjectId, ref: any }]
}


const mediaSchema = new Schema<MediaItem>({
    type: {
        type: String,
        enum: ['image'],
    },
    url: {
        type: String,
        trim: true
    },
    caption: {
        type: String,
        trim: true,
    }
}, { _id: false }) //disable auto _id for subdocs



const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        required: true
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: true
    },
    content: {
        type: String,
        required: true
    },

    summary: String,

    media: [mediaSchema],

    tags: [],

    isPublished: {
        type: Boolean,
        default: true
    },

    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

}, {
    timestamps: true
})

blogSchema.pre("validate", function (next) {
    if (!this.slug && this.title) {
        const baseSlug = slugify(this.title, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: 'en',
            trim: true
        })
        const randomStr = Math.random().toString(36).substring(2, 6);
        this.slug = `${baseSlug.substring(0, 60)}-${randomStr}`
    }
    next()
})

const Blog = models?.Blog || model<IBlog>("Blog", blogSchema)

export default Blog