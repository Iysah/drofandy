import { 
  ref, 
  uploadBytes, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject,
  listAll,
  UploadTask
} from 'firebase/storage'
import { storage } from './firebase'

// Upload file to Firebase Storage
export async function uploadFile(
  file: File, 
  path: string, 
  onProgress?: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, path)
  
  if (onProgress) {
    // Use resumable upload for progress tracking
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file)
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress(progress)
        },
        (error) => {
          reject(error)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadURL)
          } catch (error) {
            reject(error)
          }
        }
      )
    })
  } else {
    // Simple upload without progress tracking
    const snapshot = await uploadBytes(storageRef, file)
    return await getDownloadURL(snapshot.ref)
  }
}

// Upload image with automatic path generation
export async function uploadImage(
  file: File, 
  folder: 'blog' | 'team' | 'projects' | 'general' = 'general',
  onProgress?: (progress: number) => void
): Promise<string> {
  // Generate unique filename
  const timestamp = Date.now()
  const extension = file.name.split('.').pop()
  const filename = `${timestamp}.${extension}`
  const path = `images/${folder}/${filename}`
  
  return uploadFile(file, path, onProgress)
}

// Upload document
export async function uploadDocument(
  file: File, 
  folder: 'reports' | 'certificates' | 'documents' = 'documents',
  onProgress?: (progress: number) => void
): Promise<string> {
  const timestamp = Date.now()
  const extension = file.name.split('.').pop()
  const filename = `${timestamp}.${extension}`
  const path = `documents/${folder}/${filename}`
  
  return uploadFile(file, path, onProgress)
}

// Delete file from Firebase Storage
export async function deleteFile(url: string): Promise<void> {
  try {
    const fileRef = ref(storage, url)
    await deleteObject(fileRef)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

// Get all files in a folder
export async function listFiles(folderPath: string): Promise<string[]> {
  const folderRef = ref(storage, folderPath)
  const result = await listAll(folderRef)
  
  const urls = await Promise.all(
    result.items.map(itemRef => getDownloadURL(itemRef))
  )
  
  return urls
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