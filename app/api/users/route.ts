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
    const { email, role } = body

    if (!email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if user already exists
    const existing = await adminDb.collection('users').where('email', '==', email).get()
    if (!existing.empty) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const docRef = await adminDb.collection('users').add({
      email,
      role,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: auth.uid
    })

    return NextResponse.json({ id: docRef.id, message: 'User added successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
    const auth = await verifyAdmin(request)
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }
  
    try {
      const body = await request.json()
      const { id, role } = body
  
      if (!id || !role) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }
  
      await adminDb.collection('users').doc(id).update({ role })
      return NextResponse.json({ message: 'User role updated successfully' })
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
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })
    }

    // Prevent deleting self? Maybe.
    // We already have the auth uid. We'd have to look up the doc ID for the current user to compare.
    // For now, let's just allow it, but in a real app, prevent suicide.

    await adminDb.collection('users').doc(id).delete()
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
