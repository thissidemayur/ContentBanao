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
import { IUser } from "@/types/User.types";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    avatar: {
        type: String
    },
    bio: {
        type: String,
        trime: true,

    },
    firstName: {
        type: String,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true
    },
    userName: {
        type: String,
        sparse: true,
        unique: true,
        default: function () {
            return this._id?.toString()
        }
    }


}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.userName) this.userName = this._id.toString()

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

userSchema.methods.validatePassword = async function (inputPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, this.password);
}

const User = models?.User || model<IUser>("User", userSchema)

export default User;
