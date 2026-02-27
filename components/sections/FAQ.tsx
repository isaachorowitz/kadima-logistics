import Container from "@/components/ui/Container";
import AccordionItem from "@/components/ui/AccordionItem";

const faqs = [
  {
    question: "I already negotiated rates with my carrier. Can you still help?",
    answer:
      "Almost certainly. Most businesses that come to us have already negotiated — and we still find 15–30% in additional savings. Carrier sales reps optimize for their margin, not yours. We know the unpublished rate tiers, accessorial caps, and surcharge waiver structures that aren't offered unless specifically requested. Our audit will show you exactly what's left on the table.",
  },
  {
    question: "Is Kadima a broker? How are you different?",
    answer:
      "We are not a broker. Brokers add a markup between you and the carrier — you pay more so they can profit on the spread. Kadima is a consulting and negotiation partner: we negotiate directly with carriers on your behalf, and as an authorized DHL reseller, we provide DHL rates directly through an official partnership channel. No hidden markups, no middleman pricing.",
  },
  {
    question: "How does the free shipping audit work?",
    answer:
      "You share your current carrier agreements and recent invoices (we make this easy with a secure upload or direct carrier data pull). Our team analyzes your rates, surcharges, service mix, zone distribution, and package characteristics. Within a few business days, you receive a detailed report showing exactly where you're overpaying and what optimized rates would look like. There's no cost and no obligation to proceed.",
  },
  {
    question: "Will this disrupt my current shipping operations?",
    answer:
      "Zero disruption. We negotiate rate improvements within your existing carrier relationships — we don't require you to switch platforms, change carriers, or modify your fulfillment workflow. When we onboard DHL or a new carrier option, it's additive. Your current operations continue uninterrupted while better rates take effect.",
  },
  {
    question: "What size business do you work with?",
    answer:
      "Businesses shipping anywhere from 50 to 50,000+ parcels per month. Our GPO (group purchasing organization) structure means smaller shippers access volume rate tiers they couldn't qualify for alone, while larger shippers benefit from our deep carrier negotiation expertise and multi-carrier strategy. If you're spending more than $2,000/month on shipping, there's almost certainly money we can save you.",
  },
  {
    question: "How does Kadima make money?",
    answer:
      "Our model aligns with your savings. We earn fees based on the actual cost reductions we deliver — not on your shipping volume or a flat retainer regardless of results. If we don't save you money, our engagement doesn't make financial sense for either of us. That's by design: it means every recommendation we make is genuinely in your interest.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <Container narrow>
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-emerald-text font-semibold text-sm uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading">
            Questions We Hear Most
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y-0">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
