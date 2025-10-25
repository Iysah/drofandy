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
  ChevronRight,
  Calendar,
  Clock
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
    title: "Non-Destructive Examination",
    description: "Legacy and advanced NDE services with state-of-the-art equipment for accurate, reliable industrial asset integrity management.",
  },
  {
    icon: Leaf,
    title: "Environmental Engineering",
    description: "Innovative, cost-effective solutions for municipal, industrial, and commercial clients with focus on sustainable infrastructure.",
  },
  {
    icon: GraduationCap,
    title: "Educational Consulting",
    description: "Strategic academic planning and individualized support for diverse students throughout their academic lifecycle.",
  },
]

const services = [
  {
    icon: Microscope,
    title: "Non-Destructive Examination (NDE) Services",
    description: "Comprehensive testing services blending time-tested techniques with latest NDE technologies including ultrasonic, radiographic, magnetic particle, and automated testing.",
    href: "/services/nde",
  },
  {
    icon: Shield,
    title: "Comprehensive Inspection Services",
    description: "Certified assessment services including pressure equipment inspection, API certifications, CWB welding inspection, and specialized industrial inspections.",
    href: "/services/inspection",
  },
  {
    icon: Leaf,
    title: "Environmental Engineering Consultancy",
    description: "Water & wastewater system design, lagoon management, advanced treatment technologies, and regulatory compliance solutions.",
    href: "/services/environmental",
  },
  {
    icon: GraduationCap,
    title: "Educational Consulting Services",
    description: "Academic transition support, success strategy development, and personalized educational planning for diverse student populations.",
    href: "/services/educational",
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
    quote: "DROFANDY Group Inc. delivered exceptional NDE services that exceeded our expectations. Their attention to detail and professional approach made all the difference.",
    author: "Sarah Johnson",
    title: "Quality Manager",
    company: "TechCorp Industries",
    rating: 5,
  },
  {
    quote: "The environmental engineering solutions provided by DROFANDY helped us achieve compliance while reducing costs. Highly recommended for any industrial project.",
    author: "Michael Chen",
    title: "Operations Director",
    company: "GreenTech Manufacturing",
    rating: 5,
  },
  {
    quote: "Their educational consulting services were instrumental in our academic success. The expertise and guidance provided were invaluable for our students.",
    author: "Dr. Emily Rodriguez",
    title: "Academic Director",
    company: "Innovation University",
    rating: 5,
  },
  {
    quote: "DROFANDY's comprehensive inspection services helped us maintain the highest safety standards. Their certified inspectors are truly professional.",
    author: "Robert Wilson",
    title: "Plant Manager",
    company: "Industrial Solutions Corp",
    rating: 5,
  },
]

const blogPosts = [
  {
    title: "How to prevent equipment failures with simple daily habits",
    image: "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Dec 18, 2024",
    readTime: "3 min read",
    href: "/blog/prevent-equipment-failures",
  },
  {
    title: "Top reasons to replace aging infrastructure promptly",
    image: "https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Jan 15, 2025",
    readTime: "6 min read",
    href: "/blog/replace-aging-infrastructure",
  },
  {
    title: "The connection between environmental compliance and overall project success",
    image: "https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Jan 13, 2025",
    readTime: "5 min read",
    href: "/blog/environmental-compliance-success",
  },
  {
    title: "The connection between environmental compliance",
    image: "https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Jan 13, 2025",
    readTime: "5 min read",
    href: "/blog/environmental-compliance-success",
  },
]

const projectGallery = [
  {
    id: 1,
    title: "Industrial Pipeline Inspection",
    image: "https://images.pexels.com/photos/162568/pipes-industrial-tubes-industrial-162568.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Structural Steel Analysis",
    image: "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Environmental Monitoring System",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Bridge Infrastructure Assessment",
    image: "https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    title: "Manufacturing Quality Control",
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "Pressure Vessel Testing",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    title: "Welding Joint Inspection",
    image: "https://images.pexels.com/photos/1108717/pexels-photo-1108717.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    title: "Concrete Structure Analysis",
    image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 9,
    title: "Electrical System Audit",
    image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 10,
    title: "Mechanical Component Testing",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 11,
    title: "Water Treatment Facility",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 12,
    title: "Solar Panel Installation",
    image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 13,
    title: "HVAC System Design",
    image: "https://images.pexels.com/photos/1108717/pexels-photo-1108717.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 14,
    title: "Chemical Plant Safety Audit",
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 15,
    title: "Turbine Blade Inspection",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 16,
    title: "Geotechnical Site Investigation",
    image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 17,
    title: "Automotive Parts Testing",
    image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 18,
    title: "Aerospace Component Analysis",
    image: "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 19,
    title: "Oil Rig Structural Assessment",
    image: "https://images.pexels.com/photos/162568/pipes-industrial-tubes-industrial-162568.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 20,
    title: "Nuclear Facility Inspection",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
       {/* Hero Section */}
      <section className="bg-[var(--background)] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-up">
              <div className="mb-4">
                <span className="text-[var(--muted)] text-sm font-medium tracking-wide uppercase">
                  DROFANDY Group Inc.
                </span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] md:text-5xl lg:text-6xl mb-6">
                Expert Consultancy Across{" "}
                <span className="text-[var(--primary)]">Three Core Sectors</span>
              </h1>
              
              <p className="text-lg text-[var(--muted)] mb-8 max-w-xl">
                DROFANDY Group Inc. delivers expert consultancy across non-destructive examination and inspection, environmental engineering, and educational support. We provide reliable industrial solutions and strategic academic guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-up-delay">
                <Button asChild size="lg" className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                  <Link href="/services">
                    Our Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <div className="flex items-center gap-3 text-[var(--text)]">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)]/10">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Contact us</div>
                    <div className="text-sm text-[var(--muted)]">(780) 880-7279</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative animate-scale-in">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/8961126/pexels-photo-8961126.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Professional engineer in safety gear working on construction site"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[var(--primary)]">
                      <AnimatedCounter end={500} suffix="+" />
                    </div>
                    <div className="text-xs text-[var(--muted)]">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--primary)]">
                      <AnimatedCounter end={15} suffix="+" />
                    </div>
                    <div className="text-xs text-[var(--muted)]">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Stats Section */}
      <section className="bg-[var(--primary)] text-white py-12 animate-parallax-fade">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold md:text-4xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-[var(--text)]">
            Multidisciplinary Excellence Across Three Sectors
          </h2>
          <p className="mt-6 text-lg text-[var(--muted)]">
            We combine technical expertise in industrial asset integrity management with environmental engineering solutions and academic success strategies, delivering precision in testing, excellence in engineering, and quality educational support.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3 pb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-none">
                <CardHeader className="">
                  <div className="flex h-16 w-16 items-center justify-center rounded bg-[var(--primary)]/5">
                    <feature.icon className="h-8 w-8 text-[var(--primary)]" />
                  </div>
                  <CardTitle className="mt-4 text-[var(--text)]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-[var(--muted)]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>


      </SectionWrapper>

      {/* Services Overview */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-6 text-lg text-[var(--muted)]" >
            Our Services
          </h2>
          <p className="text-3xl font-bold tracking-tight md:text-4xl text-[var(--text)]">
            Tailored comprehensive engineering solutions
          </p>
        </div>
        
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            // Professional service images from Pexels
            const serviceImages = [
              "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=400", // NDT Testing - Industrial inspection
              "https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?auto=compress&cs=tinysrgb&w=400", // Environmental Engineering - Green technology
              "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400", // Academic Consulting - Research lab
              "https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=400", // Industrial Solutions - Manufacturing
              "https://images.pexels.com/photos/5726788/pexels-photo-5726788.jpeg?auto=compress&cs=tinysrgb&w=400", // Quality Assurance - Quality control
              "https://images.pexels.com/photos/5726793/pexels-photo-5726793.jpeg?auto=compress&cs=tinysrgb&w=400", // Certification Support - Professional certification
            ];
            
            // Generate ratings between 4.5 and 4.9
            const ratings = [4.8, 4.6, 4.9, 4.7, 4.8, 4.9];
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover group overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={serviceImages[index]}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  <CardContent className="p-6">
                    {/* Star Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                      <Star className="h-4 w-4 fill-[var(--secondary)] text-[var(--secondary)]" />
                      <span className="text-sm font-medium text-[var(--text)]">{ratings[index]}</span>
                    </div>
                    
                    {/* Service Title */}
                    <CardTitle className="text-xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {service.title}
                    </CardTitle>
                    
                    {/* Service Description */}
                    <CardDescription className="text-[var(--muted)] text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </CardDescription>
                    
                    {/* Learn More Link with Arrow */}
                    <Link
                      href={service.href}
                      className="inline-flex items-center justify-between w-full text-sm font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 group/link"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-[var(--text)]">
              Why Choose Drofandy Group?
            </h2>
            <p className="mt-6 text-lg text-[var(--muted)]">
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
                  <CheckCircle className="h-5 w-5 text-[var(--primary)]" />
                  <span className="text-[var(--text)]">{item}</span>
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
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
                      <item.icon className="h-6 w-6 text-[var(--primary)]" />
                    </div>
                    <div className="mt-4 text-2xl font-bold text-[var(--text)]">{item.value}</div>
                    <div className="text-sm text-[var(--muted)]">{item.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Project Gallery */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-[var(--text)]">
            Our Project Portfolio
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Explore our comprehensive collection of engineering excellence across diverse industries and applications
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {projectGallery.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                  <h3 className="text-white font-semibold text-sm md:text-base leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
              
              {/* Subtle border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--primary)]/30 rounded-lg transition-all duration-300" />
            </motion.div>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="group">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-6 text-lg text-[var(--muted)]   ">
            Testimonials
          </h2>
          <p className="text-3xl font-bold tracking-tight md:text-4xl text-[var(--text)]">
            Trusted by industry leaders for exceptional engineering solutions
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-4">
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
                        <Star key={i} className="h-4 w-4 fill-[var(--secondary)] text-[var(--secondary)]" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-[var(--muted)] mb-4" />
                    <p className="text-[var(--muted)] mb-6">{testimonial.quote}</p>
                    <div>
                      <div className="font-semibold text-[var(--text)]">{testimonial.author}</div>
                      <div className="text-sm text-[var(--muted)]">
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Blog Section */}


      {/* CTA Section */}
      <SectionWrapper background="gradient" className="text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-text">
            Ready to Start Your Project?
          </h2>
          <p className="mt-6 text-lg text-text">
            Get in touch with our experts for a consultation and discover how we can help 
            achieve your engineering goals.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90">
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="default" size="lg" className="border-primary text-white hover:bg-white hover:text-primary">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  )
}
