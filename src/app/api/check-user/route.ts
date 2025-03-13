// app/api/check-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkUserByEmail, checkUserByEmailOnlyEmail } from '@/app/services/checkUserByEmail'; // Ajuste o caminho, se necessário
import { getSession } from '@auth0/nextjs-auth0'; // SEM /edge
import { getCookie } from 'cookies-next';

// NÃO use o Edge Runtime aqui (deixe o Next.js usar o Node.js por padrão)
// export const config = { runtime: 'edge' }; // REMOVA ESTA LINHA

const API_BASE_URL = 'https://c2diserver.awer.co'; // URL do SEU BACKEND

export async function GET(req: NextRequest) { //  Função GET
  try {

    // Extrai o email *da query string* da URL:
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email');

    const url = `${API_BASE_URL}/users/findUnique/?email=${email}`;

    
    
    if (!email) {
      return NextResponse.json({ error: 'Email não fornecido' }, { status: 400 }); // Bad Request
    }
    const response = await fetch(url);  // Sem headers, já que não precisa de token
    
    console.log('response')
    console.log(response)
    const userResponse = await checkUserByEmailOnlyEmail(email); // Passa o accessToken
    console.log('userResponse')
    console.log(userResponse)
    return NextResponse.json({ user: userResponse });

  } catch (error) {
    console.error('Erro na API Route /api/check-user:', error);
    return NextResponse.json({ error: 'Erro ao verificar usuário' }, { status: 500 });
  }
}