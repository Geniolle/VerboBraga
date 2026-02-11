import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/centro-de-cura/formulario', '/admin', '/igreja']

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const needsAuth = PROTECTED_PATHS.some((p) => path === p || path.startsWith(`${p}/`))

  if (!needsAuth) return NextResponse.next()

  const sessionCookie = req.cookies.get('session')?.value

  if (!sessionCookie) {
    const url = new URL('/', req.url)
    if (
      path === '/centro-de-cura/formulario' ||
      path.startsWith('/centro-de-cura/formulario/') ||
      path === '/igreja' ||
      path.startsWith('/igreja/')
    ) {
      url.searchParams.set('openLogin', '1')
    }
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/centro-de-cura/formulario/:path*', '/admin/:path*', '/igreja/:path*'],
}
