'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { content } from '@/lib/content'
import { adminUsers } from '@/lib/users'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AdminNavTabs from '@/components/admin/admin-nav-tabs'
import { MessageSquare, Star, Trash2, User, Building, Briefcase, Quote, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function AdminTestimonialsPage() {
  const { user } = useAuth()
  const [details, setDetails] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientTitle, setClientTitle] = useState('')
  const [clientCompany, setClientCompany] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [testimonials, setTestimonials] = useState<any[]>([])

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user) return
    let mounted = true
    ;(async () => {
      const ok = await adminUsers.isAdminByEmail(user.email || undefined)
      if (!mounted) return
      setIsAdmin(ok)
      if (ok) fetchTestimonials()
    })()
    return () => { mounted = false }
  }, [user])

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const list = await content.getTestimonials()
      setTestimonials(list)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    try {
      setLoading(true)
      await content.createTestimonial({ details, clientName, clientTitle, clientCompany, rating, createdBy: user.uid } as any)
      setDetails('')
      setClientName('')
      setClientTitle('')
      setClientCompany('')
      setRating(5)
      await fetchTestimonials()
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete testimonial?')) return
    await content.deleteTestimonial(id)
    setTestimonials(testimonials.filter(t => t.id !== id))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <MessageSquare className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in Required</h2>
              <p className="text-slate-500">Please sign in to manage testimonials.</p>
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
              <p className="text-slate-500">You do not have permission to manage testimonials.</p>
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
        <AdminNavTabs activeTab="testimonials" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Testimonials</h1>
            <p className="text-slate-500 mt-1">Manage client reviews and feedback.</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 transition-all">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Testimonial Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Add Testimonial</h2>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Client Feedback</label>
                  <div className="relative">
                    <Quote className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea 
                      value={details} 
                      onChange={e => setDetails(e.target.value)} 
                      placeholder="What did the client say?"
                      rows={4}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Client Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      value={clientName} 
                      onChange={e => setClientName(e.target.value)} 
                      placeholder="e.g. John Doe"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        value={clientTitle} 
                        onChange={e => setClientTitle(e.target.value)} 
                        placeholder="CEO"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        value={clientCompany} 
                        onChange={e => setClientCompany(e.target.value)} 
                        placeholder="Acme Inc"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Rating</label>
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

                <Button 
                  type="submit" 
                  disabled={loading || !details || !clientName}
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/50 rounded-xl transition-all duration-200 mt-2"
                >
                  {loading ? 'Saving...' : 'Add Testimonial'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Testimonials List */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900">Existing Testimonials</h2>
                <Badge variant="secondary" className="bg-white border border-slate-200 text-slate-600">
                  {testimonials.length} Reviews
                </Badge>
              </div>
              
              {loading && testimonials.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <MessageSquare className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-slate-500">Loading testimonials...</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {testimonials.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">No testimonials yet</h3>
                      <p className="text-slate-500">Add your first client testimonial.</p>
                    </div>
                  ) : (
                    testimonials.map(t => (
                      <div key={t.id} className="p-6 hover:bg-slate-50/80 transition-colors group">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                            {t.clientName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-slate-900">{t.clientName}</h3>
                                <p className="text-xs text-slate-500">
                                  {t.clientTitle} {t.clientTitle && t.clientCompany && '@'} {t.clientCompany}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex text-amber-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-current' : 'text-slate-200'}`} />
                                  ))}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDelete(t.id)}
                                  className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-3 relative">
                              <Quote className="absolute -left-2 -top-2 w-6 h-6 text-slate-100 -z-10 transform -scale-x-100" />
                              <p className="text-slate-600 text-sm leading-relaxed italic">"{t.details}"</p>
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
