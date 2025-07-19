// app/api/set-tokens/route.ts
'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function setCookies(access_token:string,refresh_token:string, access_token_expiry?:number) {

  (await cookies()).set('sb_access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: access_token_expiry ? access_token_expiry : 60 * 60, // 1 hour
  });
  (await cookies()).set('sb_refresh_token', refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  redirect('/');
  return true;
}
