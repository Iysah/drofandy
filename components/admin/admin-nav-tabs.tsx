"use client"

import { usePathname, useRouter } from 'next/navigation'
import { BarChart3, FileText, MessageSquare, Users, PlusCircle, Settings } from 'lucide-react'

export default function AdminNavTabs({ activeTab, onChangeTab }: { activeTab?: string; onChangeTab?: (id: string) => void }) {
  const router = useRouter()
  const pathname = usePathname()

  const items = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'posts', label: 'Blog Posts', icon: FileText },
    { id: 'contacts', label: 'Contact Forms', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'services', label: 'Services', icon: FileText },
    { id: 'projects', label: 'Projects', icon: PlusCircle },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const isActive = (id: string) => {
    if (['users', 'services', 'projects', 'testimonials'].includes(id)) {
      return pathname === `/admin/${id}`
    }
    if (pathname === '/admin') {
      const t = activeTab || 'overview'
      if (id === 'overview') return t === 'overview'
      return t === id
    }
    return false
  }

  const handleClick = (id: string) => {
    if (['users', 'services', 'projects', 'testimonials'].includes(id)) {
      router.push(`/admin/${id}`)
      return
    }
    if (pathname === '/admin' && onChangeTab) {
      onChangeTab(id)
      return
    }
    router.push('/admin')
  }

  return (
    <div className="flex flex-wrap gap-1 bg-slate-100/80 p-1.5 rounded-xl mb-8 w-fit backdrop-blur-sm border border-slate-200/50">
      {items.map((tab) => {
        const Icon = tab.icon
        const active = isActive(tab.id)
        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              active 
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}