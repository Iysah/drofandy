'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Microscope, 
  Shield, 
  Leaf, 
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Zap,
  Settings,
  Award,
  Users,
  Target,
  Gauge
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'nde',
    icon: Microscope,
    title: 'Non-Destructive Examination (NDE) Services',
    shortDescription: 'Comprehensive testing services that blend time-tested techniques with the latest advancements in non-destructive evaluation technologies.',
    fullDescription: "DROFANDY's NDE Division offers comprehensive testing services that blend time-tested techniques with the latest advancements in non-destructive evaluation (NDE) technologies. We ensure the highest standards of reliability, safety, and efficiency across the industries we serve.",
    legacyMethods: [
      'Ultrasonic Testing: Precision thickness measurement and shear wave volumetric inspection for internal flaws',
      'Visual Inspection: Identifies surface defects and structural irregularities with precision',
      'Magnetic Particle Testing: Pinpoints surface and near-surface flaws in ferromagnetic materials',
      'Liquid Penetrant Testing: Detects even the smallest surface cracks and flaws in non-porous materials',
      'Radiographic Testing: Uses X-ray and gamma imaging to detect internal defects',
      'Eddy Current Testing: Cutting-edge electromagnetic flaw detection, surface to subsurface',
      'Automated Ultrasonic Testing (AUT): Fast, high-resolution computerized inspections'
    ],
    specializedTesting: [
      'Hardness testing for material property verification',
      'Positive Material Identification (PMI) for alloy verification',
      'Magnetic flux leakage scanning for corrosion and pitting in tanks and pipelines'
    ],
    color: 'blue'
  },
  {
    id: 'inspection',
    icon: Shield,
    title: 'Comprehensive Inspection Services',
    shortDescription: 'Certified assessment services across multiple industrial sectors with specialized expertise in pressure equipment and industrial systems.',
    fullDescription: 'The inspection division provides certified assessment services across multiple industrial sectors with expertise in pressure equipment, welding, and specialized industrial inspections.',
    pressureEquipment: [
      'Boiler Inspection: Conducted by ABSA ISI or TSASK PEI certified inspectors',
      'API 510 Pressure Vessel Inspection: Complete integrity assessment and certification',
      'API 570 Piping Systems: Program development and inspection services',
      'API 653 Tank Inspection: Comprehensive storage tank evaluation'
    ],
    specializedInspections: [
      'CWB certified welding inspection services',
      'NACE coating inspection and evaluation',
      'Overhead crane and lifting equipment certification',
      'Rig inspection and safety compliance',
      'Remote visual inspection using borescope and drone technology',
      'Corrosion management'
    ],
    technicalConsulting: [
      'Inspection work plan development and implementation',
      'Corrosion surveys, mapping, and evaluation consultancy',
      'Cracking surveys for compressors and cyclic service equipment',
      'P&ID review and technical assessment',
      'Repair procedure development and oversight'
    ],
    color: 'green'
  },
  {
    id: 'environmental',
    icon: Leaf,
    title: 'Environmental Engineering Consultancy',
    shortDescription: 'Innovative, cost-effective solutions for municipal, industrial, and commercial clients specializing in water systems and environmental compliance.',
    fullDescription: 'Our environmental engineering consultants deliver innovative, cost-effective solutions for municipal, industrial, and commercial clients. We specialize in sustainable infrastructure that protects public health and natural resources.',
    specializations: [
      'Water & Wastewater System Design',
      'Lagoons (Waste Stabilization Pond) Management',
      'Advanced Treatment Technologies (Biofiltration and Biofilm processes)',
      'Drinking Water Quality Optimization',
      'Industrial Effluent Treatment',
      'Regulatory Compliance & Environmental Permitting'
    ],
    services: [
      'Feasibility studies and environmental impact assessments',
      'System design and engineering',
      'Construction oversight and project management',
      'Commissioning and startup support',
      'Ongoing monitoring and optimization'
    ],
    color: 'emerald'
  },
  {
    id: 'educational',
    icon: GraduationCap,
    title: 'Educational Consulting Services',
    shortDescription: 'Strategic academic planning and individualized support for diverse students throughout their academic lifecycle.',
    fullDescription: 'Our educational consultancy services guide diverse students through their entire academic lifecycle and empower them to achieve success in planning, transition, and optimization. We combine strategic academic planning with individualized, hands-on support.',
    coreAreas: [
      {
        title: 'Educational Transition',
        description: 'Empower incoming students to successfully navigate academic transitions through guidance on academic expectations and preparedness, program selection, institutional culture adaptation, understanding academic system differences, and maximizing available support systems and resources.'
      },
      {
        title: 'Academic Success Strategy',
        description: 'We utilize systematic approaches to enhance student performance through comprehensive support that includes strategic academic planning, ongoing progress monitoring, personal development tracking, academic performance measurement, assessment tool training, and crisis intervention system access.'
      },
      {
        title: 'Educational Planning',
        description: 'Design clear, personalized academic pathways and degree completion roadmaps.'
      }
    ],
    targetStudents: [
      'Incoming graduate and undergraduate students',
      'Transfer students',
      'Mature students',
      'Non-traditional learners'
    ],
    color: 'purple'
  }
];

const stats = [
  { label: 'Certified Inspectors', value: '15+', icon: Award },
  { label: 'Years Experience', value: '20+', icon: Target },
  { label: 'Industries Served', value: '50+', icon: Users },
  { label: 'Success Rate', value: '99%', icon: Gauge }
];

export default function ServicesPage() {
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
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted mb-8 leading-relaxed">
              DROFANDY Group Inc. delivers expert consultancy across three core sectors: 
              non-destructive examination and inspection, environmental engineering, and educational support.
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

      {/* Stats Section */}
      <SectionWrapper background="accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-text mb-2">{stat.value}</div>
                <div className="text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <SectionWrapper key={service.id} background={index % 2 === 0 ? 'default' : 'accent'}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-${service.color}-500/10 rounded-xl flex items-center justify-center`}>
                      <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-text">{service.title}</h2>
                  </div>
                  
                  <p className="text-lg text-muted mb-6 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {service.legacyMethods && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-text mb-4">Legacy Testing Methods:</h3>
                      <div className="space-y-2">
                        {service.legacyMethods.map((method, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted">{method}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.specializedTesting && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-text mb-4">Specialized Testing:</h3>
                      <div className="space-y-2">
                        {service.specializedTesting.map((test, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted">{test}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.pressureEquipment && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-text mb-4">Pressure Equipment Inspection:</h3>
                      <div className="space-y-2">
                        {service.pressureEquipment.map((equipment, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted">{equipment}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.specializedInspections && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-text mb-4">Specialized Industrial Inspections:</h3>
                      <div className="space-y-2">
                        {service.specializedInspections.map((inspection, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted">{inspection}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.technicalConsulting && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-text mb-4">Technical Consulting:</h3>
                      <div className="space-y-2">
                        {service.technicalConsulting.map((consulting, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted">{consulting}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.specializations && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-text mb-4">Our Specializations:</h3>
                      <div className="space-y-2">
                        {service.specializations.map((spec, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.coreAreas && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-text mb-4">Three Critical Areas:</h3>
                      <div className="space-y-4">
                        {service.coreAreas.map((area, idx) => (
                          <div key={idx} className="border-l-4 border-primary pl-4">
                            <h4 className="font-semibold text-text mb-2">{area.title}</h4>
                            <p className="text-muted">{area.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button asChild size="lg" className="group">
                    <Link href="/contact">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                  <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl text-text">Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-primary" />
                          <span className="text-text">Industry-leading expertise</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Settings className="w-5 h-5 text-primary" />
                          <span className="text-text">State-of-the-art equipment</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-primary" />
                          <span className="text-text">Certified professionals</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span className="text-text">Comprehensive reporting</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      ))}

      {/* CTA Section */}
      <SectionWrapper background="gradient" className="text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-text mb-8">
              Contact DROFANDY Group Inc. today to discuss your project requirements 
              and discover how our expertise can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}