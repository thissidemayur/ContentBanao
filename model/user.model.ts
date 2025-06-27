import { clearModelCache } from "@/lib/Backend-helperFn";
import { IUser } from "@/types/User.types";
import bcrypt from "bcryptjs";
import { model, models, Schema } from "mongoose";



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
    avtar: {
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

// for hot reload
clearModelCache("User")
const User = models?.User || model<IUser>("User", userSchema)

export default User;


/***************************** USER SCHEMA SUMMARY *****************************
1. Defined a TypeScript interface IUser with all required fields.
2. Used that interface to create a strongly-typed Mongoose schema.
3. Added password hashing in pre-save hook.
4. Prevented re-registering the model with Mongoose during hot reload (Next.js dev mode).
********************************************************************************/