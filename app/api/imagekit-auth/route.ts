import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    try {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        })

        return Response.json(
            {
                token,
                expire: Number(expire),
                signature,
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
