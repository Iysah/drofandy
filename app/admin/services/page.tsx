'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { content } from '@/lib/content'
import { adminUsers } from '@/lib/users'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { uploadImage } from '@/lib/storage'
import AdminNavTabs from '@/components/admin/admin-nav-tabs'
import { Briefcase, Star, Trash2, PlusCircle, Image as ImageIcon, UploadCloud, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { toast } from 'sonner'

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
      const token = await user.getIdToken()
      const res = await fetch('/api/services/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, image, mediaId, description, rating })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to create service')
      }
      
      toast.success(`Success! Service '${title}' has been successfully created.`)
      setTitle('')
      setDescription('')
      setRating(5)
      setImage(undefined)
      await fetchServices()
    } catch (err: any) { 
        console.error(err) 
        toast.error(`Error: Failed to create Service. Reason: ${err.message}`)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string, serviceTitle: string) => {
    if (!confirm('Delete service?')) return
    try {
        if (!user) return
        const token = await user.getIdToken()
        const res = await fetch(`/api/services?id=${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
        
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error || 'Failed to delete service')
        }

        toast.success(`Success! Service '${serviceTitle}' has been successfully deleted.`)
        setServices(services.filter(s => s.id !== id))
    } catch (err: any) {
        console.error(err);
        toast.error(`Error: Failed to delete Service. Reason: ${err.message}`)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in Required</h2>
              <p className="text-slate-500">Please sign in to manage services.</p>
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
              <p className="text-slate-500">You do not have permission to manage services.</p>
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
        <AdminNavTabs activeTab="services" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Services</h1>
            <p className="text-slate-500 mt-1">Manage the services offered on your platform.</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 transition-all">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Service Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <PlusCircle className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Add New Service</h2>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Title</label>
                  <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="e.g. Web Development"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Brief description of the service..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Rating (Stars)</label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 fill-amber-400" />
                    <select 
                      value={rating} 
                      onChange={e => setRating(Number(e.target.value))} 
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm bg-white appearance-none"
                    >
                      {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Image</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => e.target.files && handleUpload(e.target.files[0])} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {image ? (
                      <div className="relative">
                        <img src={image} className="w-full h-32 object-cover rounded-lg shadow-sm" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                          <p className="text-white text-xs font-medium">Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4">
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
                  {loading ? 'Saving Service...' : 'Create Service'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Services List */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900">Existing Services</h2>
                <Badge variant="secondary" className="bg-white border border-slate-200 text-slate-600">
                  {services.length} Services
                </Badge>
              </div>
              
              {loading && services.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-slate-500">Loading services...</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {services.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">No services found</h3>
                      <p className="text-slate-500">Add your first service using the form.</p>
                    </div>
                  ) : (
                    services.map(s => (
                      <div key={s.id} className="p-4 hover:bg-slate-50/80 transition-colors group">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                            {s.image ? (
                              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <ImageIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-slate-900 truncate">{s.title}</h3>
                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{s.description}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDelete(s.id, s.title)}
                                className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex items-center mt-2">
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3.5 h-3.5 ${i < s.rating ? 'fill-current' : 'text-slate-200'}`} />
                                ))}
                              </div>
                              <span className="text-xs text-slate-400 ml-2">({s.rating}/5)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
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
