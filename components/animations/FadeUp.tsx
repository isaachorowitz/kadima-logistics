"use client";

import { motion, useReducedMotion } from "motion/react";
import { useAnimationReady } from "./AnimationProvider";

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  triggerOnLoad?: boolean;
};

export default function FadeUp({
  children,
  delay = 0,
  className,
  triggerOnLoad = false,
}: FadeUpProps) {
  const ready = useAnimationReady();
  const shouldReduce = useReducedMotion();

  if (!ready || shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  if (triggerOnLoad) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
