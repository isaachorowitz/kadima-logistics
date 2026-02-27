"use client";

import { motion, useReducedMotion } from "motion/react";
import { useAnimationReady } from "./AnimationProvider";

type ScaleInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function ScaleIn({
  children,
  delay = 0,
  className,
}: ScaleInProps) {
  const ready = useAnimationReady();
  const shouldReduce = useReducedMotion();

  if (!ready || shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
