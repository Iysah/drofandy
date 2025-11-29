'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context';
import { adminUsers } from '@/lib/users'
import { blogPosts, contactForms, BlogPost, ContactForm } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  Users, 
  BarChart3,
  Settings,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import AdminNavTabs from '@/components/admin/admin-nav-tabs'

export default function AdminDashboard() {
  // Handle auth context safely during build/pre-rendering
  let user = null;
  let signOut = async () => {};
  let authLoading = true;
  
  try {
    const authContext = useAuth();
    user = authContext.user;
    console.log(user);
    signOut = authContext.signOut;
    authLoading = authContext.loading;
  } catch (error) {
    // During build/pre-rendering, auth context might not be available
    console.log('Auth context not available during build');
  }

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'contacts' | 'settings' | 'users' | 'services' | 'projects' | 'testimonials'>('overview');
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user) return
    let mounted = true
    ;(async () => {
      const ok = await adminUsers.isAdminByEmail(user.email || undefined)
      if (!mounted) return
      setIsAdmin(ok)
      if (ok) loadData()
    })()
    return () => { mounted = false }
  }, [user])

  const loadData = async () => {
    try {
      setLoading(true);
      const [postsData, contactsData] = await Promise.all([
        blogPosts.getAll(),
        contactForms.getAll()
      ]);
      setPosts(postsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await blogPosts.delete(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleUpdateContactStatus = async (id: string, status: ContactForm['status']) => {
    try {
      await contactForms.updateStatus(id, status);
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
              <Settings className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Loading...</h1>
              <p className="text-slate-500">Checking authentication status...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <Settings className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access Required</h1>
              <p className="text-slate-500">Please sign in to access the admin dashboard.</p>
            </div>
            <EmailPasswordSignIn />
          </div>
        </Card>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <Settings className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Not authorized</h1>
              <p className="text-slate-500">You do not have permission to access the admin dashboard.</p>
            </div>
            <Link href="/">
              <Button className="w-full justify-center rounded-xl h-11" variant="outline">Go to home</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }


function EmailPasswordSignIn() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
    } catch (err: any) {
      console.error('Sign in error', err)
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-md placeholder-slate-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-md placeholder-slate-400 focus:outline-none"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl shadow-lg shadow-indigo-200/50 transition-all duration-200" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.published).length,
    draftPosts: posts.filter(p => !p.published).length,
    totalContacts: contacts.length,
    newContacts: contacts.filter(c => c.status === 'new').length,
    inProgressContacts: contacts.filter(c => c.status === 'contacted').length
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <img 
                  src="/drofandy-logo.jpeg" 
                  alt="Drofandy Logo" 
                  className="h-8 w-auto rounded"
                />
                <span className="hidden font-bold text-lg sm:inline-block text-slate-900 tracking-tight">
                   <span className="text-indigo-600">Admin Dashboard</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-900">{user.displayName}</span>
                <span className="text-xs text-slate-500">Administrator</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="flex items-center space-x-2 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdminNavTabs activeTab={activeTab} onChangeTab={(id) => setActiveTab(id as any)} />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Posts</p>
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.totalPosts}</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Published</p>
                    <p className="text-3xl font-bold text-emerald-600 tracking-tight">{stats.publishedPosts}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                    <Eye className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Contact Forms</p>
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.totalContacts}</p>
                  </div>
                  <div className="p-3 bg-violet-50 rounded-xl group-hover:bg-violet-100 transition-colors">
                    <MessageSquare className="w-6 h-6 text-violet-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">New Inquiries</p>
                    <p className="text-3xl font-bold text-amber-600 tracking-tight">{stats.newContacts}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/posts/new">
                  <Button className="w-full h-auto py-6 justify-start text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200/50 transition-all duration-200 group">
                    <div className="bg-white/20 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                      <PlusCircle className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg">Create New Post</div>
                      <div className="text-indigo-100 text-xs font-normal">Write a new blog entry</div>
                    </div>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 justify-start bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl transition-all duration-200 group"
                  onClick={() => setActiveTab('contacts')}
                >
                  <div className="bg-slate-100 p-2 rounded-lg mr-4 group-hover:bg-slate-200 transition-colors">
                    <MessageSquare className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg text-slate-900">Review Contacts</div>
                    <div className="text-slate-500 text-xs font-normal">Check new messages</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 justify-start bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl transition-all duration-200 group"
                  onClick={() => setActiveTab('posts')}
                >
                  <div className="bg-slate-100 p-2 rounded-lg mr-4 group-hover:bg-slate-200 transition-colors">
                    <FileText className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg text-slate-900">Manage Posts</div>
                    <div className="text-slate-500 text-xs font-normal">Edit or delete content</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900">Recent Posts</h3>
                  <Link href="#" onClick={() => setActiveTab('posts')} className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View All</Link>
                </div>
                <div className="divide-y divide-slate-100 flex-1">
                  {posts.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-slate-500 font-medium">No posts yet</p>
                      <p className="text-slate-400 text-sm mt-1">Create your first blog post to get started.</p>
                    </div>
                  ) : (
                    posts.slice(0, 5).map((post) => (
                      <div key={post.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 line-clamp-1">{post.title}</p>
                            <p className="text-xs text-slate-500 flex items-center mt-0.5">
                              <Calendar className="w-3 h-3 mr-1" />
                              {post.createdAt.toDate().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0" : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-0"}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900">Recent Contacts</h3>
                  <Link href="#" onClick={() => setActiveTab('contacts')} className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View All</Link>
                </div>
                <div className="divide-y divide-slate-100 flex-1">
                  {contacts.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MessageSquare className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-slate-500 font-medium">No inquiries yet</p>
                      <p className="text-slate-400 text-sm mt-1">New contact forms will appear here.</p>
                    </div>
                  ) : (
                    contacts.slice(0, 5).map((contact) => (
                      <div key={contact.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{contact.name}</p>
                            <p className="text-xs text-slate-500 flex items-center mt-0.5">
                              <span className="truncate max-w-[150px]">{contact.service}</span>
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            contact.status === 'new' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-0' :
                            contact.status === 'contacted' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-0' : 
                            'bg-slate-100 text-slate-600 hover:bg-slate-200 border-0'
                          }
                        >
                          {contact.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Blog Posts</h2>
              <Link href="/admin/posts/new">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200/50 rounded-xl">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>

            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-slate-900">{post.title}</div>
                            <div className="text-sm text-slate-500">{post.excerpt.substring(0, 60)}...</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {post.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {post.createdAt.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link href={`/blog/${post.slug}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/posts/${post.id}/edit`}>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => post.id && handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-slate-900">Contact Forms</h2>

            <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-slate-900">{contact.name}</div>
                            <div className="text-sm text-slate-500">{contact.email}</div>
                            {contact.company && (
                              <div className="text-sm text-slate-500">{contact.company}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {contact.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={contact.status}
                            onChange={(e) => contact.id && handleUpdateContactStatus(contact.id, e.target.value as ContactForm['status'])}
                            className="text-sm border border-slate-300 rounded-md px-2 py-1"
                          >
                            <option value="new">New</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {contact.createdAt.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              alert(`Message: ${contact.message}\n\nPhone: ${contact.phone}`);
                            }}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Name</label>
                    <p className="mt-1 text-sm text-slate-900">{user.displayName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <p className="mt-1 text-sm text-slate-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Role</label>
                    <p className="mt-1 text-sm text-slate-900">Administrator</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">System Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Total Blog Posts</label>
                    <p className="mt-1 text-sm text-slate-900">{stats.totalPosts}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Total Contact Forms</label>
                    <p className="mt-1 text-sm text-slate-900">{stats.totalContacts}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Last Updated</label>
                    <p className="mt-1 text-sm text-slate-900">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}