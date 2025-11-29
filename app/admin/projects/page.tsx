'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { content } from '@/lib/content'
import { adminUsers } from '@/lib/users'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { uploadImage } from '@/lib/storage'
import AdminNavTabs from '@/components/admin/admin-nav-tabs'
import { FolderPlus, Image as ImageIcon, Trash2, UploadCloud, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

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

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <FolderPlus className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in Required</h2>
              <p className="text-slate-500">Please sign in to manage projects.</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
              <p className="text-slate-500">You do not have permission to manage projects.</p>
            </div>
            <Link href="/admin">
              <Button variant="outline" className="w-full justify-center rounded-xl h-11">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdminNavTabs activeTab="projects" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Project Gallery</h1>
            <p className="text-slate-500 mt-1">Showcase your portfolio and recent work.</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 transition-all">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Project Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FolderPlus className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Add New Project</h2>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Title</label>
                  <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="e.g. Modern Villa Design"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Image</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => e.target.files && handleUpload(e.target.files[0])} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {image ? (
                      <div className="relative">
                        <img src={image} className="w-full h-40 object-cover rounded-lg shadow-sm" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                          <p className="text-white text-xs font-medium">Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6">
                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2 text-indigo-600">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-slate-600 font-medium">Click to upload image</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || !title}
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/50 rounded-xl transition-all duration-200 mt-2"
                >
                  {loading ? 'Saving Project...' : 'Add Project'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900">Project Gallery</h2>
                <Badge variant="secondary" className="bg-white border border-slate-200 text-slate-600">
                  {projects.length} Projects
                </Badge>
              </div>
              
              {loading && projects.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <FolderPlus className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-slate-500">Loading projects...</p>
                </div>
              ) : (
                <div className="p-6">
                  {projects.length === 0 ? (
                    <div className="p-12 text-center border-2 border-dashed border-slate-100 rounded-xl">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">No projects yet</h3>
                      <p className="text-slate-500">Upload your first project to the gallery.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map(p => (
                        <div key={p.id} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                          <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                            <img 
                              src={p.image} 
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(p.id);
                                }}
                                className="self-end mb-auto bg-white/20 hover:bg-red-600 text-white backdrop-blur-sm border-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-slate-900 truncate" title={p.title}>{p.title}</h3>
                            <p className="text-xs text-slate-500 mt-1">Added recently</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
