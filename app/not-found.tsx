'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Wrench, 
  Zap, 
  AlertTriangle,
  Code,
  Cpu,
  Database,
  Network,
  Settings,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [errorCode, setErrorCode] = useState('404');
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const engineeringIcons = [
    { icon: Wrench, delay: 0.1 },
    { icon: Zap, delay: 0.2 },
    { icon: Code, delay: 0.3 },
    { icon: Cpu, delay: 0.4 },
    { icon: Database, delay: 0.5 },
    { icon: Network, delay: 0.6 },
    { icon: Settings, delay: 0.7 }
  ];

  const suggestions = [
    {
      title: "Engineering Services",
      description: "Explore our comprehensive engineering solutions",
      href: "/",
      icon: Wrench,
      category: "Services"
    },
    {
      title: "About Our Team",
      description: "Meet our experienced engineering professionals",
      href: "/about",
      icon: Code,
      category: "Company"
    },
    {
      title: "Technical Blog",
      description: "Read insights and case studies from our projects",
      href: "/blog",
      icon: Database,
      category: "Resources"
    },
    {
      title: "Contact Us",
      description: "Get in touch for your engineering needs",
      href: "/contact",
      icon: Network,
      category: "Support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <SectionWrapper className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Error Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="relative">
              {/* Floating Engineering Icons */}
              <div className="absolute inset-0 pointer-events-none">
                {engineeringIcons.map(({ icon: Icon, delay }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.7],
                      scale: [0, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      delay: delay,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="absolute"
                    style={{
                      left: `${20 + (index * 10)}%`,
                      top: `${10 + (index % 3) * 20}%`
                    }}
                  >
                    <Icon className="w-6 h-6 text-blue-400/30" />
                  </motion.div>
                ))}
              </div>

              {/* Main Error Code */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.3
                }}
                className="relative z-10"
              >
                <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none">
                  {errorCode}
                </h1>
              </motion.div>
            </div>

            {/* Error Analysis */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <Badge variant="outline" className="text-amber-700 border-amber-300">
                  System Analysis
                </Badge>
              </div>
              
              {isAnalyzing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <RefreshCw className="w-6 h-6 text-blue-500" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-lg text-slate-600">
                    <span className="font-mono text-red-500">ERROR:</span> Page not found in system architecture
                  </p>
                  <p className="text-sm text-slate-500 font-mono">
                    Status: Resource unavailable | Code: 404 | Protocol: HTTP/1.1
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Engineering System Malfunction
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                The requested resource has been moved, deleted, or never existed in our engineering database. 
                Our systems are running diagnostics to help you find what you're looking for.
              </p>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Return to Base
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/blog" className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Resources
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </motion.div>

          {/* Navigation Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-8">
              Recommended Engineering Resources
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + (index * 0.1) }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-slate-200 hover:border-blue-300">
                    <Link href={suggestion.href} className="block h-full">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                          <suggestion.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        
                        <div className="space-y-2">
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.category}
                          </Badge>
                          <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {suggestion.title}
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="mt-16 pt-8 border-t border-slate-200"
          >
            <details className="text-left max-w-2xl mx-auto">
              <summary className="cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                Technical Details & Diagnostics
              </summary>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg font-mono text-xs text-slate-600 space-y-1">
                <div>Timestamp: {new Date().toISOString()}</div>
                <div>User Agent: {typeof window !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'Server-side'}</div>
                <div>Referrer: {typeof window !== 'undefined' ? document.referrer || 'Direct access' : 'N/A'}</div>
                <div>Protocol: HTTPS/2.0</div>
                <div>Status: 404 Not Found</div>
                <div>Server: Next.js Engineering Platform</div>
              </div>
            </details>
          </motion.div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}