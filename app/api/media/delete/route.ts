import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { public_id, resource_type = 'image' } = body as any

    if (!public_id) {
      return NextResponse.json({ error: 'public_id is required' }, { status: 400 })
    }

    const result = await cloudinary.uploader.destroy(public_id, { resource_type })
    return NextResponse.json({ result })
  } catch (error: any) {
    console.error('Delete error', error)
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 })
  }
}
