// Client-side storage helpers now use Cloudinary via server API routes.

// Upload image using the server upload endpoint which forwards to Cloudinary
export async function uploadImage(
  file: File,
  folder: 'blog' | 'team' | 'projects' | 'general' = 'general',
  onProgress?: (progress: number) => void
): Promise<any> {
  const form = new FormData()
  form.append('file', file)
  form.append('folder', folder)
  form.append('resource_type', file.type.startsWith('video') ? 'video' : 'image')

  const res = await fetch('/api/media/upload', {
    method: 'POST',
    body: form
  })

  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return data.result
}

export async function uploadDocument(
  file: File,
  folder: 'reports' | 'certificates' | 'documents' = 'documents',
  onProgress?: (progress: number) => void
): Promise<any> {
  const form = new FormData()
  form.append('file', file)
  form.append('folder', folder)
  form.append('resource_type', 'raw')

  const res = await fetch('/api/media/upload', {
    method: 'POST',
    body: form
  })

  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return data.result
}

// Delete by public_id (Cloudinary)
export async function deleteFile(public_id: string, resource_type: 'image' | 'video' | 'raw' = 'image') {
  const res = await fetch('/api/media/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ public_id, resource_type })
  })

  if (!res.ok) throw new Error('Delete failed')
  return res.json()
}

// List files is best done via Firestore records; provide a thin shim that returns empty array
export async function listFiles(folderPath: string): Promise<string[]> {
  // Optionally implement a server endpoint that lists by prefix using Cloudinary Admin API
  return []
}

// Validate file type and size
export function validateFile(
  file: File, 
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp'],
  maxSizeMB: number = 5
): { valid: boolean; error?: string } {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
    }
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size too large. Maximum size: ${maxSizeMB}MB`
    }
  }
  
  return { valid: true }
}

// Resize image before upload (client-side)
export function resizeImage(
  file: File, 
  maxWidth: number = 1200, 
  maxHeight: number = 800, 
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(resizedFile)
          }
        },
        file.type,
        quality
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}