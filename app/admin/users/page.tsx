'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { adminUsers, Role } from '@/lib/users'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import AdminNavTabs from '@/components/admin/admin-nav-tabs'
import { Users, Shield, Trash2, UserPlus, Mail, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in Required</h2>
              <p className="text-slate-500">Please sign in to manage users.</p>
            </div>
            <Link href="/admin">
              <Button className="w-full justify-center rounded-xl h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/50">
                Go to Admin Login
              </Button>
            </Link>
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
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
              <p className="text-slate-500">You do not have permission to manage users.</p>
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
        <AdminNavTabs activeTab="users" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manage Users & Roles</h1>
            <p className="text-slate-500 mt-1">Control access and permissions for the admin dashboard.</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 transition-all">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create User Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <UserPlus className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Add New User</h2>
              </div>
              
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="user@example.com" 
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      value={role} 
                      onChange={e => setRole(e.target.value as Role)} 
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm bg-white appearance-none"
                    >
                      <option value="admin">Admin</option>
                      <option value="content-manager">Content Manager</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || !email}
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/50 rounded-xl transition-all duration-200 mt-2"
                >
                  {loading ? 'Adding User...' : 'Add User'}
                </Button>
              </form>
            </Card>
          </div>

          {/* User List */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900">Existing Users</h2>
                <Badge variant="secondary" className="bg-white border border-slate-200 text-slate-600">
                  {users.length} Users
                </Badge>
              </div>
              
              {loading && users.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-slate-500">Loading users...</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {users.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">No users found</h3>
                      <p className="text-slate-500">Start by adding a new user from the form.</p>
                    </div>
                  ) : (
                    users.map(u => (
                      <div key={u.id} className="p-4 hover:bg-slate-50/80 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 font-semibold text-sm border border-indigo-200/50">
                              {u.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{u.email}</div>
                              <div className="flex items-center text-xs text-slate-500 mt-0.5">
                                <Calendar className="w-3 h-3 mr-1" />
                                Added: {u.createdAt?.toDate?.() ? u.createdAt.toDate().toLocaleDateString() : 'Unknown'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <select 
                              value={u.role} 
                              onChange={e => handleUpdateRole(u.id, e.target.value as Role)} 
                              className="text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-600 cursor-pointer hover:border-slate-300 transition-colors"
                            >
                              <option value="admin">Admin</option>
                              <option value="content-manager">Content Manager</option>
                              <option value="editor">Editor</option>
                              <option value="viewer">Viewer</option>
                            </select>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(u.id)}
                              className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
