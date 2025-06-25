import React, { useState } from 'react'
import FileUploadBase from './FileUploadBase'


export default function ImageUpload({ onSuccess }: { onSuccess: (res: any) => void }) {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            alert("Please select a file to upload")
            return;
        }

        if (!file.type.startsWith("image/")) {
            setError("Only image files are allowed");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError("Image must be less than 10MB");
            return;
        }

        setUploading(true)
        setError(null)

        try {
            await FileUploadBase({
                file,
                onSuccess: (res) => {
                    onSuccess(res)
                    setUploading(false)
                },
                onProgress: (progress: number) => {
                    console.log(`Image Upload Progress: ${progress}%`);
                }

            })
        } catch (err) {
            console.error("Upload failed", err);
            setError("Upload failed. Try again.");
            setUploading(false);
        }


    }

    return (
        <>
            <div>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handlechange}
                />
                {uploading && <p>Uploading...</p>}
                {error && <p className="text-red-600">{error}</p>}

            </div>
        </>
    )
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
