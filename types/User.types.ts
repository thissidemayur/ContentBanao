import mongoose from "mongoose";

export interface IUser {
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: mongoose.Types.ObjectId;

    avatar?: string;
    bio?: string
    userName?: string,
    firstName?: string,
    lastName?: string
}