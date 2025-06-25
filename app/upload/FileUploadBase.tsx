"use client"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useEffect } from "react";

interface FileuploadProps {
    onSuccess: (res: any) => void;
    onProgress?: (progress: number) => void
    file: File
}

const FileUploadBase = ({ onSuccess, onProgress, file }: FileuploadProps) => {

    const abortController = new AbortController();

    const authenticator = async (): Promise<{
        signature: string, expire: number, token: string, publicKey: string
    }> => {
        try {

            const response = await fetch("/api//auth/imagekit-aut");
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();

            return { ...data, expire: Number(data.expire) };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleUpload = async () => {

        const authParams = await authenticator();
        const { signature, expire, token, publicKey } = authParams;

        try {
            const uploadResponse = await upload({
                file,
                fileName: file.name, // Optionally set a custom file name
                expire: Number(expire),
                token,
                signature,
                publicKey,

                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percentage = (event.loaded / event.total) * 100

                        onProgress(Math.round(percentage))
                    }
                },

                abortSignal: abortController.signal,
            });
            console.log("Upload response:", uploadResponse);
            onSuccess(uploadResponse)
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }

    }

    useEffect(() => {

        handleUpload()

        return () => {
            abortController.abort(); // cancel the upload request if still pending
        }
    }, [file])


    return null;
};

export default FileUploadBase;



/**
 * 🧠 Upload Architecture Summary
 *
 * - FileUploadBase handles upload logic using ImageKit's SDK.
 * - Wrapper components like ImageUpload/VideoUpload validate the file and handle UI.
 * - We pass `onSuccess` and `onProgress` as callback props to handle response and state in parent.
 *
 * - File type is checked using MIME type (file.type.startsWith("image/"))
 * - fs module isn't used because we upload directly from browser, not server.
 *
 * 🔁 Example:
 * <FileUploadBase
 *    file={file}
 *    onSuccess={(res) => { console.log(res) }}
 *    onProgress={(percent) => { console.log(percent + "%") }}
 * />
 */

// **********************************************
/*

//  file structre for uploading file at imagekit

1. FileUploadBase.tsx -> handle Logic for uploading files (video and image)

2. ImageUpload.tsx -> UI+ validation for image

3. VideoUpload.tsx -> UI+ validation for image

all 3 files are kept in uploads directory
*/
// **********************************************
