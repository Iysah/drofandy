'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { content } from '@/lib/content'
import { adminUsers } from '@/lib/users'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { uploadImage } from '@/lib/storage'
import AdminNavTabs from '@/components/admin/admin-nav-tabs'

export default function AdminServicesPage() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(5)
  const [image, setImage] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<any[]>([])

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user) return
    let mounted = true
    ;(async () => {
      const ok = await adminUsers.isAdminByEmail(user.email || undefined)
      if (!mounted) return
      setIsAdmin(ok)
      if (ok) fetchServices()
    })()
    return () => { mounted = false }
  }, [user])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const list = await content.getServices()
      setServices(list)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleUpload = async (file: File) => {
    try {
      setLoading(true)
      const res: any = await uploadImage(file, 'general')
      // server returns { result, mediaId }
      const url = res?.result?.secure_url || res?.result?.url
      const mediaId = res?.mediaId
      setImage(url)
      // store mediaId temporarily on window for create time
      ;(window as any).__uploaded_media_id = mediaId
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    try {
      setLoading(true)
  const mediaId = (window as any).__uploaded_media_id || null
  await content.createService({ title, image, mediaId, description, rating, createdBy: user.uid } as any)
      setTitle('')
      setDescription('')
      setRating(5)
      setImage(undefined)
      await fetchServices()
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete service?')) return
    await content.deleteService(id)
    setServices(services.filter(s => s.id !== id))
  }

  if (!user) return <div className="p-8">Please sign in to manage services.</div>
  if (isAdmin === false) return <div className="p-8">You are not authorized to manage services.</div>

  return (
    <div className="max-w-4xl mx-auto py-10">
      <AdminNavTabs />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
      </div>

      <Card className="p-6 mb-6">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="px-3 py-2 border rounded-md">
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input type="file" accept="image/*" onChange={e => e.target.files && handleUpload(e.target.files[0])} />
            {image && <img src={image} className="mt-2 w-32 h-20 object-cover rounded" />}
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Create Service'}</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Existing Services</h2>
        {loading ? <p>Loading…</p> : (
          <div className="space-y-4">
            {services.map(s => (
              <div key={s.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-slate-500">{s.description}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm">{s.rating}★</div>
                  <Button variant="outline" onClick={() => handleDelete(s.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
