import Container from "@/components/ui/Container";
import { Package, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Small Parcel Negotiation", href: "#services" },
      { label: "DHL Authorized Reseller", href: "#dhl" },
      { label: "Parcel Auditing", href: "#services" },
      { label: "GPO Rates", href: "#services" },
      { label: "3PL/4PL Solutions", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Why Kadima", href: "#why-kadima" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald rounded-[4px] flex items-center justify-center">
                <span className="font-display text-navy font-black text-lg leading-none">K</span>
              </div>
              <span className="font-display text-white text-xl font-bold tracking-tight">
                Kadima Logistics
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Authorized DHL Reseller and multi-carrier shipping optimization partner.
              We audit, negotiate, and reduce shipping costs for businesses of every size.
            </p>

            {/* DHL Badge */}
            <div className="inline-flex items-center gap-2 bg-dhl-amber/10 border border-dhl-amber/30 rounded-[4px] px-3 py-2">
              <Package className="w-4 h-4 text-dhl-amber" />
              <span className="text-dhl-amber text-xs font-semibold tracking-wide uppercase">
                DHL Authorized Reseller
              </span>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a
                href="mailto:info@kadimalogistics.com"
                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@kadimalogistics.com
              </a>
              <a
                href="tel:+1-800-555-0199"
                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                (800) 555-0199
              </a>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4" />
                New York City Metropolitan Area
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Kadima Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
