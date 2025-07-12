import mongoose from "mongoose";



export const getValidImageSrc = (url?: string | null) => {
    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
        return "/images/fallback.png";
    }
    return url;
};
