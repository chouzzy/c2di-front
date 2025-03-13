// app/api/check-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkUserByEmail } from '@/app/services/checkUserByEmail'; // Ajuste o caminho, se necessário
import { getSession } from '@auth0/nextjs-auth0'; // SEM /edge

// NÃO use o Edge Runtime aqui (deixe o Next.js usar o Node.js por padrão)
// export const config = { runtime: 'edge' }; // REMOVA ESTA LINHA

export async function GET(req: NextRequest) {
  try {
    // Obtenha a sessão *sem* o NextResponse.next()
    const session = await getSession(req, NextResponse.next());//Não passe NextResponse.next() em uma API Route, ou você estará usando a sessão do middleware

    console.log("DENTRO DA API ROUTE - SESSION:", session); // Verifique a sessão

    //Agora, verifique a sessão
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      }
    const user = session.user;

    //Obtenha o token a partir do headers
    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader ? authHeader.split(' ')[1] : undefined

    console.log("API Route - accessToken:", accessToken);

    const userResponse = await checkUserByEmail(user); // Passa o accessToken
    return NextResponse.json({ user: userResponse });

  } catch (error) {
    console.error('Erro na API Route /api/check-user:', error);
    return NextResponse.json({ error: 'Erro ao verificar usuário' }, { status: 500 });
  }
}