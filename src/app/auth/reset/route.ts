import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { NextResponse, type NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    // exchange the auth code for user session
    // const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('data', data,)
    console.log('error', error);

  }

  const next = requestUrl.searchParams.get('next')

  return NextResponse.redirect(requestUrl.origin + next)
}