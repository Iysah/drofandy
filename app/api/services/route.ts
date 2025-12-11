import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { verifyAdmin } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function DELETE(request: Request) {
  const auth = await verifyAdmin(request)
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing service ID' }, { status: 400 })
    }

    await adminDb.collection('services').doc(id).delete()
    return NextResponse.json({ message: 'Service deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
