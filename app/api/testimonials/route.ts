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
    const { details, clientName, clientTitle, clientCompany, rating } = body

    if (!details || !clientName || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const docRef = await adminDb.collection('testimonials').add({
      details,
      clientName,
      clientTitle: clientTitle || null,
      clientCompany: clientCompany || null,
      rating: Number(rating),
      createdAt: FieldValue.serverTimestamp(),
      createdBy: auth.uid
    })

    return NextResponse.json({ id: docRef.id, message: 'Testimonial created successfully' })
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
      return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 })
    }

    await adminDb.collection('testimonials').doc(id).delete()
    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
