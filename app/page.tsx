"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award, 
  TrendingUp, 
  Shield,
  Microscope,
  Leaf,
  GraduationCap,
  Settings,
  Quote,
  Star,
  ChevronRight
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionWrapper } from "@/components/section-wrapper"
import { AnimatedCounter } from "@/components/animated-counter"

const stats = [
  { label: "Projects Completed", value: 500, suffix: "+" },
  { label: "Years of Experience", value: 15, suffix: "+" },
  { label: "Clients Served", value: 200, suffix: "+" },
  { label: "Success Rate", value: 99, suffix: "%" },
]

const features = [
  {
    icon: Microscope,
    title: "Precision Testing",
    description: "Advanced NDT methodologies with state-of-the-art equipment for accurate, non-destructive analysis.",
  },
  {
    icon: Leaf,
    title: "Environmental Solutions",
    description: "Sustainable engineering practices that protect our environment while meeting industry standards.",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: "Research-backed consulting services with cutting-edge methodologies and proven results.",
  },
]

const services = [
  {
    icon: Microscope,
    title: "NDT Testing",
    description: "Comprehensive non-destructive testing services including ultrasonic, radiographic, and magnetic particle testing.",
    href: "/services/ndt",
  },
  {
    icon: Leaf,
    title: "Environmental Engineering",
    description: "Environmental impact assessments, remediation planning, and sustainable engineering solutions.",
    href: "/services/environmental",
  },
  {
    icon: GraduationCap,
    title: "Academic Consulting",
    description: "Research collaboration, technical writing, and academic project consulting services.",
    href: "/services/academic",
  },
  {
    icon: Settings,
    title: "Industrial Solutions",
    description: "Custom engineering solutions for manufacturing, quality control, and process optimization.",
    href: "/services/industrial",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Comprehensive quality management systems and compliance consulting services.",
    href: "/services/quality",
  },
  {
    icon: Award,
    title: "Certification Support",
    description: "Assistance with industry certifications, standards compliance, and regulatory requirements.",
    href: "/services/certification",
  },
]

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Initial assessment of your requirements and project scope definition.",
  },
  {
    step: "02",
    title: "Planning",
    description: "Detailed project planning with timeline, resources, and methodology selection.",
  },
  {
    step: "03",
    title: "Execution",
    description: "Professional implementation using industry-leading tools and techniques.",
  },
  {
    step: "04",
    title: "Delivery",
    description: "Comprehensive reporting and ongoing support for optimal results.",
  },
]

const testimonials = [
  {
    quote: "Engineering Excellence delivered exceptional NDT services that exceeded our expectations. Their attention to detail and professional approach made all the difference.",
    author: "Sarah Johnson",
    title: "Quality Manager",
    company: "TechCorp Industries",
    rating: 5,
  },
  {
    quote: "The environmental engineering solutions provided by this team helped us achieve compliance while reducing costs. Highly recommended for any industrial project.",
    author: "Michael Chen",
    title: "Operations Director",
    company: "GreenTech Manufacturing",
    rating: 5,
  },
  {
    quote: "Their academic consulting services were instrumental in our research project success. The expertise and guidance provided were invaluable.",
    author: "Dr. Emily Rodriguez",
    title: "Research Director",
    company: "Innovation University",
    rating: 5,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            >
              Engineering Excellence Through{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Innovation
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 md:text-xl"
            >
              Comprehensive NDT, Environmental, and Academic Engineering Solutions
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/services">
                  Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Get Consultation</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Animated Stats */}
        <div className="container relative mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold md:text-4xl">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    className="text-white"
                  />
                </div>
                <p className="mt-2 text-sm text-blue-200">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            A commitment to engineering excellence
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We deliver precision, innovation, and reliability in every project, 
            combining cutting-edge technology with decades of expertise.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center card-hover">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Services Overview */}
      <SectionWrapper background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Services
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Comprehensive engineering solutions tailored to meet your specific needs
          </p>
        </div>
        
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-base">
                    {service.description}
                  </CardDescription>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why Choose Engineering Excellence?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We combine technical expertise with innovative solutions to deliver 
              exceptional results that exceed expectations.
            </p>
            
            <div className="mt-8 space-y-4">
              {[
                "Certified professionals with industry expertise",
                "State-of-the-art equipment and methodologies",
                "Comprehensive quality assurance processes",
                "Timely delivery and competitive pricing",
                "24/7 technical support and consultation",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Users, label: "Expert Team", value: "50+" },
              { icon: Award, label: "Certifications", value: "25+" },
              { icon: TrendingUp, label: "Growth Rate", value: "150%" },
              { icon: Shield, label: "Compliance", value: "100%" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center card-hover">
                  <CardContent className="pt-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mt-4 text-2xl font-bold">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Process Section */}
      <SectionWrapper background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How We Deliver Excellence
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Our proven 4-step process ensures consistent, high-quality results
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
              
              {index < processSteps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-8 w-px bg-border lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Trusted by industry leaders for exceptional engineering solutions
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper background="gradient" className="text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mt-6 text-lg text-blue-100">
            Get in touch with our experts for a consultation and discover how we can help 
            achieve your engineering goals.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  )
}
