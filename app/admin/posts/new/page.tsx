'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
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
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { uploadImage, deleteFile } from '@/lib/storage'

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
        readingTime: calculateReadingTime(form.content),
        publishedAt: new Date(),
        createdAt: new Date()
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Access Denied</h1>
            <p className="text-slate-600 mb-6">You need to be signed in to create blog posts.</p>
            <Link href="/admin">
              <Button>Go to Admin</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-slate-900">Create New Blog Post</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading || !form.title || !form.content}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading || !form.title || !form.content || !form.excerpt}
              >
                <Eye className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog post title..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-friendly-slug"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    URL: /blog/{form.slug || 'your-post-slug'}
                  </p>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the blog post..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {form.excerpt.length}/200 characters
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your blog post content here..."
                    rows={20}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {form.content.split(/\s+/).filter(word => word.length > 0).length} words • 
                    ~{calculateReadingTime(form.content)} min read
                  </p>
                </div>

                {/* Featured Image / Video */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Featured image / video
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        try {
                          setFeaturedUploading(true)
                          const res: any = await uploadImage(file, 'blog')
                          // Cloudinary returns secure_url and public_id
                          const url = res?.secure_url || res?.url
                          const public_id = res?.public_id
                          if (url) {
                            setForm(prev => ({ ...prev, featuredImage: url }))
                            // store public_id on window for potential deletes (optional)
                            ;(window as any).__featured_public_id = public_id
                          }
                        } catch (err) {
                          console.error('Upload failed', err)
                          alert('Upload failed. See console for details.')
                        } finally {
                          setFeaturedUploading(false)
                        }
                      }}
                    />
                    {featuredUploading ? (
                      <span className="text-sm text-slate-500">Uploading…</span>
                    ) : (
                      <span className="text-sm text-slate-500">Select an image or video to upload to Cloudinary</span>
                    )}
                  </div>

                  {form.featuredImage && (
                    <div className="mt-3">
                      <div className="w-full max-w-sm">
                        {form.featuredImage.includes('/video') || form.featuredImage.endsWith('.mp4') ? (
                          <video src={form.featuredImage} controls className="w-full rounded-md" />
                        ) : (
                          <img src={form.featuredImage} alt="Featured" className="w-full rounded-md" />
                        )}
                        <div className="flex items-center mt-2 space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              const public_id = (window as any).__featured_public_id
                              if (!public_id) {
                                // simply remove url if we don't have public_id
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
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Post Settings
              </h3>
              
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTag}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Publication Status */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm(prev => ({ ...prev, published: e.target.checked }))}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Publish immediately
                    </span>
                  </label>
                </div>
              </div>
            </Card>

            {/* Post Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Preview
              </h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-slate-900 line-clamp-2">
                    {form.title || 'Blog Post Title'}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-3">
                    {form.excerpt || 'Blog post excerpt will appear here...'}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{calculateReadingTime(form.content)} min read</span>
                  </div>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {form.category}
                </Badge>
              </div>
            </Card>

            {/* Help */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Writing Tips</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Use clear, descriptive titles</li>
                <li>• Write compelling excerpts for better engagement</li>
                <li>• Include relevant tags for discoverability</li>
                <li>• Break up content with headings and lists</li>
                <li>• Aim for 800-2000 words for optimal SEO</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}