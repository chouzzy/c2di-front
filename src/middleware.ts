// middleware.js
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { checkUserByEmail } from './app/api/checkUserByEmail/route';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { NextResponse } from 'next/server';


// Função para verificar o papel do usuário (pode ser assíncrona)
async function getUserRole(user: UserProfile) {
    // Faça uma requisição para sua API para obter o papel do usuário
    const userFound = await checkUserByEmail(user);
    return userFound.role;
  }
async function getUser(user: UserProfile) {
    // Faça uma requisição para sua API para obter o papel do usuário
    const userFound = await checkUserByEmail(user);
    return userFound;
  }

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (session) {

      const user = await getUser(session.user)
      const {id, email, role} = user
      

    // ROLE MIDDLEWARES

        // UPDATE ROUTES INVESTOR
        if (role === process.env.INVESTOR && (
        req.nextUrl.pathname == '/users/update/administrator' || 
        req.nextUrl.pathname == '/users/update/project-manager' ||
        req.nextUrl.pathname == '/users/list' ||
        req.nextUrl.pathname.startsWith('/users/update/project-manager/') ||
        req.nextUrl.pathname.startsWith('/users/update/administrator/') ||
        req.nextUrl.pathname.startsWith('/users/update/investor/')
        )) {
        console.log('Acesso negado para INVESTOR.');
        return NextResponse.redirect(new URL('/users/update/investor', req.url)); // Redireciona para a página inicial
        }

        // UPDATE ROUTES PROJECT_MANAGER
        if (role === process.env.PROJECT_MANAGER && (
        req.nextUrl.pathname == '/users/update/administrator' || 
        req.nextUrl.pathname == '/users/update/investor' ||
        req.nextUrl.pathname == '/users/list' ||
        req.nextUrl.pathname.startsWith('/users/update/project-manager/') ||
        req.nextUrl.pathname.startsWith('/users/update/administrator/') ||
        req.nextUrl.pathname.startsWith('/users/update/investor/')
        )) {
        console.log('Acesso negado para PROJECT MANAGER.');
        return NextResponse.redirect(new URL('/users/update/project-manager', req.url)); // Redireciona para a página inicial
        }

        // UPDATE ROUTES ADMINISTRATOR
        if (role === process.env.ADMINISTRATOR && (
        req.nextUrl.pathname == '/users/update/investor' || 
        req.nextUrl.pathname == '/users/update/project-manager' ||
        req.nextUrl.pathname == `/users/update/administrator/${id}`
        )) {
        console.log('Acesso negado para ADMINISTRATOR.');
        return NextResponse.redirect(new URL('/users/update/administrator', req.url)); // Redireciona para a página inicial
        }


        // PROJECT ROUTES PROJECT_MANAGER
        if (role === process.env.INVESTOR) {
            if (
                req.nextUrl.pathname.startsWith('/project-manager')||
                req.nextUrl.pathname.startsWith('/create-project')
            ) {
                return NextResponse.redirect(new URL('/projects', req.url)); // Redireciona para a página inicial
            }
        }

        // PROJECT ROUTES PROJECT_MANAGER
        if (role === process.env.ADMINISTRATOR) {
            if (req.nextUrl.pathname.startsWith('/project-manager')) {
                return NextResponse.redirect(new URL('/projects', req.url)); // Redireciona para a página inicial
            }
        }

        // PROJECT ROUTES PROJECT_MANAGER
        if (role === process.env.PROJECT_MANAGER) {
            if (req.nextUrl.pathname.startsWith('/projects')) {
                return NextResponse.redirect(new URL('/project-manager/projects', req.url)); // Redireciona para a página inicial
            }
        }


    //   HOMEPAGE ROUTES
    //   if (role === 'INVESTOR' && (
    //       req.nextUrl.pathname == ('/')
    //     )) {
    //     console.log('Acesso negado para INVESTOR.');
    //     await setAccessTokenCookie()
    //     return NextResponse.redirect(new URL('/users/update/investor', req.url)); // Redireciona para a página inicial
    //   }











    } else {
        return NextResponse.redirect(new URL('/authentication', req.url)); // Redireciona para /login
    }
//   res.cookies.set('hl', user.language);
  return res;
});










//   export default withMiddlewareAuthRequired(async function middleware(req:any) {
//     // const user = req.nextAuth.user;

//     console.log('req')
//     console.log(req)
  
//     // Obter o papel do usuário
//     // const role = await getUserRole(user.sub); // Substitua user.sub pelo identificador único do usuário
  
//     // Verificar se o usuário tem acesso à rota
//     // if (req.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
//     //   return NextResponse.redirect(new URL('/unauthorized', req.url));
//     // }
  
//     // Continuar para a próxima rota
//     return NextResponse.next();
//   });
  
//   export const config = {
//     matcher: ['/admin/:path*', '/users/:path*'], // Exemplo de rotas protegidas
//   };





// export default withMiddlewareAuthRequired();

// export const config = {
//     matcher: [
//         '/users/:path*',
//         '/authentication/login',
//         '/authentication/create',
//         '/authentication/recover',
//     ],
// };




















// import { NextRequest, NextResponse } from "next/server";

// export default function middlewareteste(request: NextRequest) {
//     return NextResponse.redirect(new URL("/vascodagama", request.url))
// }

// export const config = {
//     matcher: "/authentication"
// }
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