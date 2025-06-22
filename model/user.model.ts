import bcrypt from "bcryptjs";
import mongoose, { model, models, Schema } from "mongoose";

export interface IUser  {
    email:string;
    password:string;
    createdAt?:Date;
    updatedAt?:Date;
    _id?:mongoose.Types.ObjectId;
}

const userSchema =new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    } ,
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }
    
},{timestamps:true})

userSchema.pre("save", async function (next){
    if(this.isModified("password")) {
        this.password= await bcrypt.hash(this.password, 10)
    }
    next();
})


const User =models?.User ||  model<IUser>("User",userSchema)

export default User;


/***************************** USER SCHEMA SUMMARY *****************************
1. Defined a TypeScript interface IUser with all required fields.
2. Used that interface to create a strongly-typed Mongoose schema.
3. Added password hashing in pre-save hook.
4. Prevented re-registering the model with Mongoose during hot reload (Next.js dev mode).
********************************************************************************/