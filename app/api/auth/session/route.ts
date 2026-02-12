import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth } from '@/lib/firebase/admin'
import { upsertSessionUser } from '@/lib/db'

const EXPIRES_IN = 1000 * 60 * 60 * 24 * 5

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json()

    if (!idToken) {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
    }

    const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
      expiresIn: EXPIRES_IN,
    })
    const decoded = await getAdminAuth().verifyIdToken(idToken)

    try {
      await upsertSessionUser(decoded.uid, decoded.email ?? null)
    } catch (error) {
      console.error('Falha ao sincronizar usuario na API interna', error)
      return NextResponse.json(
        { error: 'Falha ao sincronizar usuario na API interna' },
        { status: 502 }
      )
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: EXPIRES_IN / 1000,
    })

    return res
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
