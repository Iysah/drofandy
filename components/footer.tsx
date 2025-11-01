import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react"

const footerLinks = {
  services: [
    { title: "Non-Destructive Examination (NDE) Services", href: "/services/ndt" },
    { title: "Comprehensive Inspection Services", href: "/services/environmental" },
    { title: "Environmental Engineering Consultancy", href: "/services/academic" },
    { title: "Educational Consulting Services", href: "/services/industrial" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Our Team", href: "/about#team" },
    { title: "Certifications", href: "/about#certifications" },
    // { title: "Careers", href: "/careers" },
  ],
  resources: [
    { title: "News", href: "/blog" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "White Papers", href: "/resources" },
    { title: "Industry News", href: "/blog?category=industry" },
  ],
  support: [
    { title: "Contact Us", href: "/contact" },
    { title: "Emergency Services", href: "/contact#emergency" },
    { title: "Technical Support", href: "/support" },
    { title: "Documentation", href: "/docs" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/engineering-excellence", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/eng_excellence", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/engineering.excellence", label: "Facebook" },
]

export function Footer() {
  return (
    <footer className="border-t bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold text-white">DG</span>
              </div>
              <span className="font-bold">DROFANDY Group Inc.</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Expert consultancy across four core sectors: Non-Destructive Examination (NDE) Services, 
              Environmental Engineering, and Educational Consulting. Delivering reliable industrial solutions 
              and strategic academic guidance.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>Alford: (1) 780-880-7279 | Sandra: (1) 780-880-3674</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>akukaigwe@drofandy.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>1015 Street SW, Edmonton, Alberta T6W 2S4</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold">Services</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 DROFANDY Group Inc. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-4 flex space-x-4 md:mt-0">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}