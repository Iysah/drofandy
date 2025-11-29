'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle,
  Award,
  Users,
  Globe,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { contactForms } from '@/lib/firestore';
import { cn } from '@/lib/utils';

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

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ease-in-out outline-none hover:border-gray-300";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <SectionWrapper className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-none">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Ready to start your next project? Contact DROFANDY Group Inc. for expert 
              consultancy in Non-destructive examination, comprehensive inspection, and environmental engineering.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                <MessageSquare className="w-4 h-4 text-primary" />
                24/7 Support
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                <Calendar className="w-4 h-4 text-primary" />
                Free Consultation
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                <CheckCircle className="w-4 h-4 text-primary" />
                Quick Response
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Main Content Area */}
      <SectionWrapper className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Start Your Project</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 2 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className={labelClasses}>
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className={labelClasses}>
                      Service Needed *
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className={cn(inputClasses, "appearance-none")}
                      >
                        <option value="">Select a service</option>
                        <option value="ndt">NDT Examination</option>
                        <option value="environmental">Environmental Engineering</option>
                        <option value="academic">Educational Consulting</option>
                        <option value="industrial">Comprehensive Inspection</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="urgency" className={labelClasses}>
                      Project Urgency
                    </label>
                    <div className="relative">
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className={cn(inputClasses, "appearance-none")}
                      >
                        <option value="low">Low - Planning Phase</option>
                        <option value="normal">Normal - Standard Timeline</option>
                        <option value="high">High - Urgent Need</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="timeline" className={labelClasses}>
                      Project Timeline
                    </label>
                    <div className="relative">
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className={cn(inputClasses, "appearance-none")}
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (1-2 weeks)</option>
                        <option value="short">Short-term (1-3 months)</option>
                        <option value="medium">Medium-term (3-6 months)</option>
                        <option value="long">Long-term (6+ months)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="budget" className={labelClasses}>
                      Budget Range
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className={cn(inputClasses, "appearance-none")}
                      >
                        <option value="">Select budget range</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-50k">$10,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-500k">$100,000 - $500,000</option>
                        <option value="over-500k">Over $500,000</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={cn(inputClasses, "resize-none")}
                    placeholder="Please describe your project requirements, goals, and any specific challenges you're facing..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 font-medium">Thank you! Your message has been sent successfully. We'll contact you within 2 hours.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-red-800 font-medium">Sorry, there was an error sending your message. Please try again or contact us directly.</span>
                  </motion.div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-auto py-4 text-lg font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Right Column: Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 h-full">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Get in touch with our team of engineering experts. We're here to help 
                    you achieve your project goals with innovative solutions.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <info.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2 text-lg">{info.title}</h3>
                          <div className="space-y-1.5 mb-3">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">{info.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Service Areas */}
      <SectionWrapper background="accent" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{area.region}</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Locations</h4>
                    <ul className="space-y-2">
                      {area.locations.map((location, idx) => (
                        <li key={idx} className="text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {location}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-500">Response Time</span>
                      <span className="font-semibold text-primary">{area.responseTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Coverage</span>
                      <span className="text-sm font-medium text-gray-900">{area.coverage}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Drofandy Group Inc?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="group"
              >
                <div className="h-full bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <reason.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}