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

// middleware.js
// import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

// export default withMiddlewareAuthRequired(async function middleware(req) {
//   const user = req.nextAuth.user;

//   // Obter o papel do usuário (substituir pela sua lógica)
//   const role = await getUserRole(user.sub);

//   // Verificar se o usuário tem acesso à rota
//   if (req.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   // Continuar para a próxima rota
//   return NextResponse.next();
// });