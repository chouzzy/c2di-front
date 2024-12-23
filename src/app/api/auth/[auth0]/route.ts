// pages/api/auth/[...auth0].ts

import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = handleAuth({
    logout: handleLogout({ returnTo: '/authentication' }),
});
