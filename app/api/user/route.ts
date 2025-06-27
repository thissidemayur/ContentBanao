import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.lib"


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: "You must be logged in." })
        return
    }

    return res.json({
        message: "Success",
    })



}

