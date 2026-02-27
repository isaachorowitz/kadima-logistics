"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useAnimationReady } from "@/components/animations/AnimationProvider";

export default function HeroBackground() {
  const ready = useAnimationReady();
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 600], [0, -80]);
  const orb2Y = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <>
      <div className="absolute inset-0 hero-grid-pattern" />
      {ready ? (
        <>
          <motion.div className="hero-orb-1" style={{ y: orb1Y }} />
          <motion.div className="hero-orb-2" style={{ y: orb2Y }} />
        </>
      ) : (
        <>
          <div className="hero-orb-1" />
          <div className="hero-orb-2" />
        </>
      )}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]">
        <div className="absolute inset-0 border-l-2 border-emerald rotate-[25deg] origin-top-left translate-x-40" />
        <div className="absolute inset-0 border-l-2 border-emerald rotate-[25deg] origin-top-left translate-x-60" />
        <div className="absolute inset-0 border-l-2 border-emerald rotate-[25deg] origin-top-left translate-x-80" />
      </div>
    </>
  );
}
