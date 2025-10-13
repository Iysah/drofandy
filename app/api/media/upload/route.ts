import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as any
    const folder = (formData.get('folder') as string) || 'general'
    const resource_type = (formData.get('resource_type') as string) || 'image'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Read the file stream
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: `drofandy/${folder}`, resource_type },
        (error: any, result: any) => {
          if (error) return reject(error)
          resolve(result)
        }
      ).end(buffer)
    })

    // Save metadata to Firestore
    try {
      const mediaCollection = collection(db, 'media')
      const mediaDoc = await addDoc(mediaCollection, {
        public_id: (uploadResult as any).public_id,
        secure_url: (uploadResult as any).secure_url || (uploadResult as any).url,
        resource_type,
        folder,
        bytes: (uploadResult as any).bytes,
        format: (uploadResult as any).format,
        width: (uploadResult as any).width,
        height: (uploadResult as any).height,
        createdAt: serverTimestamp(),
        raw_response: uploadResult
      })

      return NextResponse.json({ result: uploadResult, mediaId: mediaDoc.id })
    } catch (dbError: any) {
      console.error('Firestore save error', dbError)
      // Still return the upload result (client can retry saving metadata later)
      return NextResponse.json({ result: uploadResult, error: 'Failed to save metadata' }, { status: 200 })
    }
  } catch (error: any) {
    console.error('Upload error', error)
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 })
  }
}
