// app/api/check-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkUserByEmail } from '@/app/services/checkUserByEmail'; // Ajuste o caminho, se necessário
import { getSession } from '@auth0/nextjs-auth0/edge';

// NÃO use o Edge Runtime aqui (deixe o Next.js usar o Node.js por padrão)
// export const config = { runtime: 'edge' }; // REMOVA ESTA LINHA

export async function GET(req: NextRequest) { // ou POST, dependendo do que você precisa
  try {
    console.log('oiiiiiii')
    const session = await getSession(req, NextResponse.next());
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 402 });
    }

    const user = session.user;
    const accessToken = session.accessToken; // Pega o accessToken da sessão

    const userResponse = await checkUserByEmail(user); // Passa o token
    return NextResponse.json({ user: userResponse });
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
    return NextResponse.json({ error: 'Erro ao verificar usuário' }, { status: 500 });
  }
}