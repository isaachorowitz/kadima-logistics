import Container from "@/components/ui/Container";
import { Shield, Zap, BarChart3, Globe, Users } from "lucide-react";

const differentiators = [
  {
    icon: Shield,
    title: "Authorized DHL Reseller",
    description:
      "We're not a broker. We hold an official DHL partnership — meaning you get institutional rates without broker markups, directly through a certified channel.",
  },
  {
    icon: Users,
    title: "GPO Volume Access",
    description:
      "Our group purchasing organization aggregates shipping volume across hundreds of businesses. Your 280-parcel operation gets the rate tiers that normally require 2,800+ monthly shipments.",
  },
  {
    icon: BarChart3,
    title: "Multi-Carrier, Unbiased",
    description:
      "We negotiate across DHL, UPS, FedEx, and USPS. We recommend whatever combination saves you the most — not whatever's easiest for us.",
  },
  {
    icon: Zap,
    title: "Audit Recovery",
    description:
      "Most businesses are owed refunds right now and don't know it. Our line-by-line invoice auditing catches residential surcharges, dim-weight errors, and address correction fees carriers hope you'll miss.",
  },
  {
    icon: Globe,
    title: "Any Size, Any Volume",
    description:
      "From 50 parcels a month to 50,000+. From a single domestic carrier to a multi-carrier international operation. We have a solution that fits your volume and growth trajectory.",
  },
];

export default function WhyKadima() {
  return (
    <section id="why-kadima" className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="text-emerald-text font-semibold text-sm uppercase tracking-wider mb-3">
              Why Kadima
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading mb-4">
              Five Reasons We&apos;re Not Like Every Other Shipping Consultant
            </h2>
            <p className="text-body-text leading-relaxed">
              Most businesses that come to us have already &quot;negotiated&quot; with their carrier.
              Here&apos;s what separates us from the rates you think you already have.
            </p>
          </div>

          {/* Right: Differentiators */}
          <div className="lg:col-span-8 space-y-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-5 p-6 rounded-[4px] bg-slate-bg border border-slate-border hover:border-emerald/20 transition-colors duration-200"
                >
                  <div className="shrink-0">
                    <div className="w-11 h-11 bg-navy rounded-[4px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-emerald-text/40 font-display text-xs font-bold">
                        0{index + 1}
                      </span>
                      <h3 className="font-display text-lg font-bold text-heading">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-body-text text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
