import { NextResponse } from 'next/server'
import admin, { adminAuth, adminDb } from '@/lib/firebase-admin'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = await adminAuth.verifyIdToken(token)
    const email = decoded.email || ''
    const uid = decoded.uid
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminSnap = await adminDb.collection('users').where('email', '==', email).limit(1).get()
    if (adminSnap.empty) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const adminDoc = adminSnap.docs[0].data() as any
    if (adminDoc.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { title, image, mediaId, description, rating } = body as any
    if (!title || !description || !rating) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const ref = await adminDb.collection('services').add({
      title,
      image: image || null,
      mediaId: mediaId || null,
      description,
      rating,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: uid
    })
    return NextResponse.json({ id: ref.id })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 })
  }
}
