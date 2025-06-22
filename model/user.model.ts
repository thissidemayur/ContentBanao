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


/***************************** as a TS begineer what we did *****************************/
/* 
1. create a TS interface(IUser) for user Schema. defined data-type of userSchema field here 
2. defined user schema by impleting IUser therefore our schema is type proof
3. hash password using bcrypt
4. create user model only if it's have been already created else export created one's userSchmea
*/
