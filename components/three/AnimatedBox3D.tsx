"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AnimatedBox3DProps {
  length: number;
  width: number;
  height: number;
  className?: string;
}

interface SceneDimensions {
  length: number;
  width: number;
  height: number;
}

const MIN_REALISTIC_BOX_INCHES = 2;
const MAX_REALISTIC_BOX_INCHES = 60;
const MIN_PREVIEW_MAX_DIMENSION = 0.85;
const MAX_PREVIEW_MAX_DIMENSION = 2.35;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

function toSceneDimensions({
  length,
  width,
  height,
}: AnimatedBox3DProps): SceneDimensions {
  const safeLength = Number.isFinite(length) && length > 0 ? length : 20;
  const safeWidth = Number.isFinite(width) && width > 0 ? width : 20;
  const safeHeight = Number.isFinite(height) && height > 0 ? height : 20;

  const maxDimension = Math.max(safeLength, safeWidth, safeHeight, 1);
  const characteristicSize = Math.cbrt(safeLength * safeWidth * safeHeight);

  // Blend longest side and volume-equivalent size to keep scaling realistic for both cubes and elongated packages.
  const effectiveInches = Math.sqrt(maxDimension * characteristicSize);
  const clampedEffectiveInches = clamp(
    effectiveInches,
    MIN_REALISTIC_BOX_INCHES,
    MAX_REALISTIC_BOX_INCHES
  );

  const minLog = Math.log(MIN_REALISTIC_BOX_INCHES);
  const maxLog = Math.log(MAX_REALISTIC_BOX_INCHES);
  const logPosition = (Math.log(clampedEffectiveInches) - minLog) / (maxLog - minLog);
  const normalizedPosition = clamp(logPosition, 0, 1);

  const targetMaxDimension = lerp(
    MIN_PREVIEW_MAX_DIMENSION,
    MAX_PREVIEW_MAX_DIMENSION,
    normalizedPosition
  );

  const scale = targetMaxDimension / maxDimension;

  return {
    length: safeLength * scale,
    width: safeWidth * scale,
    height: safeHeight * scale,
  };
}

function BoxFallbackContent() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-[6px] border-2 border-emerald/60 bg-emerald/10" />
        <div className="absolute top-2 left-1/2 h-20 w-[2px] -translate-x-1/2 bg-emerald/50" />
        <div className="absolute top-1/2 left-2 h-[2px] w-24 -translate-y-1/2 bg-emerald/50" />
      </div>
    </div>
  );
}

function Box({ length, width, height }: AnimatedBox3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  const sceneDimensions = useMemo(
    () => toSceneDimensions({ length, width, height }),
    [length, width, height]
  );

  const displayLength = sceneDimensions.length;
  const displayWidth = sceneDimensions.width;
  const displayHeight = sceneDimensions.height;

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const edgeGeometry = useMemo(() => {
    const geometry = new THREE.BoxGeometry(
      displayLength,
      displayHeight,
      displayWidth
    );
    return new THREE.EdgesGeometry(geometry);
  }, [displayLength, displayWidth, displayHeight]);

  useEffect(() => {
    return () => {
      edgeGeometry.dispose();
    };
  }, [edgeGeometry]);

  const boxTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Navy base
    ctx.fillStyle = "#0D1F3C";
    ctx.fillRect(0, 0, 512, 512);

    // Subtle texture variation
    for (let i = 0; i < 800; i++) {
      const r = 13 + ((i * 7 + 11) % 15);
      const g = 31 + ((i * 13 + 17) % 15);
      const b = 60 + ((i * 19 + 23) % 20);
      const x = (i * 17 + 5) % 512;
      const y = (i * 23 + 7) % 512;
      const s = 1 + (i % 3);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
      ctx.fillRect(x, y, s, s);
    }

    ctx.fillStyle = "rgba(16, 185, 129, 0.38)";
    ctx.fillRect(220, 0, 72, 512);
    ctx.fillRect(0, 220, 512, 72);

    ctx.fillStyle = "rgba(16, 185, 129, 0.72)";
    ctx.font = "bold 58px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("KADIMA", 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    return texture;
  }, []);

  useEffect(() => {
    return () => {
      boxTexture.dispose();
    };
  }, [boxTexture]);

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[displayLength, displayHeight, displayWidth]} />
        <meshStandardMaterial map={boxTexture} metalness={0.08} roughness={0.74} />
      </mesh>

      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#10B981" />
      </lineSegments>

      <mesh
        position={[0, displayHeight / 2 + 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[displayLength * 0.15, displayWidth]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.6} />
      </mesh>

      <mesh
        position={[0, displayHeight / 2 + 0.01, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        <planeGeometry args={[displayLength * 0.15, displayLength]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function AnimatedBox3D({
  length,
  width,
  height,
  className,
}: AnimatedBox3DProps) {
  const containerClasses =
    className ??
    "w-full h-[280px] lg:h-full lg:min-h-[360px] rounded-[6px] overflow-hidden bg-gradient-to-br from-navy-light/50 to-navy/80 border border-white/10";

  return (
    <div className={containerClasses}>
      <Canvas
        camera={{
          position: [4.8, 3.4, 4.8],
          fov: 44,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        fallback={<BoxFallbackContent />}
      >
        <ambientLight intensity={0.68} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#E5EFFD" />
        <directionalLight position={[-2, -1, -3]} intensity={0.35} color="#93C5FD" />
        <Box length={length} width={width} height={height} />
      </Canvas>
    </div>
  );
}
