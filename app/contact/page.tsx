'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle,
  Building,
  Users,
  Award,
  Globe,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { contactForms } from '@/lib/firestore';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Combine message with project details
      const fullMessage = `${formData.message}

Project Details:
- Project Type: ${formData.projectType || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}
- Budget Range: ${formData.budget || 'Not specified'}
- Urgency: ${formData.urgency}`;

      await contactForms.submit({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        service: formData.service,
        message: fullMessage
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        projectType: '',
        timeline: '',
        budget: '',
        message: '',
        urgency: 'normal'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['Alford Ukaigwe: (780) 880-7279', 'Sandra Ukaigwe: (780) 880-3674'],
      description: 'Available for consultation and project inquiries'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['akukaigwe@drofandy.com', 'sukaigwe@drofandy.com'],
      description: 'We respond within 24 hours during business days'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['1015 Street SW', 'Edmonton, Alberta T6W 2S4', 'Canada'],
      description: 'Visit our professional consulting office'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM', 'Sunday: By Appointment'],
      description: 'Flexible scheduling available for client needs'
    }
  ];

  const serviceAreas = [
    {
      region: 'Primary Service Area',
      locations: ['Edmonton Metropolitan Area', 'Calgary Region', 'Fort McMurray Industrial Area'],
      responseTime: '2-4 hours',
      coverage: 'Full service coverage'
    },
    {
      region: 'Extended Service Area',
      locations: ['Alberta Province', 'Saskatchewan', 'British Columbia'],
      responseTime: '4-8 hours',
      coverage: 'Most services available'
    },
    {
      region: 'National Projects',
      locations: ['Major Canadian Cities', 'Industrial Centers', 'Academic Institutions'],
      responseTime: '1-3 days',
      coverage: 'Specialized consulting and inspection services'
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Multidisciplinary Expertise',
      description: 'Comprehensive consultancy across NDE, environmental engineering, and education'
    },
    {
      icon: Users,
      title: 'Certified Professionals',
      description: 'ABSA, API, CWB, and NACE certified inspectors and consultants'
    },
    {
      icon: CheckCircle,
      title: 'Quality Standards',
      description: 'Rigorous quality assurance and industry-leading safety protocols'
    },
    {
      icon: Globe,
      title: 'Three Core Sectors',
      description: 'Industrial inspection, environmental solutions, and educational consulting'
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
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted mb-8 leading-relaxed">
              Ready to start your next project? Contact DROFANDY Group Inc. for expert 
              consultancy in NDE inspection, environmental engineering, and educational support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                24/7 Support
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                Free Consultation
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Quick Response
              </Badge>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Contact Form & Info */}
      <SectionWrapper background="accent">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-none border-gray-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-text">Start Your Project</CardTitle>
                  <p className="text-text">
                    Fill out the form below and we'll get back to you within 2 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-text mb-2">
                          Service Needed *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select a service</option>
                          <option value="ndt">NDT Testing</option>
                          <option value="environmental">Environmental Engineering</option>
                          <option value="academic">Academic Consulting</option>
                          <option value="industrial">Industrial Solutions</option>
                          <option value="quality">Quality Assurance</option>
                          <option value="certification">Certification Support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="urgency" className="block text-sm font-medium text-text mb-2">
                          Project Urgency
                        </label>
                        <select
                          id="urgency"
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="low">Low - Planning Phase</option>
                          <option value="normal">Normal - Standard Timeline</option>
                          <option value="high">High - Urgent Need</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-text mb-2">
                          Project Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate (1-2 weeks)</option>
                          <option value="short">Short-term (1-3 months)</option>
                          <option value="medium">Medium-term (3-6 months)</option>
                          <option value="long">Long-term (6+ months)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-text mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-10k">Under $10,000</option>
                          <option value="10k-50k">$10,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k-500k">$100,000 - $500,000</option>
                          <option value="over-500k">Over $500,000</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder="Please describe your project requirements, goals, and any specific challenges you're facing..."
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">Thank you! Your message has been sent successfully. We'll contact you within 2 hours.</span>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-800">Sorry, there was an error sending your message. Please try again or contact us directly.</span>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-text mb-6">Contact Information</h2>
                <p className="text-text mb-8">
                  Get in touch with our team of engineering experts. We're here to help 
                  you achieve your project goals with innovative solutions.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={info.title} className="hover:shadow-lg shadow-none border-slate-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text mb-2">{info.title}</h3>
                          <div className="space-y-1 mb-2">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-text">{detail}</p>
                            ))}
                          </div>
                          <p className="text-sm text-text">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Service Areas */}
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
              Service Areas
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              We provide engineering services across multiple regions with varying response times and coverage levels
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={area.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-text">
                      <MapPin className="w-5 h-5 text-primary" />
                      {area.region}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-muted mb-2">Locations:</h4>
                        <ul className="space-y-1">
                          {area.locations.map((location, idx) => (
                            <li key={idx} className="text-sm text-text flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {location}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <p className="text-sm font-medium text-text">Response Time</p>
                          <p className="text-sm text-text">{area.responseTime}</p>
                        </div>
                        <Badge variant="outline" className="text-text">{area.coverage}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
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
              Why Choose Engineering Excellence?
            </h2>
            <p className="text-xl text-text max-w-3xl mx-auto">
              Partner with us for reliable, innovative, and professional engineering solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <reason.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-text">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Emergency Contact */}
      <SectionWrapper>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-red-900">Emergency Services</h2>
              </div>
              <p className="text-red-800 mb-6">
                For urgent engineering emergencies requiring immediate attention, 
                contact our 24/7 emergency hotline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="destructive" size="lg" className="text-lg px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency: +1 (555) 123-4568
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  <Mail className="w-5 h-5 mr-2" />
                  emergency@engineeringexcellence.com
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}