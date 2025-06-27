import mongoose from "mongoose";

export interface IUser {
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: mongoose.Types.ObjectId;

    avtar?: string;
    bio?: string
    userName: string | mongoose.Types.ObjectId,
    firstName?: string,
    lastName?: string
}