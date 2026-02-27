"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroBackground from "@/components/sections/HeroBackground";
import SlideIn from "@/components/animations/SlideIn";
import { useAnimationReady } from "@/components/animations/AnimationProvider";
import { ArrowRight, Zap } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Hero() {
  const ready = useAnimationReady();

  return (
    <section className="relative bg-navy min-h-[100vh] flex items-center overflow-hidden">
      <HeroBackground />

      <Container className="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6">
            {/* Headline */}
            {ready ? (
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold !text-white leading-[1.05] tracking-tight mb-6"
              >
                Your Carriers Are{" "}
                <br className="hidden sm:block" />
                Overcharging You.{" "}
                <br className="hidden lg:block" />
                <span className="text-emerald">We Have the Data.</span>
              </motion.h1>
            ) : (
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold !text-white leading-[1.05] tracking-tight mb-6">
                Your Carriers Are{" "}
                <br className="hidden sm:block" />
                Overcharging You.{" "}
                <br className="hidden lg:block" />
                <span className="text-emerald">We Have the Data.</span>
              </h1>
            )}

            {/* Sub-headline */}
            {ready ? (
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="text-lg sm:text-xl !text-white/90 leading-relaxed max-w-xl mb-10"
              >
                Free shipping audit reveals exactly how much you&apos;re overpaying
                — and we negotiate the rates to fix it. DHL, UPS, FedEx, and USPS.
              </motion.p>
            ) : (
              <p className="text-lg sm:text-xl !text-white/90 leading-relaxed max-w-xl mb-10">
                Free shipping audit reveals exactly how much you&apos;re overpaying
                — and we negotiate the rates to fix it. DHL, UPS, FedEx, and USPS.
              </p>
            )}

            {/* CTAs */}
            {ready ? (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10"
              >
                <Button href="#contact" size="lg" variant="primary">
                  Get Your Free Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button href="#calculator" size="lg" variant="outline">
                  <Zap className="w-4 h-4 mr-2" />
                  Compare Live Rates
                </Button>
                <Button href="#how-it-works" size="lg" variant="ghost" className="!text-white/70 hover:!text-white">
                  See How It Works
                </Button>
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
                <Button href="#contact" size="lg" variant="primary">
                  Get Your Free Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button href="#calculator" size="lg" variant="outline">
                  <Zap className="w-4 h-4 mr-2" />
                  Compare Live Rates
                </Button>
                <Button href="#how-it-works" size="lg" variant="ghost" className="!text-white/70 hover:!text-white">
                  See How It Works
                </Button>
              </div>
            )}

            {/* Trust Line */}
            {ready ? (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease }}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 !text-white/90 text-sm"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                  Free audit
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                  No commitment
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                  Most save 20–30% annually
                </span>
              </motion.div>
            ) : (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 !text-white/90 text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                  Free audit
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                  No commitment
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                  Most save 20–30% annually
                </span>
              </div>
            )}
          </div>

          {/* Right: Tall Portrait Video Panel (9:16 Reels-style) */}
          <SlideIn
            direction="right"
            delay={0.15}
            className="hidden lg:flex lg:col-span-6 items-start justify-center"
          >
            <div className="relative w-full max-w-[380px] mx-auto aspect-[9/16] rounded-[8px] border border-white/10 overflow-hidden shadow-2xl shadow-black/30">
              {/* Video element — shows when file exists */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>

              {/* Multi-layer gradient overlay for cinematic fade */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Top fade — blends into hero bg */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy/80 to-transparent" />
                {/* Bottom fade — blends into hero bg */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                {/* Left edge fade — smooth blend with content side */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-navy/50 to-transparent" />
                {/* Overall subtle tint */}
                <div className="absolute inset-0 bg-navy/15" />
              </div>

              {/* Kadima branding overlay on video */}
              <div className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center justify-center">
                <p className="font-display text-2xl font-bold text-white/80 tracking-widest uppercase">
                  Kadima
                </p>
                <p className="text-emerald/60 text-xs font-semibold tracking-[0.3em] uppercase mt-1">
                  Logistics
                </p>
              </div>

              {/* Subtle grid overlay */}
              <div className="absolute inset-0 hero-grid-pattern opacity-20 z-10 pointer-events-none" />

              {/* Decorative emerald corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald/40 rounded-tl-[2px] z-30" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald/40 rounded-tr-[2px] z-30" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-emerald/40 rounded-bl-[2px] z-30" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-emerald/40 rounded-br-[2px] z-30" />

              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-[8px] ring-1 ring-inset ring-white/5 z-30 pointer-events-none" />
            </div>
          </SlideIn>
        </div>
      </Container>
    </section>
  );
}
