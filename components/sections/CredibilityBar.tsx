import Container from "@/components/ui/Container";
import { Package, Truck, Box, Mail } from "lucide-react";

const carriers = [
  { name: "DHL", icon: Package, highlight: true },
  { name: "UPS", icon: Box },
  { name: "FedEx", icon: Truck },
  { name: "USPS", icon: Mail },
];

export default function CredibilityBar() {
  return (
    <section className="bg-slate-bg border-y border-slate-border py-6">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Carriers */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <span className="text-xs text-body-text/60 uppercase tracking-wider font-medium">
              Trusted carriers:
            </span>
            {carriers.map((carrier) => {
              const Icon = carrier.icon;
              return (
                <div
                  key={carrier.name}
                  className={`flex items-center gap-2 rounded-[2px] px-3 py-1.5 text-sm font-semibold ${
                    carrier.highlight
                      ? "bg-dhl-amber/10 text-heading border border-dhl-amber/20"
                      : "bg-white text-body-text border border-slate-border"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {carrier.name}
                </div>
              );
            })}
          </div>

          {/* Savings Stat */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-text font-display font-bold text-lg">20–30%</span>
            <span className="text-body-text/70">average annual savings</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
