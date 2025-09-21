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
  TrendingUp
} from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Started as a small engineering consultancy with a vision to deliver excellence.',
      icon: Building
    },
    {
      year: '2013',
      title: 'First Major Project',
      description: 'Completed our first large-scale infrastructure project, establishing our reputation.',
      icon: Award
    },
    {
      year: '2016',
      title: 'Team Expansion',
      description: 'Grew to 50+ engineers and opened our second office location.',
      icon: Users
    },
    {
      year: '2019',
      title: 'International Recognition',
      description: 'Received industry awards for innovation and sustainable engineering practices.',
      icon: Globe
    },
    {
      year: '2022',
      title: 'Digital Transformation',
      description: 'Launched our digital engineering services and AI-powered solutions.',
      icon: TrendingUp
    },
    {
      year: '2024',
      title: 'Continued Growth',
      description: 'Celebrating 100+ successful projects and expanding our service offerings.',
      icon: Target
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Executive Officer',
      experience: '20+ years',
      specialization: 'Structural Engineering',
      image: '/api/placeholder/300/300',
      bio: 'Leading the company with expertise in large-scale infrastructure projects and sustainable design.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      experience: '15+ years',
      specialization: 'Digital Engineering',
      image: '/api/placeholder/300/300',
      bio: 'Driving innovation in engineering technology and digital transformation initiatives.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Civil Engineering',
      experience: '18+ years',
      specialization: 'Infrastructure Design',
      image: '/api/placeholder/300/300',
      bio: 'Expert in transportation systems and urban planning with a focus on smart city solutions.'
    },
    {
      name: 'David Thompson',
      role: 'Head of Mechanical Engineering',
      experience: '16+ years',
      specialization: 'HVAC & Energy Systems',
      image: '/api/placeholder/300/300',
      bio: 'Specialist in energy-efficient systems and sustainable building technologies.'
    },
    {
      name: 'Lisa Wang',
      role: 'Head of Electrical Engineering',
      experience: '14+ years',
      specialization: 'Power Systems',
      image: '/api/placeholder/300/300',
      bio: 'Leading electrical design projects with expertise in renewable energy integration.'
    },
    {
      name: 'James Miller',
      role: 'Head of Environmental Engineering',
      experience: '12+ years',
      specialization: 'Sustainability',
      image: '/api/placeholder/300/300',
      bio: 'Focused on environmental impact assessment and green engineering solutions.'
    }
  ];

  const certifications = [
    {
      name: 'ISO 9001:2015',
      description: 'Quality Management Systems',
      issuer: 'International Organization for Standardization',
      year: '2023'
    },
    {
      name: 'ISO 14001:2015',
      description: 'Environmental Management Systems',
      issuer: 'International Organization for Standardization',
      year: '2023'
    },
    {
      name: 'OHSAS 18001',
      description: 'Occupational Health and Safety',
      issuer: 'British Standards Institution',
      year: '2022'
    },
    {
      name: 'LEED AP',
      description: 'Leadership in Energy and Environmental Design',
      issuer: 'U.S. Green Building Council',
      year: '2024'
    },
    {
      name: 'Professional Engineer License',
      description: 'State Engineering Board Certification',
      issuer: 'State Engineering Board',
      year: 'Ongoing'
    },
    {
      name: 'Project Management Professional',
      description: 'PMP Certification',
      issuer: 'Project Management Institute',
      year: '2023'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in every project, delivering solutions that exceed expectations.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative approaches to solve complex engineering challenges.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and ethical practices in all our interactions.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership to achieve extraordinary results.'
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
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">Engineering Excellence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              For over a decade, we've been at the forefront of engineering innovation, 
              delivering exceptional solutions that shape the future of infrastructure and technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                Founded 2010
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                100+ Engineers
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                500+ Projects
              </Badge>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper background="muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To deliver innovative engineering solutions that enhance communities, 
                protect the environment, and drive sustainable development through 
                excellence in design, technology, and service.
              </p>
              <p className="text-muted-foreground">
                We are committed to pushing the boundaries of what's possible in 
                engineering while maintaining the highest standards of safety, 
                quality, and environmental responsibility.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To be the leading engineering consultancy recognized globally for 
                innovation, sustainability, and transformative solutions that 
                shape a better future for generations to come.
              </p>
              <p className="text-muted-foreground">
                We envision a world where engineering excellence drives positive 
                change, creating resilient infrastructure and sustainable 
                technologies that benefit society and the planet.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our work and define our culture
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
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
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
      <SectionWrapper background="muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones that have shaped our company's growth and success
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
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <milestone.icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            {milestone.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
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
      <SectionWrapper>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experienced professionals leading our engineering excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
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
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-2">
                        {member.role}
                      </p>
                      <div className="flex justify-center gap-2 mb-3">
                        <Badge variant="secondary">
                          {member.experience}
                        </Badge>
                        <Badge variant="outline">
                          {member.specialization}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper background="muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certifications & Accreditations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to quality and excellence is validated by industry-leading certifications
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
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {cert.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            {cert.issuer}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {cert.year}
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

      {/* CTA Section */}
      <SectionWrapper>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how our engineering expertise can bring your vision to life. 
              Contact us today to start your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start Your Project
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                View Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}