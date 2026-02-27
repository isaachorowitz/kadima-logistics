"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const AnimationReadyContext = createContext(false);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <AnimationReadyContext value={ready}>
      {children}
    </AnimationReadyContext>
  );
}

export function useAnimationReady() {
  return useContext(AnimationReadyContext);
}
