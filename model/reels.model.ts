import { MediaItem } from "@/types/media.types";
import mongosse from '@/lib/db.lib'
import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSION = {
    width: 1080,
    height: 1920,

} as const
export interface Author {
    _id: mongoose.Types.ObjectId;
    userName: string;
    avatar: string;
}


export interface IVideo {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    media: MediaItem;
    controls?: boolean;
    thumbnailUrl: string;
    authorId: mongoose.Types.ObjectId | Author;

    tags?: string[];
    isPublished?: boolean;
    likes?: string[]

}

const transformationSchema = new Schema({
    height: {
        type: Number,

        default: VIDEO_DIMENSION.height
    },
    width: {
        type: Number,
        default: VIDEO_DIMENSION.width
    },
    quality: {
        type: Number,
        min: 1,  //from imagekit
        max: 100, // from imagekit,
        default: 80
    }
}, { _id: false })

const mediaSchema = new Schema<MediaItem>({
    type: {
        type: String,
        enum: ['video'],
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        trim: true
    },
    transformation: transformationSchema
}, { _id: false })

export const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    media: mediaSchema,
    controls: {
        type: Boolean,
        default: false
    },
    thumbnailUrl: {
        type: String
    },
    authorId: {
        type: mongosse.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },

})

const Reel = models?.Video || model<IVideo>("Video", videoSchema)
export default Reel;

