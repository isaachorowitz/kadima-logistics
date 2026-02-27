import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SlideIn from "@/components/animations/SlideIn";
import { Package, Check, ArrowRight } from "lucide-react";

const benefits = [
  "Official DHL Express partnership — not a broker, not a markup",
  "Competitive international and domestic rates for businesses of every size",
  "Direct access to DHL's global network spanning 220+ countries",
  "Integrated with your existing multi-carrier shipping workflow",
  "Dedicated support through Kadima — one partner for all carriers",
];

export default function DHLSpotlight() {
  return (
    <section
      id="dhl"
      className="py-20 lg:py-28 bg-navy relative overflow-hidden"
    >
      {/* Subtle DHL amber accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-dhl-amber to-transparent opacity-40" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <SlideIn direction="left">
            <div>
              {/* DHL Badge */}
              <div className="inline-flex items-center gap-2 bg-dhl-amber/10 border border-dhl-amber/30 rounded-[4px] px-4 py-2 mb-8">
                <Package className="w-5 h-5 text-dhl-amber" />
                <span className="text-white text-sm font-bold tracking-wide uppercase">
                  DHL Authorized Reseller
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold !text-white mb-6 leading-tight">
                The DHL Rates Your Business{" "}
                <span className="text-dhl-amber">
                  Couldn&apos;t Get Alone
                </span>
              </h2>

              <p className="!text-white text-lg leading-relaxed mb-8 max-w-lg">
                As an authorized DHL reseller, Kadima provides direct access to
                DHL Express rates that are typically reserved for high-volume
                enterprise shippers. Whether you&apos;re shipping 50 or 5,000
                parcels a month, you get institutional pricing through our
                partnership.
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-10">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                    <span className="!text-white/95 text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <Button href="#contact" variant="primary" size="lg">
                Get DHL Rates for Your Business
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </SlideIn>

          {/* Right: Visual */}
          <SlideIn direction="right" delay={0.15}>
            <div className="relative">
              <div className="relative bg-navy-light rounded-[4px] border border-white/10 p-8 lg:p-12 overflow-hidden">
                {/* Background image */}
                <img
                  src="https://res.cloudinary.com/iowitz/image/upload/f_auto,q_auto/kadima-logistics/sections/dhl-spotlight"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  loading="lazy"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                {/* DHL Logo */}
                <div className="mb-6">
                  <img
                    src="/logos/dhl.svg"
                    alt="DHL Express"
                    className="h-8 w-auto"
                  />
                </div>

                <div className="space-y-6">
                  {/* Stat Cards */}
                  <div className="bg-navy rounded-[4px] border border-white/10 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-dhl-amber" />
                      <span className="!text-white/90 text-sm">
                        DHL Express Coverage
                      </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-dhl-amber">
                      220+
                    </p>
                    <p className="!text-white/90 text-sm">
                      countries and territories
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-navy rounded-[4px] border border-white/10 p-5">
                      <p className="font-display text-2xl font-bold text-emerald">
                        50–5K
                      </p>
                      <p className="!text-white/90 text-xs mt-1">
                        parcels/month accepted
                      </p>
                    </div>
                    <div className="bg-navy rounded-[4px] border border-white/10 p-5">
                      <p className="font-display text-2xl font-bold text-emerald">
                        0
                      </p>
                      <p className="!text-white/90 text-xs mt-1">
                        broker markups
                      </p>
                    </div>
                  </div>

                  <div className="bg-dhl-amber/5 border border-dhl-amber/20 rounded-[4px] p-4 text-center">
                    <p className="text-dhl-amber text-sm font-semibold">
                      &quot;We get paid when you save — not when you ship.&quot;
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </Container>
    </section>
  );
}
