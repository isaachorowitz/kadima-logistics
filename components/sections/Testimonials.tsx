"use client";

import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "We were running $17,400 a month through FedEx. Kadima's audit flagged $2,187 in billing errors in the first 74 days — residential surcharges we'd never contested, address correction fees on shipments that were correct. After negotiation, we're at $13,080/month. That's more than $51,000 back in the first year.",
    name: "Mariana Ferreira",
    role: "VP of Operations",
    company: "Orthopedic supply distributor, 9 states",
    highlight: "$4,320/mo saved",
  },
  {
    quote:
      "Shipping was eating 18.4% of our revenue. SFP requires Prime badge eligibility, and the margin math stopped working. Kadima cut it to 12.1% without switching a single carrier. That's six recoverable points — on a consumer goods brand, that's the difference between reinvesting in inventory and standing still.",
    name: "Jake Oliphant",
    role: "Founder",
    company: "Premium pet care brand, Amazon SFP seller",
    highlight: "6.3 points of margin recovered",
  },
  {
    quote:
      "I assumed GPO pricing was for companies ten times our size. Kadima put us on their group plan and we immediately landed UPS rate tiers we were probably three or four years away from qualifying for on our own. Our per-label cost dropped 22% on the first billing cycle.",
    name: "Greg Westhoff",
    role: "Owner",
    company: "Industrial packaging distributor, Midwest, ~280 parcels/month",
    highlight: "22% per-label reduction",
  },
  {
    quote:
      "We had no idea we were being double-charged for dimensional weight adjustments on 40% of our shipments. Kadima caught it in week two. Between the refund recovery and the renegotiated DAS surcharges, we freed up $38,000 annually — that went straight back into marketing spend.",
    name: "Priya Anand",
    role: "Director of Finance",
    company: "Health & wellness DTC brand, 1,200+ orders/month",
    highlight: "$38K/yr recovered",
  },
  {
    quote:
      "Our three warehouses were each negotiating carrier rates independently. Kadima consolidated our volume onto a single agreement and we dropped from $6.82 to $4.91 average cost per label. Across 14,000 monthly shipments, that's almost $27,000 a month we were leaving on the table.",
    name: "Derek Hollis",
    role: "COO",
    company: "Auto parts e-commerce, 3 fulfillment centers",
    highlight: "$26,740/mo saved",
  },
  {
    quote:
      "We switched to Kadima after our previous 3PL renegotiation yielded a 3% discount. Kadima's team came back with 17% off base rates plus eliminated our peak season surcharges entirely. For a seasonal business doing 60% of volume in Q4, that peak surcharge removal alone saved us $9,200 last holiday season.",
    name: "Rachel Nguyen",
    role: "Head of Supply Chain",
    company: "Gift & home décor brand, seasonal volume",
    highlight: "17% off base + no peak surcharges",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="w-[400px] sm:w-[440px] flex-shrink-0 mx-3">
      <div className="bg-white rounded-[4px] border border-slate-border p-8 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-emerald/20 mb-4 flex-shrink-0" />

        {/* Quote */}
        <blockquote className="text-body-text text-sm leading-relaxed flex-1 mb-6">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        {/* Highlight Stat */}
        <div className="bg-emerald/5 rounded-[4px] px-3 py-2 mb-6 inline-block">
          <span className="text-emerald-text font-display font-bold text-sm">
            {t.highlight}
          </span>
        </div>

        {/* Attribution */}
        <div className="border-t border-slate-border pt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-navy to-navy-light rounded-[4px] border border-white/10 flex items-center justify-center shrink-0">
              <span className="font-display text-emerald font-bold text-sm">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-heading">
                {t.name}
              </p>
              <p className="text-xs text-body-text/70">
                {t.role}, {t.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-slate-bg overflow-hidden">
      <Container>
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-emerald-text font-semibold text-sm uppercase tracking-wider mb-3">
              Client Results
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-heading">
              Real Savings. Real Businesses.
            </h2>
          </div>
        </FadeUp>
      </Container>

      {/* Marquee - full width, no container constraint */}
      <div
        className="marquee-wrapper group"
        aria-label="Client testimonials scrolling carousel"
      >
        <div className="marquee-track">
          {/* First set */}
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
          {/* Duplicate for seamless loop */}
          {testimonials.map((t) => (
            <TestimonialCard key={`dup-${t.name}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
