import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'
import { getUserAccess } from '@/lib/db'

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

  const access = await getUserAccess(user.uid)

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
