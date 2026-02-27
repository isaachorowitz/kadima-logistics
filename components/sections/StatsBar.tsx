"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

const stats = [
  {
    value: 30,
    suffix: "%",
    prefix: "Up to ",
    label:
      "Average annual shipping cost reduction for Kadima clients across all carriers",
  },
  {
    value: 4,
    suffix: "",
    prefix: "",
    label:
      "Major carriers negotiated — DHL, UPS, FedEx, and USPS, plus regional options",
  },
  {
    value: 10,
    suffix: "×",
    prefix: "",
    label:
      "GPO volume multiplier — access rate tiers that require 10× your actual shipment volume",
  },
];

function AnimatedNumber({
  value,
  suffix,
  prefix,
  isVisible,
}: {
  value: number;
  suffix: string;
  prefix: string;
  isVisible: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!isVisible) return;
    if (reducedMotion) {
      setCurrent(value);
      return;
    }

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCurrent(start);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, value, reducedMotion]);

  return (
    <span className="font-display text-5xl sm:text-6xl font-extrabold text-emerald tabular-nums">
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <FadeUp>
      <section ref={sectionRef} className="py-20 lg:py-24 bg-navy-dark">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  isVisible={isInView}
                />
                <p className="mt-3 !text-white/90 text-sm leading-relaxed max-w-xs mx-auto">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </FadeUp>
  );
}
