import Container from "@/components/ui/Container";

export default function BlogHeader() {
  return (
    <section className="bg-navy pt-32 pb-16 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald/10 border border-emerald/20 rounded-[4px] px-3 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 bg-emerald rounded-full" />
            <span className="text-emerald text-xs font-display font-semibold uppercase tracking-wider">
              Shipping Insights
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Blog
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            Expert insights on shipping cost optimization, carrier negotiations,
            and logistics strategy for businesses of every size.
          </p>
        </div>
      </Container>
    </section>
  );
}
