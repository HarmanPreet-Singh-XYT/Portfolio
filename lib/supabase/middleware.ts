'use server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('sb_access_token')?.value

  const {
    data: { user },
  } = (accessToken && accessToken !== "") ? await supabase.auth.getUser(accessToken) : await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname
  // Protect /admin route
  if (pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone()
    if (!user) {
      // Not logged in — redirect to login
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Check if user has 'admin' role
    const role = user.user_metadata?.role || user.app_metadata?.role;

    if (role !== 'admin') {
      // Logged in but not an admin — return 403 Unauthorized
      url.pathname = '/errors/unauthorized'
      return NextResponse.redirect(url)
      // return new NextResponse('Unauthorized access', { status: 403 })
    }
  }
  if (
    user &&
    request.nextUrl.pathname.startsWith('/login')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}