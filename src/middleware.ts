// // middleware.js
// import { withMiddlewareAuthRequired, getSession, updateSession } from '@auth0/nextjs-auth0/edge';
// import { checkUserByEmail } from './app/services/checkUserByEmail';
// import { UserProfile } from '@auth0/nextjs-auth0/client';
// import { NextResponse } from 'next/server';

// export const config = {
//     runtime: 'nodejs',
//   };
// // Função para verificar o papel do usuário (pode ser assíncrona)
// async function getUserRole(user: UserProfile) {
//     // Faça uma requisição para sua API para obter o papel do usuário
//     const userFound = await checkUserByEmail(user);
//     return userFound.role;
//   }
// async function getUser(user: UserProfile) {
//     // Faça uma requisição para sua API para obter o papel do usuário
//     const userFound = await checkUserByEmail(user);
//     return userFound;
//   }

// export default withMiddlewareAuthRequired(async function middleware(req) {
//     const res = NextResponse.next();
//     const session = await getSession(req, res);

//     if (session) {


//     if (!session.user.userdb) {

//       const user = await getUser(session.user)


//       console.log('session.user.userdb')
//       console.log(session.user.userdb)

//         if (user) {
//             // Atualiza a sessão com o objeto user
//             await updateSession(req, res, { ...session, user: { ...session.user, userdb: user }});
//         }
//         // else {
//             // const auth0Cookie = req.cookies.get('appSession');
//             // console.log('req.cookies')
//             // console.log(req.cookies)
//             // console.log('auth0Cookie')
//             // console.log(auth0Cookie)

//             // if (auth0Cookie) {
//             //     if (req.nextUrl.pathname !== '/authentication/create/investor' && req.nextUrl.pathname !== '/' && req.nextUrl.pathname !== '/api/auth/logout') {  
//             //         console.log('redbarra')
//             //             return NextResponse.redirect(new URL('/', req.url)); // Aguarda 500 milissegundos antes de redirecionar
//             //       }
//             // }
//         // }
//     }

//     if (session.user.userdb) {

//         const {id, role} = session.user.userdb

//     // ROLE MIDDLEWARES

//         // UPDATE ROUTES INVESTOR
//         if (role === process.env.PROPRIETARIO && (
//         req.nextUrl.pathname == '/users/update/investor' || 
//         req.nextUrl.pathname == '/users/update/administrator' || 
//         req.nextUrl.pathname == '/users/update/project-manager' ||
//         req.nextUrl.pathname == '/users/list' ||
//         req.nextUrl.pathname.startsWith('/users/update/project-manager/') ||
//         req.nextUrl.pathname.startsWith('/users/update/administrator/') ||
//         req.nextUrl.pathname.startsWith('/users/update/investor/') ||
//         req.nextUrl.pathname.startsWith('/users/update/proprietario/')
//         )) {
//         console.log('Acesso negado para PROPRIETARIO.');
//         return NextResponse.redirect(new URL('/users/update/proprietario', req.url)); // Redireciona para a página inicial
//         }
//         // UPDATE ROUTES INVESTOR
//         if (role === process.env.INVESTOR && (
//         req.nextUrl.pathname == '/users/update/proprietario' || 
//         req.nextUrl.pathname == '/users/update/administrator' || 
//         req.nextUrl.pathname == '/users/update/project-manager' ||
//         req.nextUrl.pathname == '/users/list' ||
//         req.nextUrl.pathname.startsWith('/users/update/project-manager/') ||
//         req.nextUrl.pathname.startsWith('/users/update/administrator/') ||
//         req.nextUrl.pathname.startsWith('/users/update/proprietario/') ||
//         req.nextUrl.pathname.startsWith('/users/update/investor/')
//         )) {
//         console.log('Acesso negado para INVESTOR.');
//         return NextResponse.redirect(new URL('/users/update/investor', req.url)); // Redireciona para a página inicial
//         }

//         // UPDATE ROUTES PROJECT_MANAGER
//         if (role === process.env.PROJECT_MANAGER && (
//         req.nextUrl.pathname == '/users/update/proprietario' || 
//         req.nextUrl.pathname == '/users/update/administrator' || 
//         req.nextUrl.pathname == '/users/update/investor' ||
//         req.nextUrl.pathname == '/users/list' ||
//         req.nextUrl.pathname.startsWith('/users/update/proprietario/') ||
//         req.nextUrl.pathname.startsWith('/users/update/project-manager/') ||
//         req.nextUrl.pathname.startsWith('/users/update/administrator/') ||
//         req.nextUrl.pathname.startsWith('/users/update/investor/')
//         )) {
//         console.log('Acesso negado para PROJECT MANAGER.');
//         return NextResponse.redirect(new URL('/users/update/project-manager', req.url)); // Redireciona para a página inicial
//         }

//         // UPDATE ROUTES ADMINISTRATOR
//         if (role === process.env.ADMINISTRATOR && (
//         req.nextUrl.pathname == '/users/update/proprietario' || 
//         req.nextUrl.pathname == '/users/update/investor' || 
//         req.nextUrl.pathname == '/users/update/project-manager' ||
//         req.nextUrl.pathname == `/users/update/administrator/${id}`
//         )) {
//         console.log('Acesso negado para ADMINISTRATOR.');
//         return NextResponse.redirect(new URL('/users/update/administrator', req.url)); // Redireciona para a página inicial
//         }


//         // PROJECT ROUTES PROJECT_MANAGER
//         if (role === process.env.INVESTOR) {
//             if (
//                 req.nextUrl.pathname.startsWith('/project-manager')||
//                 req.nextUrl.pathname.startsWith('/create-project')
//             ) {
//                 return NextResponse.redirect(new URL('/projects', req.url)); // Redireciona para a página inicial
//             }
//         }
//         // PROJECT ROUTES PROPRIETARIO
//         if (role === process.env.PROPRIETARIO) {
//             if (
//                 req.nextUrl.pathname.startsWith('/project-manager')||
//                 req.nextUrl.pathname.startsWith('/create-project')
//             ) {
//                 return NextResponse.redirect(new URL('/projects', req.url)); // Redireciona para a página inicial
//             }
//         }
//         // PROJECT ROUTES PROPRIETARIO
//         if (role === process.env.PROPRIETARIO) {
//             if (
//                 req.nextUrl.pathname.startsWith('/myInvestments')
//             ) {
//                 return NextResponse.redirect(new URL('/myPropriedades', req.url)); // Redireciona para a página inicial
//             }
//         }

//         // PROJECT ROUTES PROJECT_MANAGER
//         if (role === process.env.ADMINISTRATOR) {
//             if (req.nextUrl.pathname.startsWith('/project-manager')) {
//                 return NextResponse.redirect(new URL('/projects', req.url)); // Redireciona para a página inicial
//             }
//         }

//         // PROJECT ROUTES PROJECT_MANAGER
//         if (role === process.env.PROJECT_MANAGER) {
//             if (req.nextUrl.pathname.startsWith('/projects')) {
//                 return NextResponse.redirect(new URL('/project-manager/projects', req.url)); // Redireciona para a página inicial
//             }
//         }
//     }

//     //   HOMEPAGE ROUTES
//     //   if (role === 'INVESTOR' && (
//     //       req.nextUrl.pathname == ('/')
//     //     )) {
//     //     console.log('Acesso negado para INVESTOR.');
//     //     await setAccessTokenCookie()
//     //     return NextResponse.redirect(new URL('/users/update/investor', req.url)); // Redireciona para a página inicial
//     //   }











//     } else {
//         return NextResponse.redirect(new URL('/authentication', req.url)); // Redireciona para /login
//     }
// //   res.cookies.set('hl', user.language);
//   return res;
// });










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








// MIDDLEWARE --------------------------------------------

// middleware.js
import { withMiddlewareAuthRequired, getSession, updateSession } from '@auth0/nextjs-auth0/edge';
import { getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';


// async function getUserData(req: NextRequest, token: string | undefined, email: string) {
//     //A URL base precisa ser a do seu app, a que aparece quando você roda `npm run dev`
//     //Para funcionar em produção, você precisará usar uma variável de ambiente.
//     // const baseUrl = 'https://c2diserver.awer.co/'
//     // const baseUrl = 'check-user/'
//     const baseUrl = req.nextUrl.origin;
//     console.log("Chamando getUserData. baseUrl:", baseUrl);
//     // const baseUrl = 'http://localhost:8081/'

//     try {
//         const apiResponse = await fetch(`${baseUrl}/api/check-user?email=${email}`, {
//             method: 'GET', // Geralmente GET para buscar dados
//             // NÃO ENVIA O TOKEN (já que o backend não vai usar)
//           });
      

//         // const apiResponse = await fetch(`${baseUrl}/api/check-user`, {
//         //     method: 'GET', 
//         // });
//         console.log("getUserData - Status da resposta da API:", apiResponse.status); // VERIFIQUE O STATUS

//         if (!apiResponse.ok) {
//             console.error('Erro ao buscar dados do usuário na API:', apiResponse.status);
//             const errorBody = await apiResponse.text();
//             console.error("Corpo do erro:", errorBody); // <--  MUITO IMPORTANTE
//             return null;
//         }

//         const data = await apiResponse.json();
//         return data.user;

//     } catch (error) {
//         console.error('Erro ao buscar dados do usuário:', error);
//         return null;
//     }
// }

export default withMiddlewareAuthRequired(async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const session = await getSession(req, res);

    if (session) {
        const accessToken = session.accessToken; // Pega o accessToken

        // if (!session.user.userdb) {
        //     // Chama a função auxiliar, passando o token
            


        //     if (user) {
        //         // Atualiza a sessão com o objeto user
        //         await updateSession(req, res, { ...session, user: { ...session.user, userdb: user } });
        //     }
        // }

        if (session.user.userdb) {
            const { id, role } = session.user.userdb;

            // ROLE MIDDLEWARES

            // UPDATE ROUTES INVESTOR
            if (role === process.env.PROPRIETARIO && (
                req.nextUrl.pathname == '/users/update/investor' ||
                req.nextUrl.pathname == '/users/update/administrator' ||
                req.nextUrl.pathname == '/users/update/project-manager' ||
                req.nextUrl.pathname == '/users/list' ||
                req.nextUrl.pathname.startsWith('/users/update/project-manager/') ||
                req.nextUrl.pathname.startsWith('/users/update/administrator/') ||
                req.nextUrl.pathname.startsWith('/users/update/investor/') ||
                req.nextUrl.pathname.startsWith('/users/update/proprietario/')
            )) {
                console.log('Acesso negado para PROPRIETARIO.');
                return NextResponse.redirect(new URL('/users/update/proprietario', req.url)); // Redireciona para a página inicial
            }
            // UPDATE ROUTES INVESTOR
            if (role === process.env.INVESTOR && (
                req.nextUrl.pathname == '/users/update/proprietario' ||
                req.nextUrl.pathname == '/users/update/administrator' ||
                req.nextUrl.pathname == '/users/update/project-manager' ||
                req.nextUrl.pathname == '/users/list' ||
                req.nextUrl.pathname.startsWith('/users/update/project-manager/') ||
                req.nextUrl.pathname.startsWith('/users/update/administrator/') ||
                req.nextUrl.pathname.startsWith('/users/update/proprietario/') ||
                req.nextUrl.pathname.startsWith('/users/update/investor/')
            )) {
                console.log('Acesso negado para INVESTOR.');
                return NextResponse.redirect(new URL('/users/update/investor', req.url)); // Redireciona para a página inicial
            }

            // UPDATE ROUTES PROJECT_MANAGER
            if (role === process.env.PROJECT_MANAGER && (
                req.nextUrl.pathname == '/users/update/proprietario' ||
                req.nextUrl.pathname == '/users/update/administrator' ||
                req.nextUrl.pathname == '/users/update/investor' ||
                req.nextUrl.pathname == '/users/list' ||
                req.nextUrl.pathname.startsWith('/users/update/proprietario/') ||
                req.nextUrl.pathname.startsWith('/users/update/project-manager/') ||
                req.nextUrl.pathname.startsWith('/users/update/administrator/') ||
                req.nextUrl.pathname.startsWith('/users/update/investor/')
            )) {
                console.log('Acesso negado para PROJECT MANAGER.');
                return NextResponse.redirect(new URL('/users/update/project-manager', req.url)); // Redireciona para a página inicial
            }

            // UPDATE ROUTES ADMINISTRATOR
            if (role === process.env.ADMINISTRATOR && (
                req.nextUrl.pathname == '/users/update/proprietario' ||
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
                    req.nextUrl.pathname.startsWith('/project-manager') ||
                    req.nextUrl.pathname.startsWith('/create-project')
                ) {
                    return NextResponse.redirect(new URL('/projects', req.url)); // Redireciona para a página inicial
                }
            }
            // PROJECT ROUTES PROPRIETARIO
            if (role === process.env.PROPRIETARIO) {
                if (
                    req.nextUrl.pathname.startsWith('/project-manager') ||
                    req.nextUrl.pathname.startsWith('/create-project')
                ) {
                    return NextResponse.redirect(new URL('/projects', req.url)); // Redireciona para a página inicial
                }
            }
            // PROJECT ROUTES PROPRIETARIO
            if (role === process.env.PROPRIETARIO) {
                if (
                    req.nextUrl.pathname.startsWith('/myInvestments')
                ) {
                    return NextResponse.redirect(new URL('/myPropriedades', req.url)); // Redireciona para a página inicial
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




