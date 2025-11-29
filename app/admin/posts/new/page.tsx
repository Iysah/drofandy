'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { adminUsers } from '@/lib/users'
import { blogPosts } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload,
  Plus,
  X,
  Calendar,
  Clock,
  Tag,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { uploadImage, deleteFile } from '@/lib/storage'
import AdminNavTabs from '@/components/admin/admin-nav-tabs'

interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  featuredImage?: string;
}

const categories = [
  'NDT Testing',
  'Environmental Engineering',
  'Academic Research',
  'Industry Insights',
  'Technology Updates',
  'Case Studies',
  'Best Practices',
  'Regulations & Standards'
];

export default function NewBlogPost() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [featuredUploading, setFeaturedUploading] = useState(false)
  const [form, setForm] = useState<BlogPostForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: categories[0],
    tags: [],
    published: false
  });

  useEffect(() => {
    if (!user) return
    let mounted = true
    ;(async () => {
      const ok = await adminUsers.isAdminByEmail(user.email || undefined)
      if (!mounted) return
      setIsAdmin(ok)
    })()
    return () => { mounted = false }
  }, [user])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const postData = {
         ...form,
         published: publish,
         author: user.displayName || user.email || 'Admin',
         authorId: user.uid,
         // Add required fields from BlogPost interface
         href: `/blog/${form.slug}`,
         image: form.featuredImage || '',  // Use featured image or empty string
         date: new Date().toISOString(),
         readTime: `${calculateReadingTime(form.content)} min read`
      };     
      await blogPosts.create(postData);
      router.push('/admin?tab=posts');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in Required</h2>
              <p className="text-slate-500">Please sign in to create blog posts.</p>
            </div>
            <Link href="/admin">
              <Button className="w-full justify-center rounded-xl h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/50">
                Go to Admin Login
              </Button>
            </Link>
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
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
              <p className="text-slate-500">You do not have permission to create blog posts.</p>
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
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="h-6 w-px bg-slate-200"></div>
              <h1 className="text-xl font-bold text-slate-900">Create New Blog Post</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading || !form.title || !form.content}
                className="rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading || !form.title || !form.content || !form.excerpt}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/50 transition-all duration-200"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Publish Post
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter an engaging title..."
                    className="w-full px-4 py-3 text-lg font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL Slug
                  </label>
                  <div className="flex items-center">
                    <span className="text-slate-400 text-sm mr-2 bg-slate-50 px-2 py-2 rounded-l-xl border border-r-0 border-slate-200">/blog/</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-friendly-slug"
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Excerpt <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the blog post for SEO and previews..."
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                    required
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs ${form.excerpt.length > 200 ? 'text-red-500' : 'text-slate-400'}`}>
                      {form.excerpt.length}/200 characters
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={form.content}
                      onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your masterpiece here..."
                      rows={20}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono text-sm leading-relaxed"
                      required
                    />
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md border border-slate-100 text-xs text-slate-500 shadow-sm">
                      {form.content.split(/\s+/).filter(word => word.length > 0).length} words • ~{calculateReadingTime(form.content)} min read
                    </div>
                  </div>
                </div>

                {/* Featured Image / Video */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Featured Media
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative group">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        try {
                          setFeaturedUploading(true)
                          const res: any = await uploadImage(file, 'blog')
                          const url = res?.secure_url || res?.url
                          const public_id = res?.public_id
                          if (url) {
                            setForm(prev => ({ ...prev, featuredImage: url }))
                            ;(window as any).__featured_public_id = public_id
                          }
                        } catch (err) {
                          console.error('Upload failed', err)
                          alert('Upload failed. See console for details.')
                        } finally {
                          setFeaturedUploading(false)
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {featuredUploading ? (
                      <div className="py-8">
                        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <span className="text-sm text-slate-500">Uploading media...</span>
                      </div>
                    ) : form.featuredImage ? (
                      <div className="relative z-20">
                        {form.featuredImage.includes('/video') || form.featuredImage.endsWith('.mp4') ? (
                          <video src={form.featuredImage} controls className="w-full rounded-lg shadow-sm" />
                        ) : (
                          <img src={form.featuredImage} alt="Featured" className="w-full rounded-lg shadow-sm" />
                        )}
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={async (e) => {
                              e.stopPropagation(); // Prevent triggering file input
                              const public_id = (window as any).__featured_public_id
                              if (!public_id) {
                                setForm(prev => ({ ...prev, featuredImage: undefined }))
                                return
                              }
                              try {
                                await deleteFile(public_id, form.featuredImage?.includes('video') ? 'video' : 'image')
                                setForm(prev => ({ ...prev, featuredImage: undefined }))
                                delete (window as any).__featured_public_id
                              } catch (err) {
                                console.error('Delete failed', err)
                                alert('Failed to delete asset. See console for details.')
                              }
                            }}
                            className="bg-white/90 hover:bg-red-600 text-red-600 hover:text-white border-0 shadow-sm backdrop-blur-sm"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Click to replace</p>
                      </div>
                    ) : (
                      <div className="py-8">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-slate-900 font-medium">Click to upload image or video</p>
                        <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or MP4</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                Post Settings
              </h3>
              
              <div className="space-y-5">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm bg-white appearance-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags
                  </label>
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTag}
                      className="rounded-xl border-slate-200"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center space-x-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-2 py-1 rounded-lg"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {form.tags.length === 0 && (
                      <span className="text-xs text-slate-400 italic">No tags added yet</span>
                    )}
                  </div>
                </div>

                {/* Publication Status */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${form.published ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white'}`}>
                      {form.published && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm(prev => ({ ...prev, published: e.target.checked }))}
                      className="hidden"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                      Publish immediately
                    </span>
                  </label>
                </div>
              </div>
            </Card>

            {/* Post Preview */}
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-indigo-600" />
                Live Preview
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider mb-2 bg-white border-slate-200 text-slate-500">
                    {form.category}
                  </Badge>
                  <h4 className="font-bold text-slate-900 line-clamp-2 mb-2">
                    {form.title || 'Your Post Title'}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                    {form.excerpt || 'The post excerpt will appear here. Make it catchy to attract readers!'}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-[10px] text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{calculateReadingTime(form.content)} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Help */}
            <Card className="p-6 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-2xl shadow-lg shadow-indigo-200">
              <h3 className="text-lg font-semibold mb-3">Pro Tips</h3>
              <ul className="text-sm space-y-2 text-indigo-100">
                <li className="flex items-start"><span className="mr-2">•</span> Use clear, descriptive titles</li>
                <li className="flex items-start"><span className="mr-2">•</span> Write compelling excerpts</li>
                <li className="flex items-start"><span className="mr-2">•</span> Include relevant tags</li>
                <li className="flex items-start"><span className="mr-2">•</span> Aim for 800-2000 words</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}