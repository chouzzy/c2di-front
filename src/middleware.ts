// import { NextRequest, NextResponse } from "next/server";

// export default function middlewareteste(request: NextRequest) {
//     return NextResponse.redirect(new URL("/vascodagama", request.url))
// }

// export const config = {
//     matcher: "/authentication"
// }

import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
    matcher: [
        '/users/:path*',
        '/authentication/login',
        '/authentication/create',
        '/authentication/recover',
    ],
};