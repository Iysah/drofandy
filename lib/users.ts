import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  updateDoc,
  doc,
  deleteDoc,
  limit,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

export type Role = 'admin' | 'content-manager' | 'editor' | 'viewer'

export interface AdminUser {
  id?: string
  email: string
  role: Role
  createdAt: Timestamp
  createdBy?: string
}

const usersCol = () => collection(db, 'users')

export const adminUsers = {
  async create(email: string, role: Role, createdBy?: string) {
    const now = Timestamp.now()
    const docRef = await addDoc(usersCol(), {
      email,
      role,
      createdAt: now,
      createdBy: createdBy || null
    })
    return docRef.id
  },

  async getAll(): Promise<AdminUser[]> {
    const q = query(usersCol(), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as AdminUser))
  },

  async updateRole(id: string, role: Role) {
    const ref = doc(db, 'users', id)
    await updateDoc(ref, { role })
  },

  async delete(id: string) {
    const ref = doc(db, 'users', id)
    await deleteDoc(ref)
  },

  async getByEmail(email: string) {
    const q = query(usersCol(), where('email', '==', email), limit(1))
    const snap = await getDocs(q)
    if (snap.empty) return null
    const d = snap.docs[0]
    return { id: d.id, ...d.data() } as AdminUser
  },

  async isAdminByEmail(email?: string) {
    if (!email) return false
    try {
      const user = await adminUsers.getByEmail(email)
      return !!(user && user.role === 'admin')
    } catch (err) {
      console.error('isAdminByEmail error', err)
      return false
    }
  }
}
