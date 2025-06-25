import React, { useState } from 'react'
import FileUploadBase from './FileUploadBase'


export default function ImageUpload({ onSuccess }: { onSuccess: (res: any) => void }) {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            alert("Please select a video file to upload")
            return;
        }

        if (!file.type.startsWith("video/")) {
            setError("Only video files are allowed");
            return;
        }

        if (file.size > 100 * 1024 * 1024) {
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
                    console.log(`Video Upload Progress: ${progress}%`);
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
                    accept='video/*'
                    onChange={handlechange}
                />
                {uploading && <p>Uploading...</p>}
                {error && <p className="text-red-600">{error}</p>}

            </div>
        </>
    )
}

