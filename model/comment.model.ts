/*   Why import mongoose, { Schema, model, models } from "mongoose" can cause problems in Next.js App Router projects

In serverless runtimes (like Vercel, or Next.js App Directory / API routes), every API route can run in its own isolated execution context.
If you do: import mongoose, { Schema, model, models } from "mongoose"

in multiple files — those are separate instances of mongoose’s model registry per import scope.

So when:

One file registers User to its mongoose instance

And another file tries .populate("authorId") from its own different mongoose instance
→ That instance won’t know the User model → leading to your exact error:  MissingSchemaError: Schema hasn't been registered for model "User".

*/

import mongoose from "@/lib/db.lib"
import { Schema, model, models } from "mongoose"
export interface IComment {
    blogId: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId
    content: string
    createdAt: Date
    updatedAt: Date
}


const commentSchema = new Schema<IComment>({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },

    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true,
    }


}, { timestamps: true })

const Comment = models.Comment || model<IComment>("Comment", commentSchema)
export default Comment 