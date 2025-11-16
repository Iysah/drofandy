'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { adminUsers, Role } from '@/lib/users'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import AdminNavTabs from '@/components/admin/admin-nav-tabs'

export default function AdminUsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('content-manager')
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user) return
    let mounted = true
    ;(async () => {
      const ok = await adminUsers.isAdminByEmail(user.email || undefined)
      if (!mounted) return
      setIsAdmin(ok)
      if (ok) fetchUsers()
    })()
    return () => { mounted = false }
  }, [user])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const list = await adminUsers.getAll()
      setUsers(list)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const id = await adminUsers.create(email, role, user?.uid)
      setEmail('')
      await fetchUsers()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user role?')) return
    try {
      await adminUsers.delete(id)
      setUsers(users.filter(u => u.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateRole = async (id: string, newRole: Role) => {
    try {
      await adminUsers.updateRole(id, newRole)
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u))
    } catch (err) {
      console.error(err)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <h2 className="text-xl font-semibold">Sign in to manage users</h2>
          <Link href="/admin">Go to admin</Link>
        </Card>
      </div>
    )
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <h2 className="text-xl font-semibold">Not authorized</h2>
          <p className="text-sm text-slate-600">You do not have permission to manage users.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <AdminNavTabs />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Users & Roles</h1>
        <Link href="/admin">Back to admin</Link>
      </div>

      <Card className="p-6 mb-6">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="user@example.com" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select value={role} onChange={e => setRole(e.target.value as Role)} className="w-full px-3 py-2 border rounded-md">
              <option value="admin">Admin</option>
              <option value="content-manager">Content Manager</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Existing Roles</h2>
        {loading ? <p>Loading…</p> : (
          <div className="space-y-3">
            {users.length === 0 && <p className="text-sm text-slate-500">No users configured.</p>}
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{u.email}</div>
                  <div className="text-sm text-slate-500">Added: {u.createdAt?.toDate?.() ? u.createdAt.toDate().toLocaleString() : '—'}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <select value={u.role} onChange={e => handleUpdateRole(u.id, e.target.value as Role)} className="px-2 py-1 border rounded-md">
                    <option value="admin">Admin</option>
                    <option value="content-manager">Content Manager</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <Button variant="outline" onClick={() => handleDelete(u.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
