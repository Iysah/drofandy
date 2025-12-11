import { NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'

export async function verifyAdmin(request: Request) {
  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  
  if (!token) {
    return { error: 'Unauthorized', status: 401 }
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token)
    const email = decoded.email
    
    if (!email) {
      return { error: 'Unauthorized: No email', status: 401 }
    }

    const adminSnap = await adminDb.collection('users').where('email', '==', email).limit(1).get()
    
    if (adminSnap.empty) {
      return { error: 'Forbidden: User not found', status: 403 }
    }

    const userData = adminSnap.docs[0].data()
    if (userData.role !== 'admin') {
      return { error: 'Forbidden: Insufficient permissions', status: 403 }
    }

    return { uid: decoded.uid, email: decoded.email, userDoc: userData }
  } catch (error) {
    console.error('Admin verification error:', error)
    return { error: 'Unauthorized: Invalid token', status: 401 }
  }
}
