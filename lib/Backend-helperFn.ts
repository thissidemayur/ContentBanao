import mongoose from "mongoose";

export function clearModelCache(modelName: string) {
    if (process.env.NODE_ENV === "development") {
        delete (mongoose.connection.models as any)[modelName];
    }
}

export const getValidImageSrc = (url?: string | null) => {
    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
        return "/images/fallback.png";
    }
    return url;
};
