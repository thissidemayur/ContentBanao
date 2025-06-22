import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSION = {
    width:1000,
    height:1920,

} as const

export interface IVideo {
    _id?:mongoose.Types.ObjectId;
    title:string;
    descrition:string;
    videourl:string;
    thumbnailUrl:string;
    controls:boolean;
    transformation:{
        height:number;
        width:number;
        quantity:number;
    };
}

export const videoSchema= new Schema({
    title:{
        type:String,
        required:true
    } ,
    descrition:{
      type:String,
        required:true
    } ,
    videourl:{
        type:String,
         required:true
    },
    thumbnailUrl:{
        type:String,
         required:true
    },
    controls:{
        type:Boolean,
        default:true
    },
    transformation:{
        height:{
            type:Number,
            default:VIDEO_DIMENSION.height
        },
        width:{
            type:Number,
            default:VIDEO_DIMENSION.width
        },
        quantity:{
            type:Number,
            min:1,  //from imagekit
            max:100 // from imagekit
        }
    }
})

const Video = models?.Video || model<IVideo>("Video",)
export default Video;