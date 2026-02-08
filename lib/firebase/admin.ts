import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

function getPrivateKey() {
  const key = process.env.FIREBASE_PRIVATE_KEY
  if (!key) return undefined
  return key.replace(/\\n/g, '\n')
}

function initAdmin() {
  if (getApps().length) return getApps()[0]

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = getPrivateKey()

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin env vars are missing')
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export function getAdminAuth() {
  const app = initAdmin()
  return getAuth(app)
}
