'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { content } from '@/lib/content'
import { adminUsers } from '@/lib/users'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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

  if (!user) return <div className="p-8">Please sign in to manage testimonials.</div>
  if (isAdmin === false) return <div className="p-8">You are not authorized to manage testimonials.</div>

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
      </div>

      <Card className="p-6 mb-6">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Testimonial</label>
            <textarea value={details} onChange={e => setDetails(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client name</label>
              <input value={clientName} onChange={e => setClientName(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title / Position</label>
              <input value={clientTitle} onChange={e => setClientTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input value={clientCompany} onChange={e => setClientCompany(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="px-3 py-2 border rounded-md">
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Add Testimonial'}</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Existing Testimonials</h2>
        {loading ? <p>Loading…</p> : (
          <div className="space-y-4">
            {testimonials.map(t => (
              <div key={t.id} className="border rounded p-4">
                <div className="font-medium">{t.clientName} — <span className="text-sm text-slate-500">{t.clientTitle} @ {t.clientCompany}</span></div>
                <div className="mt-2 text-sm">{t.details}</div>
                <div className="mt-2">Rating: {t.rating}★</div>
                <div className="mt-2"><Button variant="outline" onClick={() => handleDelete(t.id)}>Delete</Button></div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
