export default {
    secret: process.env.AUTH0_SECRET,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,   
  
    routes: {
      callback: '/api/auth/callback', // Rota de callback padrão
      postLogoutRedirect: '/authentication', // URL de redirecionamento após o logout
    },
  };