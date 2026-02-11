import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAdminAuth } from '@/lib/firebase/admin'
import { getUserAccess } from '@/lib/db'

export type ServerUser = {
  uid: string
  email?: string
  name?: string
  picture?: string
}

export async function getServerUser(): Promise<ServerUser | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  if (!session) return null

  try {
    const decoded = await getAdminAuth().verifySessionCookie(session, true)
    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    }
  } catch {
    return null
  }
}

export async function requireServerUser(redirectTo = '/') {
  const user = await getServerUser()
  if (!user) redirect(redirectTo)
  return user
}

export async function requireAdminUser() {
  const user = await requireServerUser()
  const access = await getUserAccess(user.uid, user.email ?? null)

  if (!access.isAdmin) redirect('/')

  return user
}

export async function requireChurchUser(redirectTo = '/?openLogin=1') {
  const user = await requireServerUser(redirectTo)
  const access = await getUserAccess(user.uid, user.email ?? null)

  if (!access.canAccessChurch) redirect('/')

  return user
}
