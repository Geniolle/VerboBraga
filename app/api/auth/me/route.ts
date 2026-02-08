import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'
import { isUserAdmin } from '@/lib/db'

export async function GET() {
  const user = await getServerUser()

  if (!user) {
    return NextResponse.json({ user: null, isAdmin: false }, { status: 200 })
  }

  const admin = await isUserAdmin(user.uid)

  return NextResponse.json({ user, isAdmin: admin }, { status: 200 })
}
