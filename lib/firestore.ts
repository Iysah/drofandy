import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { db } from './firebase'

// Blog Post Types
export interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorId: string
  category: string
  tags: string[]
  featuredImage?: string
  published: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Contact Form Types
export interface ContactForm {
  id?: string
  name: string
  email: string
  company?: string
  phone?: string
  service: string
  message: string
  status: 'new' | 'contacted' | 'closed'
  createdAt: Timestamp
}

// Blog Post Operations
export const blogPosts = {
  // Create a new blog post
  async create(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, 'blogPosts'), {
      ...post,
      createdAt: now,
      updatedAt: now
    })
    return docRef.id
  },

  // Get a single blog post by ID
  async getById(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, 'blogPosts', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BlogPost
    }
    return null
  },

  // Get a blog post by slug
  async getBySlug(slug: string): Promise<BlogPost | null> {
    const q = query(
      collection(db, 'blogPosts'), 
      where('slug', '==', slug),
      where('published', '==', true),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() } as BlogPost
    }
    return null
  },

  // Get published blog posts with pagination
  async getPublished(pageSize: number = 10, lastDoc?: QueryDocumentSnapshot<DocumentData>) {
    let q = query(
      collection(db, 'blogPosts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )

    if (lastDoc) {
      q = query(q, startAfter(lastDoc))
    }

    const querySnapshot = await getDocs(q)
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[]

    return {
      posts,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
      hasMore: querySnapshot.docs.length === pageSize
    }
  },

  // Get posts by category
  async getByCategory(category: string, pageSize: number = 10) {
    const q = query(
      collection(db, 'blogPosts'),
      where('category', '==', category),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[]
  },

  // Update a blog post
  async update(id: string, updates: Partial<BlogPost>) {
    const docRef = doc(db, 'blogPosts', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    })
  },

  // Delete a blog post
  async delete(id: string) {
    const docRef = doc(db, 'blogPosts', id)
    await deleteDoc(docRef)
  },

  // Get all posts for admin (including unpublished)
  async getAll() {
    const q = query(
      collection(db, 'blogPosts'),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[]
  }
}

// Contact Form Operations
export const contactForms = {
  // Submit a new contact form
  async submit(form: Omit<ContactForm, 'id' | 'status' | 'createdAt'>) {
    const docRef = await addDoc(collection(db, 'contactForms'), {
      ...form,
      status: 'new' as const,
      createdAt: Timestamp.now()
    })
    return docRef.id
  },

  // Get all contact forms for admin
  async getAll() {
    const q = query(
      collection(db, 'contactForms'),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ContactForm[]
  },

  // Update contact form status
  async updateStatus(id: string, status: ContactForm['status']) {
    const docRef = doc(db, 'contactForms', id)
    await updateDoc(docRef, { status })
  },

  // Get contact form by ID
  async getById(id: string): Promise<ContactForm | null> {
    const docRef = doc(db, 'contactForms', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ContactForm
    }
    return null
  }
}

// Utility function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}