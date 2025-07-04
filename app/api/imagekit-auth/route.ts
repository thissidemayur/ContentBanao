import { getUploadAuthParams } from "@imagekit/next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth.lib" // adjust path as per your setup

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401 }
        )
    }

    try {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_AUTH_IMAGEKIT_PUBLIC_KEY as string,
        })

        return Response.json(
            {
                token,
                expire: Number(expire),
                signature,
                publicKey: process.env.NEXT_AUTH_IMAGEKIT_PUBLIC_KEY,
            },
            { status: 200 }
        )

    } catch (error) {
        console.error("Imagekit authentication failed ::imagekit-auth= ", error)
        return Response.json(
            { error: "video uploading Authentication failed" },
            { status: 500 }
        )
    }
}
