import Container from "@/components/ui/Container";
import SlideIn from "@/components/animations/SlideIn";
import FadeUp from "@/components/animations/FadeUp";

const carriers = [
  { name: "DHL", logo: "/logos/dhl.svg", highlight: true },
  { name: "UPS", logo: "/logos/ups.svg" },
  { name: "FedEx", logo: "/logos/fedex.svg" },
  { name: "USPS", logo: "/logos/usps.svg" },
];

export default function CredibilityBar() {
  return (
    <section className="bg-slate-bg border-y border-slate-border py-6">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Carriers */}
          <SlideIn direction="left">
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <span className="text-xs text-body-text/60 uppercase tracking-wider font-medium">
                Trusted carriers:
              </span>
              {carriers.map((carrier) => (
                <div
                  key={carrier.name}
                  className={`group flex items-center gap-2 rounded-[2px] px-3 py-1.5 transition-all duration-300 ${
                    carrier.highlight
                      ? "bg-dhl-amber/10 border border-dhl-amber/20"
                      : "bg-white border border-slate-border"
                  }`}
                >
                  <img
                    src={carrier.logo}
                    alt={carrier.name}
                    className="h-5 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </SlideIn>

          {/* Savings Stat */}
          <FadeUp delay={0.2}>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-emerald-text font-display font-bold text-lg">
                20–30%
              </span>
              <span className="text-body-text/70">average annual savings</span>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
