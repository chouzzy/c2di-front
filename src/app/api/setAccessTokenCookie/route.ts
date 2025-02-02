// api/setAccessTokenCookie
"use server"
// import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

const POST = withApiAuthRequired(async function POST(req) {

    try {

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
            throw Error('Secret key not found')
        }

        console.log('accessToken')
        console.log(accessToken)

        cookies().set({
            name: 'accessToken',
            value: accessToken,
            path: "/",
            secure: true,
            sameSite: 'lax'
        })
        return NextResponse.json({ message: "Cookies setados com sucesso!" });

    } catch (error) {
        throw error
    }


})

export { POST }
