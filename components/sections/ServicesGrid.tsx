import Container from "@/components/ui/Container";
import {
  Package,
  HandshakeIcon,
  Users,
  FileSearch,
  Warehouse,
  BadgeCheck,
  Truck,
  Boxes,
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "DHL Authorized Reseller",
    description:
      "Direct access to DHL Express rates that individual businesses can't negotiate. Official partnership, not a broker markup.",
    highlight: true,
  },
  {
    icon: HandshakeIcon,
    title: "Small Parcel Negotiation",
    description:
      "Expert rate negotiation across UPS, FedEx, USPS, and DHL. We know the tariff structure carriers don't publicize.",
  },
  {
    icon: Users,
    title: "GPO Small Parcel Rates",
    description:
      "Group purchasing volume gives your 280-parcel operation the rate tiers that usually require 2,800+ monthly shipments.",
  },
  {
    icon: FileSearch,
    title: "Parcel Auditing",
    description:
      "Line-by-line invoice auditing to recover overcharges. Most businesses are owed refunds right now — we find and reclaim them.",
  },
  {
    icon: Warehouse,
    title: "3PL/4PL Warehousing",
    description:
      "Third and fourth-party logistics solutions for businesses that need storage, fulfillment, or distribution network optimization.",
  },
  {
    icon: BadgeCheck,
    title: "SFP Shipping Optimization",
    description:
      "Seller Fulfilled Prime optimization for Amazon sellers. Maintain your Prime badge while reducing per-label shipping costs.",
  },
  {
    icon: Truck,
    title: "LTL/FTL Freight",
    description:
      "Less-than-truckload and full truckload freight solutions. Competitive rates through our carrier network for heavier shipments.",
  },
  {
    icon: Boxes,
    title: "Shipping Supplies",
    description:
      "Packaging materials and sourcing at volume-discounted pricing. Reduce per-package material costs alongside carrier savings.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-emerald-text font-semibold text-sm uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-heading">
            Full-Service Shipping Optimization
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group rounded-[4px] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  service.highlight
                    ? "bg-navy text-white border border-navy"
                    : "bg-slate-bg border border-slate-border hover:border-emerald/30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-[4px] flex items-center justify-center mb-4 ${
                    service.highlight
                      ? "bg-dhl-amber/15"
                      : "bg-navy/5 group-hover:bg-emerald/10"
                  } transition-colors duration-200`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      service.highlight
                        ? "text-dhl-amber"
                        : "text-navy group-hover:text-emerald-text"
                    } transition-colors duration-200`}
                  />
                </div>
                <h3
                  className={`font-display text-base font-bold mb-2 ${
                    service.highlight ? "text-white" : "text-heading"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    service.highlight ? "text-white/70" : "text-body-text"
                  }`}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
