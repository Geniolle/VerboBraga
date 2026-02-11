import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'
import { getUserAccess, type UserAccess } from '@/lib/db'

export async function GET() {
  const user = await getServerUser()

  if (!user) {
    return NextResponse.json(
      {
        user: null,
        isAdmin: false,
        isColaborador: false,
        isMembresia: false,
        canAccessChurch: false,
      },
      { status: 200 }
    )
  }

  let access: UserAccess
  try {
    access = await getUserAccess(user.uid, user.email ?? null)
  } catch {
    return NextResponse.json(
      {
        user,
        isAdmin: false,
        isColaborador: false,
        isMembresia: false,
        canAccessChurch: false,
      },
      { status: 200 }
    )
  }

  return NextResponse.json(
    {
      user,
      isAdmin: access.isAdmin,
      isColaborador: access.isColaborador,
      isMembresia: access.isMembresia,
      canAccessChurch: access.canAccessChurch,
    },
    { status: 200 }
  )
}
