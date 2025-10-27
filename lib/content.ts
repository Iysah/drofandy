import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

export interface Service {
  id?: string
  title: string
  image?: string
  description: string
  rating: number
  createdAt: Timestamp
  createdBy?: string
}

export interface ProjectItem {
  id?: string
  title: string
  image: string
  createdAt: Timestamp
  createdBy?: string
}

export interface Testimonial {
  id?: string
  details: string
  clientName: string
  clientTitle?: string
  clientCompany?: string
  rating: number
  createdAt: Timestamp
  createdBy?: string
}

const servicesCol = () => collection(db, 'services')
const projectsCol = () => collection(db, 'projects')
const testimonialsCol = () => collection(db, 'testimonials')

export const content = {
  // Services
  async createService(data: Omit<Service, 'id' | 'createdAt'>) {
    const now = Timestamp.now()
    const ref = await addDoc(servicesCol(), { ...data, createdAt: now })
    return ref.id
  },

  async getServices(): Promise<Service[]> {
    const snap = await getDocs(servicesCol())
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Service))
  },

  async updateService(id: string, updates: Partial<Service>) {
    const ref = doc(db, 'services', id)
    await updateDoc(ref, updates as any)
  },

  async deleteService(id: string) {
    const ref = doc(db, 'services', id)
    await deleteDoc(ref)
  },

  // Projects
  async createProject(data: Omit<ProjectItem, 'id' | 'createdAt'>) {
    const now = Timestamp.now()
    const ref = await addDoc(projectsCol(), { ...data, createdAt: now })
    return ref.id
  },

  async getProjects(): Promise<ProjectItem[]> {
    const snap = await getDocs(projectsCol())
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as ProjectItem))
  },

  async deleteProject(id: string) {
    const ref = doc(db, 'projects', id)
    await deleteDoc(ref)
  },

  // Testimonials
  async createTestimonial(data: Omit<Testimonial, 'id' | 'createdAt'>) {
    const now = Timestamp.now()
    const ref = await addDoc(testimonialsCol(), { ...data, createdAt: now })
    return ref.id
  },

  async getTestimonials(): Promise<Testimonial[]> {
    const snap = await getDocs(testimonialsCol())
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial))
  },

  async deleteTestimonial(id: string) {
    const ref = doc(db, 'testimonials', id)
    await deleteDoc(ref)
  }
}
