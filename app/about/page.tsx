'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Calendar, 
  Users, 
  Target, 
  Lightbulb, 
  Shield,
  CheckCircle,
  Building,
  Globe,
  TrendingUp,
  Microscope,
  Leaf,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'DROFANDY Group Inc. established as a multidisciplinary consultancy firm.',
      icon: Building
    },
    {
      year: '2021',
      title: 'NDE Division Launch',
      description: 'Launched comprehensive non-destructive examination services with certified inspectors.',
      icon: Microscope
    },
    {
      year: '2022',
      title: 'Environmental Engineering',
      description: 'Expanded into environmental engineering consultancy for municipal and industrial clients.',
      icon: Leaf
    },
    {
      year: '2023',
      title: 'Educational Services',
      description: 'Added educational consulting services to support diverse student populations.',
      icon: GraduationCap
    },
    {
      year: '2024',
      title: 'Multidisciplinary Excellence',
      description: 'Achieved recognition as a leading consultancy across three core sectors.',
      icon: Award
    },
    {
      year: '2025',
      title: 'Continued Growth',
      description: 'Expanding services and strengthening our commitment to excellence.',
      icon: TrendingUp
    }
  ];

  const leadership = [
    {
      name: 'Alford Ukaigwe',
      role: 'Principal Consultant',
      contact: '(780) 880-7279',
      email: 'akukaigwe@drofandy.com',
      specialization: 'NDE & Inspection Services',
      bio: 'Leading expert in non-destructive examination and comprehensive inspection services with extensive industry experience.'
    },
    {
      name: 'Sandra Ukaigwe',
      role: 'Principal Consultant',
      contact: '(780) 880-3674',
      email: 'sukaigwe@drofandy.com',
      specialization: 'Environmental & Educational Consulting',
      bio: 'Specialist in environmental engineering solutions and educational consulting with focus on student success strategies.'
    }
  ];

  const certifications = [
    {
      name: 'ABSA ISI Certification',
      description: 'Alberta Boiler Safety Association Inspector',
      issuer: 'Alberta Boiler Safety Association',
      category: 'Inspection Services'
    },
    {
      name: 'TSASK PEI Certification',
      description: 'Technical Safety Authority Pressure Equipment Inspector',
      issuer: 'Technical Safety Authority',
      category: 'Pressure Equipment'
    },
    {
      name: 'API 510/570/653',
      description: 'Pressure Vessel, Piping, and Tank Inspection',
      issuer: 'American Petroleum Institute',
      category: 'Industrial Inspection'
    },
    {
      name: 'CWB Certification',
      description: 'Canadian Welding Bureau Certified Inspector',
      issuer: 'Canadian Welding Bureau',
      category: 'Welding Inspection'
    },
    {
      name: 'NACE Certification',
      description: 'Coating Inspection and Evaluation',
      issuer: 'NACE International',
      category: 'Corrosion Management'
    },
    {
      name: 'Professional Engineering',
      description: 'Licensed Professional Engineers',
      issuer: 'Professional Engineers Ontario/Alberta',
      category: 'Engineering Practice'
    }
  ];

  const coreServices = [
    {
      icon: Microscope,
      title: 'Non-Destructive Examination',
      description: 'Legacy and advanced NDE services including ultrasonic testing, radiographic testing, magnetic particle testing, and automated inspection technologies.',
      features: ['Ultrasonic Testing', 'Radiographic Testing', 'Magnetic Particle Testing', 'Eddy Current Testing', 'Automated UT (AUT)']
    },
    {
      icon: Shield,
      title: 'Comprehensive Inspection',
      description: 'Certified assessment services for pressure equipment, welding, and specialized industrial systems with API and ABSA certified inspectors.',
      features: ['Boiler Inspection', 'Pressure Vessel Inspection', 'Piping Systems', 'Tank Inspection', 'Welding Inspection']
    },
    {
      icon: Leaf,
      title: 'Environmental Engineering',
      description: 'Innovative solutions for water and wastewater systems, environmental compliance, and sustainable infrastructure development.',
      features: ['Water System Design', 'Wastewater Treatment', 'Environmental Permitting', 'Lagoon Management', 'Compliance Solutions']
    },
    {
      icon: GraduationCap,
      title: 'Educational Consulting',
      description: 'Strategic academic planning and individualized support for diverse students throughout their academic lifecycle.',
      features: ['Educational Transition', 'Academic Success Strategy', 'Educational Planning', 'Student Support', 'Academic Guidance']
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver the highest standards of reliability, safety, and efficiency across all industries we serve.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We blend time-tested techniques with the latest advancements in technology and methodology.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We conduct business with precision, quality, and ethical practices in all our professional interactions.'
    },
    {
      icon: Users,
      title: 'Multidisciplinary Approach',
      description: 'We combine expertise across three complementary sectors to provide comprehensive solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <SectionWrapper className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
              About <span className="text-primary">DROFANDY Group Inc.</span>
            </h1>
            <p className="text-xl text-muted mb-8 leading-relaxed">
              DROFANDY Group Inc. is a multidisciplinary consultancy firm that operates across three 
              complementary sectors: legacy/advanced non-destructive examination and inspection services, 
              environmental engineering consultancy, and educational consulting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Microscope className="w-4 h-4 mr-2" />
                NDE Services
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Inspection Services
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Leaf className="w-4 h-4 mr-2" />
                Environmental Engineering
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                Educational Consulting
              </Badge>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper background="accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-text mb-6">Our Mission</h2>
              <p className="text-lg text-muted leading-relaxed mb-6">
                To deliver expert consultancy across three core sectors: non-destructive examination 
                and inspection, environmental engineering, and educational support. We provide reliable 
                industrial solutions and strategic academic guidance.
              </p>
              <p className="text-muted">
                We combine technical expertise in industrial asset integrity management with 
                environmental engineering solutions and academic success strategies, serving 
                industrial clients and individual students with precision and excellence.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-text mb-6">Our Vision</h2>
              <p className="text-lg text-muted leading-relaxed mb-6">
                To be recognized as the leading multidisciplinary consultancy firm that seamlessly 
                integrates industrial expertise, environmental stewardship, and educational excellence 
                to create lasting value for our clients and communities.
              </p>
              <p className="text-muted">
                We envision a future where our comprehensive services deliver precision in testing, 
                excellence in engineering, and quality educational support across all sectors we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Core Services */}
      <SectionWrapper>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Comprehensive expertise across three complementary sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-text">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-muted mb-4">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper background="accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              The principles that guide our multidisciplinary approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Company Timeline */}
      <SectionWrapper>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Key milestones in building our multidisciplinary expertise
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full hidden lg:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:gap-8`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:mb-0 mb-4`}>
                    <Card className="p-6 hover:shadow shadow-none">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <milestone.icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge variant="outline" className="text-lg text-text px-3 py-1">
                            {milestone.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-text mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden lg:block w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />
                  
                  <div className="lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Leadership Team */}
      <SectionWrapper background="accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Meet the experienced professionals leading our multidisciplinary consultancy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-text mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-3">
                        {member.role}
                      </p>
                      <Badge variant="outline" className="text-text mb-4">
                        {member.specialization}
                      </Badge>
                      <p className="text-sm text-muted mb-4">
                        {member.bio}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="text-text">{member.contact}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="text-text">{member.email}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Certifications & Accreditations
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Our commitment to excellence is validated by industry-leading certifications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-muted mb-2">
                          {cert.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted">
                            {cert.issuer}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {cert.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Contact Information */}
      <SectionWrapper background="accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-muted mb-8">
              Ready to discuss your project needs? Contact DROFANDY Group Inc. for expert 
              consultancy across our three core sectors.
            </p>
            
            <Card className="p-6 mb-8">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <MapPin className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold text-text mb-1">Address</h3>
                    <p className="text-muted text-sm">1015 Street SW<br />Edmonton, Alberta<br />T6W 2S4</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Phone className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold text-text mb-1">Phone</h3>
                    <p className="text-muted text-sm">Alford: (780) 880-7279<br />Sandra: (780) 880-3674</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Mail className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold text-text mb-1">Email</h3>
                    <p className="text-muted text-sm">akukaigwe@drofandy.com<br />sukaigwe@drofandy.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg text-text px-8">
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}