import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/centro-de-cura/formulario', '/admin']

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const needsAuth = PROTECTED_PATHS.some((p) => path === p || path.startsWith(`${p}/`))

  if (!needsAuth) return NextResponse.next()

  const sessionCookie = req.cookies.get('session')?.value

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/centro-de-cura/formulario/:path*', '/admin/:path*'],
}
