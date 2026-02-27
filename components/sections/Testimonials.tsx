import Container from "@/components/ui/Container";
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
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-slate-bg">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-emerald-text font-semibold text-sm uppercase tracking-wider mb-3">
            Client Results
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-heading">
            Real Savings. Real Businesses.
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-[4px] border border-slate-border p-8 flex flex-col hover:shadow-md transition-shadow duration-200"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-emerald/20 mb-4" />

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
                  {/* Avatar initial */}
                  <div className="w-10 h-10 bg-navy rounded-[4px] flex items-center justify-center shrink-0">
                    <span className="font-display text-white font-bold text-sm">
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
          ))}
        </div>
      </Container>
    </section>
  );
}
