import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { TrendingUp, FileWarning, Scale } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        {/* Section Header */}
        <FadeUp>
          <div className="max-w-2xl mb-16">
            <p className="text-emerald-text font-semibold text-sm uppercase tracking-wider mb-3">
              The Problem
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mb-4">
              Your Carriers Are Charging Too Much.{" "}
              <span className="text-emerald-text">We Have Proof.</span>
            </h2>
          </div>
        </FadeUp>

        {/* Asymmetric 2fr/1fr Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Pain — takes 2 columns */}
          <FadeUp delay={0.1} className="lg:col-span-2">
            <div className="bg-navy rounded-[4px] p-8 lg:p-12 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-12 h-12 bg-emerald/10 rounded-[4px] flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold !text-white mb-4">
                  Annual Rate Increases Are Eating Your Margins
                </h3>
                <p className="!text-white/90 text-lg leading-relaxed max-w-lg">
                  UPS and FedEx raise general rates 5.9% every year — and buried
                  accessorial surcharges climb even faster. Without expert
                  negotiation, your shipping costs compound year after year while
                  your rates stay locked at whatever you accepted when you signed
                  up.
                </p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-extrabold text-emerald">
                    5.9%
                  </span>
                  <span className="!text-white/80 text-sm">
                    avg. annual GRI increase (2024)
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Secondary Pains — stacked right column */}
          <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.1}>
            <StaggerItem className="flex-1">
              <div className="bg-slate-bg rounded-[4px] p-6 lg:p-8 h-full border border-slate-border">
                <div className="w-10 h-10 bg-navy/5 rounded-[4px] flex items-center justify-center mb-4">
                  <FileWarning className="w-5 h-5 text-navy" />
                </div>
                <h3 className="font-display text-lg font-bold text-heading mb-2">
                  Hidden Accessorial Fees
                </h3>
                <p className="text-body-text text-sm leading-relaxed">
                  Residential surcharges, address corrections, dimensional weight
                  adjustments — carriers add fees most businesses never contest.
                  Our audits routinely find $2,000–$5,000 in monthly overcharges
                  hiding in plain sight.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="flex-1">
              <div className="bg-slate-bg rounded-[4px] p-6 lg:p-8 h-full border border-slate-border">
                <div className="w-10 h-10 bg-navy/5 rounded-[4px] flex items-center justify-center mb-4">
                  <Scale className="w-5 h-5 text-navy" />
                </div>
                <h3 className="font-display text-lg font-bold text-heading mb-2">
                  No Leverage Alone
                </h3>
                <p className="text-body-text text-sm leading-relaxed">
                  Carriers know exactly what you ship, where, and how often. They
                  price accordingly. Without multi-carrier competition and GPO
                  volume behind you, you&apos;re negotiating from a position of
                  weakness.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
