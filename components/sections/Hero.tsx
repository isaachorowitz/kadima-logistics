import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Package, ArrowRight, TrendingDown, Shield, BarChart3 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-navy min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-grid-pattern" />
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]">
        <div className="absolute inset-0 border-l-2 border-emerald rotate-[25deg] origin-top-left translate-x-40" />
        <div className="absolute inset-0 border-l-2 border-emerald rotate-[25deg] origin-top-left translate-x-60" />
        <div className="absolute inset-0 border-l-2 border-emerald rotate-[25deg] origin-top-left translate-x-80" />
      </div>

      {/* Content */}
      <Container className="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-7">
            {/* DHL Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 bg-dhl-amber/10 border border-dhl-amber/30 rounded-[4px] px-3 py-1.5 mb-8 shadow-[0_0_20px_rgba(255,204,0,0.08)]">
              <Package className="w-4 h-4 text-dhl-amber" />
              <span className="text-dhl-amber text-xs font-semibold tracking-wide uppercase">
                DHL Authorized Reseller
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Stop Overpaying{" "}
              <br className="hidden sm:block" />
              <span className="text-emerald">UPS and FedEx.</span>
            </h1>

            {/* Sub-headline */}
            <p className="animate-fade-in-up-delay-2 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mb-10">
              Kadima audits your invoices, negotiates across every major carrier,
              and locks in rates your business couldn&apos;t access alone.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 mb-10">
              <Button href="#contact" size="lg" variant="primary">
                Get a Free Shipping Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button href="#how-it-works" size="lg" variant="outline">
                See How It Works
              </Button>
            </div>

            {/* Trust Line */}
            <div className="animate-fade-in-up-delay-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                Free shipping audit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                No commitment
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                Most clients save 20–30% annually
              </span>
            </div>
          </div>

          {/* Right: Abstract Data Visual */}
          <div className="hidden lg:block lg:col-span-5 animate-fade-in-up-delay-2">
            <div className="relative">
              {/* Main card */}
              <div className="bg-navy-light/80 backdrop-blur-sm border border-white/[0.08] rounded-[4px] p-8 space-y-5">
                {/* Savings preview card */}
                <div className="bg-navy border border-white/[0.06] rounded-[4px] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Annual Shipping Spend</span>
                    <TrendingDown className="w-4 h-4 text-emerald" />
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="font-display text-3xl font-extrabold text-white">$142,680</span>
                    <span className="text-white/30 text-sm line-through mb-1">$194,200</span>
                  </div>
                  <div className="mt-3 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald to-emerald/60 rounded-full w-[73%]" />
                  </div>
                  <p className="text-emerald text-xs font-semibold mt-2">$51,520 saved annually</p>
                </div>

                {/* Mini stat row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-navy border border-white/[0.06] rounded-[4px] p-4">
                    <Shield className="w-4 h-4 text-dhl-amber mb-2" />
                    <p className="text-white/40 text-[10px] uppercase tracking-wider">DHL Direct</p>
                    <p className="font-display text-lg font-bold text-white mt-0.5">Active</p>
                  </div>
                  <div className="bg-navy border border-white/[0.06] rounded-[4px] p-4">
                    <BarChart3 className="w-4 h-4 text-emerald mb-2" />
                    <p className="text-white/40 text-[10px] uppercase tracking-wider">Rate Tier</p>
                    <p className="font-display text-lg font-bold text-white mt-0.5">GPO+</p>
                  </div>
                </div>

                {/* Carrier optimization line */}
                <div className="bg-emerald/[0.06] border border-emerald/10 rounded-[4px] px-4 py-3 flex items-center justify-between">
                  <span className="text-emerald/80 text-xs font-medium">4 carriers optimized</span>
                  <div className="flex -space-x-1">
                    {["D", "U", "F", "P"].map((letter, i) => (
                      <div
                        key={letter}
                        className="w-6 h-6 rounded-[2px] bg-navy border border-white/10 flex items-center justify-center"
                      >
                        <span className="text-white/60 text-[9px] font-bold">{letter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent dot */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald rounded-full opacity-20 blur-sm" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-dhl-amber rounded-full opacity-10 blur-sm" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
