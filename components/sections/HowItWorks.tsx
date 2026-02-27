import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { ClipboardCheck, LineChart, PiggyBank, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Free Audit",
    description:
      "We review your current carrier agreements, invoices, and shipping data. No cost, no commitment — just a clear picture of where you're overpaying and by how much.",
  },
  {
    number: "02",
    icon: LineChart,
    title: "Custom Strategy",
    description:
      "Based on your volume, zones, and service mix, we build a multi-carrier optimization plan. This includes GPO rate access, DHL onboarding, and targeted surcharge reductions.",
  },
  {
    number: "03",
    icon: PiggyBank,
    title: "Start Saving",
    description:
      "We negotiate directly with carriers on your behalf and implement your new rates. Most clients see 20–30% annual savings with zero disruption to their current operations.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-bg">
      <Container>
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-emerald-text font-semibold text-sm uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mb-4">
              Negotiate Once.{" "}
              <span className="text-emerald-text">Save Every Shipment.</span>
            </h2>
            <p className="text-body-text text-lg">
              Three steps between you and lower shipping costs. We handle the
              complexity.
            </p>
          </div>
        </FadeUp>

        {/* Steps */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          staggerDelay={0.12}
        >
          {/* Connector Line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-slate-border" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.number} className="relative text-center">
                {/* Icon Badge */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 bg-navy rounded-[4px] mb-6 z-10">
                  <Icon className="w-6 h-6 text-emerald" />
                </div>
                {/* Step Number — z-20 above icon badge z-10 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 z-20 font-display text-sm font-bold text-emerald-text bg-slate-bg px-2 py-0.5">
                  {step.number}
                </div>
                <h3 className="font-display text-xl font-bold text-heading mb-3">
                  {step.title}
                </h3>
                <p className="text-body-text text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.2}>
          <div className="text-center mt-14">
            <Button href="#contact" variant="primary" size="lg">
              Start Your Free Audit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
