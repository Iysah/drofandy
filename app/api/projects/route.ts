import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { verifyAdmin } from '@/lib/admin-auth'
import { FieldValue } from 'firebase-admin/firestore'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const auth = await verifyAdmin(request)
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const body = await request.json()
    const { title, image, mediaId } = body

    if (!title || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const docRef = await adminDb.collection('projects').add({
      title,
      image,
      mediaId: mediaId || null,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: auth.uid
    })

    return NextResponse.json({ id: docRef.id, message: 'Project created successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const auth = await verifyAdmin(request)
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing project ID' }, { status: 400 })
    }

    await adminDb.collection('projects').doc(id).delete()
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
