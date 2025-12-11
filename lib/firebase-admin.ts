import admin from 'firebase-admin'

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
const privateKeyRaw = process.env.FIREBASE_ADMIN_PRIVATE_KEY
const privateKey = privateKeyRaw ? privateKeyRaw.replace(/\\n/g, '\n') : undefined
const hasValidCertEnv = !!(projectId && clientEmail && privateKey && privateKey.includes('BEGIN PRIVATE KEY'))

if (!admin.apps.length) {
  if (hasValidCertEnv) {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey })
    })
  } else {
    admin.initializeApp()
  }
}

export const adminAuth = admin.auth()
export const adminDb = admin.firestore()
export default admin
