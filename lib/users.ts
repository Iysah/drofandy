import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
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
  }
}
