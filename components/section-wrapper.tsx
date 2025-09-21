"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: "default" | "muted" | "gradient"
}

export function SectionWrapper({
  children,
  className,
  id,
  background = "default",
}: SectionWrapperProps) {
  const backgroundClasses = {
    default: "",
    muted: "bg-muted/50",
    gradient: "gradient-hero",
  }

  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        backgroundClasses[background],
        className
      )}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}