"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
    children: [
      { title: "NDT Services", href: "/services/ndt" },
      { title: "Comprehensive Inspection Services", href: "/services/environmental" },
      { title: "Environmental Engineering Consultancy", href: "/services/academic" },
      { title: "Educational Consulting Services", href: "/services/industrial" },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
  // {
  //   title: "News",
  //   href: "/blog",
  // },
  {
    title: "Contact",
    href: "/contact",
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* contact information */}
      <div className="w-full bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-10 items-center justify-between px-4 text-sm">
          <div className="flex items-center space-x-4 text-white">
            <a href="tel:+17808807279" className="hover:underline">Phone: (1) 780-880-7279</a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:solutions@drofandy`.com" className="hover:underline">solutions@drofandy.com</a>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-white">
            <Clock className="h-4 w-4" />
            <span>Mon — Fri: 9:00 — 17:00</span>
          </div>
        </div>
      </div>

      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <img 
            src="/drofandy-logo.jpeg" 
            alt="Drofandy Logo" 
            className="h-8 w-auto rounded"
          />
          <span className="hidden font-bold sm:inline-block text-text">
            Drofandy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navigationItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-text"
                )}
              >
                <span>{item.title}</span>
                {item.children && (
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                )}
              </Link>

              {/* Dropdown Menu */}
              {item.children && (
                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-56 rounded-lg border bg-background p-2 shadow-lg"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-md px-3 py-2 text-sm text-text transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Button asChild size="sm" className="text-white">
            <Link href="/contact">Request Qoute</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-text" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t bg-background md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={closeMenu}
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                            onClick={closeMenu}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/contact" onClick={closeMenu}>
                      Get Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}