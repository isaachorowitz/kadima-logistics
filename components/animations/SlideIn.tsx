"use client";

import { motion, useReducedMotion } from "motion/react";
import { useAnimationReady } from "./AnimationProvider";

type SlideInProps = {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
};

export default function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className,
}: SlideInProps) {
  const ready = useAnimationReady();
  const shouldReduce = useReducedMotion();
  const x = direction === "left" ? -48 : 48;

  if (!ready || shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
