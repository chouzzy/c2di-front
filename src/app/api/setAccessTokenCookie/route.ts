// api/setAccessTokenCookie
"use server"
// import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

const POST = withApiAuthRequired(async function POST(req) {

    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res, {
        authorizationParams: {
            audience: process.env.AUTH0_AUDIENCE,
            scope: "C2DI Auth API",
        }
    })

    if (!accessToken) {
        throw Error("AccessToken not found")
    }

    const secretKey = process.env.AUTH0_SECRET

    if (!secretKey) {
        throw Error ('Secret key not found')
    }
    const encryptedToken = CryptoJS.AES.encrypt(accessToken, secretKey).toString();

    cookies().set({
        name: 'accessToken',
        value: encryptedToken,
        httpOnly: true,
        domain:'.awer.co',
        path: "/",
        secure: true,
        sameSite: 'lax'
    })

    return NextResponse.json({ message: "Cookies setados com sucesso!" });


})

export { POST }
