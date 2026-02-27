"use client";

import { useMemo, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, useBounds, Center, Text } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedBox3DProps {
  length: number;
  width: number;
  height: number;
}

function Box({ length, width, height }: AnimatedBox3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  const displayLength = length || 20;
  const displayWidth = width || 20;
  const displayHeight = height || 20;

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

  const textSize = Math.min(displayLength, displayHeight) * 0.18;
  const textMaxWidth = Math.min(displayLength, displayHeight) * 0.6;

  // Navy-themed texture
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

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main box */}
      <mesh>
        <boxGeometry args={[displayLength, displayHeight, displayWidth]} />
        <meshBasicMaterial map={boxTexture} />
      </mesh>

      {/* Emerald edge highlights */}
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#10B981" linewidth={2} />
      </lineSegments>

      {/* Emerald tape strips on top */}
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

      {/* Kadima text on front face */}
      <Text
        position={[0, 0, displayWidth / 2 + 0.02]}
        fontSize={textSize}
        maxWidth={textMaxWidth}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Kadima
      </Text>

      {/* Kadima text on back face */}
      <Text
        position={[0, 0, -displayWidth / 2 - 0.02]}
        rotation={[0, Math.PI, 0]}
        fontSize={textSize}
        maxWidth={textMaxWidth}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Kadima
      </Text>

      {/* Kadima text on right side */}
      <Text
        position={[displayLength / 2 + 0.02, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={textSize}
        maxWidth={textMaxWidth}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Kadima
      </Text>

      {/* Kadima text on left side */}
      <Text
        position={[-displayLength / 2 - 0.02, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={textSize}
        maxWidth={textMaxWidth}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Kadima
      </Text>
    </group>
  );
}

function FitContent({ length, width, height }: AnimatedBox3DProps) {
  const bounds = useBounds();

  useEffect(() => {
    bounds.refresh().clip().fit();
  }, [bounds, length, width, height]);

  return (
    <Center>
      <Box length={length} width={width} height={height} />
    </Center>
  );
}

export default function AnimatedBox3D({
  length,
  width,
  height,
}: AnimatedBox3DProps) {
  return (
    <div className="w-full h-[280px] lg:h-full lg:min-h-[360px] rounded-[6px] overflow-hidden bg-gradient-to-br from-navy-light/50 to-navy/80 border border-white/10">
      <Canvas
        camera={{
          position: [4, 2, 4],
          fov: 45,
        }}
        dpr={[1, 1.5]}
      >
        <Bounds fit clip observe margin={1.8}>
          <FitContent length={length} width={width} height={height} />
        </Bounds>
      </Canvas>
    </div>
  );
}
