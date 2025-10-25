import React from 'react'
import { SectionWrapper } from './section-wrapper'
import { BlogPost, blogPosts } from '@/lib/firestore'
import { motion } from 'framer-motion'
import { Calendar, Clock, Link } from 'lucide-react'
import { Card, CardContent, CardTitle } from './ui/card'

function blog() {
  return (
    <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wide mb-4">
            News
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-[var(--text)]">
            Stay updated with engineering excellence tips
          </h2>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {blogPosts.map((post: BlogPost, index: number) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={post.href} className="group block">
                <Card className="h-full overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-none hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  <CardContent className="p-6">
                    {/* Blog Title */}
                    <CardTitle className="text-xl font-bold text-[var(--text)] mb-4 group-hover:text-[var(--primary)] transition-colors leading-tight">
                      {post.title}
                    </CardTitle>
                    
                    {/* Date and Read Time */}
                    <div className="flex items-center space-x-4 text-sm text-[var(--muted)]">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
  )
}

export default blog