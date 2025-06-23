import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    try {
        // authenticationParameter ={ token, expire, signature }
        const authenticationParameter = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        })

        return Response.json(
            {
                authenticationParameter,
                publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            },
            { status: 200 }
        )

    } catch (error) {
        console.error("Imagekit authentication failed ::imagekit-aut= ", error)
        return Response.json(
            { error: "video uploading Authentication failed" },
            { status: 500 }
        )
    }
}
