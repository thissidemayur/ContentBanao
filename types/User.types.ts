import mongoose from "mongoose";

export interface IUser {
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;

    avatar?: string;
    bio?: string
    userName?: string,
    firstName?: string,
    lastName?: string
}