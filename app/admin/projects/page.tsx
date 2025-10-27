'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { content } from '@/lib/content'
import { adminUsers } from '@/lib/users'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { uploadImage } from '@/lib/storage'

export default function AdminProjectsPage() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState<any[]>([])

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user) return
    let mounted = true
    ;(async () => {
      const ok = await adminUsers.isAdminByEmail(user.email || undefined)
      if (!mounted) return
      setIsAdmin(ok)
      if (ok) fetchProjects()
    })()
    return () => { mounted = false }
  }, [user])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const list = await content.getProjects()
      setProjects(list)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleUpload = async (file: File) => {
    try {
      setLoading(true)
      const res: any = await uploadImage(file, 'general')
      const url = res?.result?.secure_url || res?.result?.url
      const mediaId = res?.mediaId
      setImage(url)
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
  await content.createProject({ title, image: image || '', mediaId, createdBy: user.uid } as any)
      setTitle('')
      setImage(undefined)
      await fetchProjects()
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete project?')) return
    await content.deleteProject(id)
    setProjects(projects.filter(p => p.id !== id))
  }

  if (!user) return <div className="p-8">Please sign in to manage projects.</div>
  if (isAdmin === false) return <div className="p-8">You are not authorized to manage projects.</div>

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Gallery</h1>
      </div>

      <Card className="p-6 mb-6">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input type="file" accept="image/*" onChange={e => e.target.files && handleUpload(e.target.files[0])} />
            {image && <img src={image} className="mt-2 w-48 h-32 object-cover rounded" />}
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Add Project'}</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Projects</h2>
        {loading ? <p>Loading…</p> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map(p => (
              <div key={p.id} className="border rounded p-2">
                <img src={p.image} className="w-full h-36 object-cover rounded" />
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-medium">{p.title}</div>
                  <Button variant="outline" onClick={() => handleDelete(p.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
