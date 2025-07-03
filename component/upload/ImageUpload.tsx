"use client";

import React, { useState } from "react";
import FileUploadBase from "./FileUploadBase";

interface ImageUploadProps {
    onSuccess: (res: any) => void;
}

export default function ImageUpload({ onSuccess }: ImageUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {
            setError("Only image files are allowed.");
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError("Image must be less than 10MB.");
            return;
        }


        setUploading(true);
        setError(null);
        setFile(selectedFile);
    };

    const handleSuccess = (res: any) => {
        onSuccess(res);
        setUploading(false);
        setFile(null);
    };

    const handleProgress = (progress: number) => {
        console.log(`Image Upload Progress: ${progress}%`);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleChange} />
            {uploading && <p>Uploading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {/* Conditionally render FileUploadBase when a file is selected */}
            {file && (
                <FileUploadBase
                    file={file}
                    onSuccess={handleSuccess}
                    onProgress={handleProgress}
                />
            )}
        </div>
    );
}







/********************* FILE UPLOADING FLOW ********************
User selects file → handleChange() → calls FileUploadBase()
                    ↳ FileUploadBase starts upload
                      ↳ ImageKit calls onProgress()
                          ↳ You get % updates in your UI
                      ↳ When upload is done → onSuccess(res) is called

*/

/**
 * ✅ Why we pass `onSuccess` and `onProgress` to FileUploadBase?
 * 
 * - FileUploadBase doesn't return values — it runs upload logic and calls our
 *   `onSuccess` and `onProgress` functions during the process.
 * 
 * - This is called a "callback" pattern: we tell it "what to do when done".
 * 
 *   🔁 onProgress(progress: number) gets called continuously during upload
 *   ✅ onSuccess(res: any) gets called when upload is finished
 * 
 * - These functions are passed as props, not values.
 *   We're NOT passing the upload result — we're passing what to do when the result arrives.
 *
 * 💡 This makes FileUploadBase reusable for images, videos, forms, etc.
 * 
 A callback is a function you pass to another function/component so that it can call it later — typically when some async work (like upload) is done.
 */
