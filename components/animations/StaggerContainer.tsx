"use client";

import { motion, useReducedMotion } from "motion/react";
import { useAnimationReady } from "./AnimationProvider";

const containerVariants = (staggerDelay: number) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: staggerDelay },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

type ContainerProps = {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
};

export default function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
}: ContainerProps) {
  const ready = useAnimationReady();
  const shouldReduce = useReducedMotion();

  if (!ready || shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ready = useAnimationReady();

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
