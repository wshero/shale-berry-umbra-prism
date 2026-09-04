import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import {
  type Scenario,
  type StackedLayer,
  coalLayer,
  collapseHf,
  dummyHf,
  saddleScale,
  PILLAR_X,
  PILLAR_Z,
} from "@/lib/sim/model";

type Props = {
  scenario: Scenario;
  stacked: StackedLayer[];
  advance: number;
  hidden: Record<string, boolean>;
  showFracture: boolean;
  showLabels: boolean;
};

function modelSize(scenario: Scenario) {
  const length = PILLAR_X * 2 + scenario.maxAdvance;
  const width = PILLAR_Z * 2 + scenario.faceLength;
  return { length, width };
}

function cutPlanes(scenario: Scenario, advance: number) {
  const cutX = PILLAR_X + Math.max(advance, 90) * 0.46;
  const cutZ = PILLAR_Z + scenario.faceLength * 0.34;
  return { cutX, cutZ };
}

function heightField(
  nxSeg: number,
  nySeg: number,
  advance: number,
  coalTop: number,
  miningHeight: number,
  fillRatio: number,
) {
  const hf = dummyHf(advance, miningHeight, fillRatio);
  const hc = collapseHf(hf, miningHeight);
  const tops: number[] = [];
  const cols: number[] = [];
  for (let j = 0; j <= nySeg; j++) {
    const ny = j / nySeg;
    for (let i = 0; i <= nxSeg; i++) {
      const nx = i / nxSeg;
      const s = saddleScale(nx, ny, advance);
      tops.push(coalTop + hf * s);
      cols.push(coalTop + hc * s);
    }
  }
  return { hf, hc, tops, cols };
}

function bandGeometry(
  nxSeg: number,
  nySeg: number,
  advance: number,
  faceLength: number,
  yBottom: number[],
  yTop: number[],
) {
  const positions: number[] = [];
  const indices: number[] = [];
  const span = Math.max(advance, 1);
  const x0 = PILLAR_X;
  const z0 = PILLAR_Z;
  const cols = nxSeg + 1;
  const push = (x: number, y: number, z: number) => positions.push(x, y, z);

  for (let j = 0; j <= nySeg; j++) {
    const z = z0 + (j / nySeg) * faceLength;
    for (let i = 0; i <= nxSeg; i++) {
      push(x0 + (i / nxSeg) * span, yTop[j * cols + i], z);
    }
  }
  const botOff = (nySeg + 1) * cols;
  for (let j = 0; j <= nySeg; j++) {
    const z = z0 + (j / nySeg) * faceLength;
    for (let i = 0; i <= nxSeg; i++) {
      push(x0 + (i / nxSeg) * span, yBottom[j * cols + i], z);
    }
  }

  const quad = (a: number, b: number, c: number, d: number) => {
    indices.push(a, c, b, b, c, d);
  };
  for (let j = 0; j < nySeg; j++) {
    for (let i = 0; i < nxSeg; i++) {
      const a = j * cols + i;
      quad(a, a + 1, a + cols, a + cols + 1);
      const b = botOff + a;
      quad(b + 1, b, b + cols + 1, b + cols);
    }
  }
  for (let i = 0; i < nxSeg; i++) {
    quad(botOff + i, botOff + i + 1, i, i + 1);
    const b = nySeg * cols + i;
    quad(b, b + 1, botOff + b, botOff + b + 1);
  }
  for (let j = 0; j < nySeg; j++) {
    const l = j * cols;
    const l2 = (j + 1) * cols;
    quad(l, l2, botOff + l, botOff + l2);
    const r = j * cols + nxSeg;
    const r2 = (j + 1) * cols + nxSeg;
    quad(r2, r, botOff + r2, botOff + r);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function sectionStrip(
  xs: number[],
  y0: number[],
  y1: number[],
  z: number,
) {
  const positions: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i < xs.length; i++) {
    positions.push(xs[i], y0[i], z, xs[i], y1[i], z);
  }
  for (let i = 0; i < xs.length - 1; i++) {
    const a = i * 2;
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function Tag({
  position,
  title,
  sub,
  tone = "rock",
}: {
  position: [number, number, number];
  title: string;
  sub?: string;
  tone?: "rock" | "zone" | "coal";
}) {
  const bg =
    tone === "zone"
      ? "rgba(92, 36, 34, 0.92)"
      : tone === "coal"
        ? "rgba(12, 12, 14, 0.92)"
        : "rgba(20, 23, 28, 0.92)";
  return (
    <Html
      position={position}
      center
      sprite
      occlude={false}
      distanceFactor={96}
      zIndexRange={[30, 0]}
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      <div
        className="whitespace-nowrap rounded-md border border-white/15 px-2 py-1 text-[11px] leading-tight text-white shadow-md"
        style={{ background: bg, fontFamily: "Noto Sans SC, sans-serif" }}
      >
        {title}
        {sub ? (
          <span className="ml-1.5 font-mono text-[10px] text-white/70">{sub}</span>
        ) : null}
      </div>
    </Html>
  );
}

function FractureBands({
  advance,
  miningHeight,
  fillRatio,
  coalTop,
  faceLength,
  cutZ,
  showLabels,
}: {
  advance: number;
  miningHeight: number;
  fillRatio: number;
  coalTop: number;
  faceLength: number;
  cutZ: number;
  showLabels: boolean;
}) {
  const nxSeg = 36;
  const nySeg = 22;
  const { hf, hc, tops, cols } = useMemo(
    () => heightField(nxSeg, nySeg, advance, coalTop, miningHeight, fillRatio),
    [advance, coalTop, miningHeight, fillRatio],
  );
  const roof = useMemo(
    () => Array.from({ length: (nxSeg + 1) * (nySeg + 1) }, () => coalTop),
    [coalTop],
  );
  const collapseGeo = useMemo(
    () => bandGeometry(nxSeg, nySeg, advance, faceLength, roof, cols),
    [advance, faceLength, roof, cols],
  );
  const fractureGeo = useMemo(
    () => bandGeometry(nxSeg, nySeg, advance, faceLength, cols, tops),
    [advance, faceLength, cols, tops],
  );

  const zFace = Math.min(cutZ - 0.35, PILLAR_Z + faceLength * 0.33);
  const ny = Math.min(1, Math.max(0, (zFace - PILLAR_Z) / Math.max(faceLength, 1)));
  const profile = useMemo(() => {
    const n = 48;
    const xs: number[] = [];
    const yRoof: number[] = [];
    const yCol: number[] = [];
    const yTop: number[] = [];
    for (let i = 0; i <= n; i++) {
      const nx = i / n;
      const s = saddleScale(nx, ny, advance);
      xs.push(PILLAR_X + nx * Math.max(advance, 1));
      yRoof.push(coalTop);
      yCol.push(coalTop + hc * s);
      yTop.push(coalTop + hf * s);
    }
    return {
      collapse: sectionStrip(xs, yRoof, yCol, zFace),
      fracture: sectionStrip(xs, yCol, yTop, zFace),
      ridge: xs.map(
        (x, i) => [x, yTop[i] + 0.6, zFace] as [number, number, number],
      ),
    };
  }, [advance, coalTop, hf, hc, ny, zFace]);

  if (advance < 6) return null;

  const midX = PILLAR_X + Math.max(advance, 1) * 0.52;
  const sMid = saddleScale(0.52, ny, advance);

  return (
    <group>
      <mesh geometry={collapseGeo} renderOrder={2}>
        <meshStandardMaterial
          color="#4a2422"
          transparent
          opacity={0.72}
          roughness={0.9}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={fractureGeo} renderOrder={3}>
        <meshStandardMaterial
          color="#c45d56"
          transparent
          opacity={0.38}
          roughness={0.45}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={profile.collapse} renderOrder={6}>
        <meshBasicMaterial color="#6a3330" side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={profile.fracture} renderOrder={7}>
        <meshBasicMaterial
          color="#e07a72"
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Line points={profile.ridge} color="#f0d9d4" lineWidth={2} />
      {showLabels ? (
        <>
          <Tag
            position={[midX, coalTop + hf * sMid * 0.78, zFace - 4]}
            title="导水裂隙带"
            sub={`${hf.toFixed(0)} m`}
            tone="zone"
          />
          <Tag
            position={[midX, coalTop + hc * sMid * 0.45, zFace - 4]}
            title="垮落带"
            sub={`${hc.toFixed(0)} m`}
            tone="zone"
          />
        </>
      ) : null}
    </group>
  );
}

function LayerBlock({
  layer,
  length,
  width,
  cutX,
  cutZ,
  showLabels,
  advance,
  faceLength,
}: {
  layer: StackedLayer;
  length: number;
  width: number;
  cutX: number;
  cutZ: number;
  showLabels: boolean;
  advance: number;
  faceLength: number;
}) {
  const h = Math.max(layer.thickness, 0.4);
  const y = (layer.yBottom + layer.yTop) / 2;
  const rightLen = Math.max(length - cutX, 2);
  const backDepth = Math.max(width - cutZ, 2);
  const isCoal = layer.kind === "coal";
  const isAqua = layer.kind === "aquifer";
  const isFloor = layer.kind === "floor" || isCoal;
  const opacity = isFloor ? 1 : isAqua ? 0.58 : 0.46;

  return (
    <group>
      <mesh position={[cutX + rightLen / 2, y, width / 2]} castShadow receiveShadow>
        <boxGeometry args={[rightLen, h, width]} />
        <meshStandardMaterial
          color={layer.color}
          roughness={0.74}
          transparent={!isFloor}
          opacity={opacity}
          depthWrite={isFloor}
          emissive={isAqua ? "#163044" : "#000000"}
          emissiveIntensity={isAqua ? 0.28 : 0}
        />
      </mesh>
      <mesh position={[cutX / 2, y, cutZ + backDepth / 2]} castShadow receiveShadow>
        <boxGeometry args={[cutX, h, backDepth]} />
        <meshStandardMaterial
          color={layer.color}
          roughness={0.74}
          transparent={!isFloor}
          opacity={opacity}
          depthWrite={isFloor}
          emissive={isAqua ? "#163044" : "#000000"}
          emissiveIntensity={isAqua ? 0.28 : 0}
        />
      </mesh>
      <mesh position={[cutX / 2, y, cutZ + 0.12]}>
        <boxGeometry args={[cutX, h, 0.28]} />
        <meshStandardMaterial color={layer.color} roughness={0.42} />
      </mesh>
      <mesh position={[cutX + 0.12, y, cutZ / 2]}>
        <boxGeometry args={[0.28, h, cutZ]} />
        <meshStandardMaterial color={layer.color} roughness={0.42} />
      </mesh>
      {isCoal && advance > 4 ? (
        <mesh
          position={[
            PILLAR_X + advance / 2,
            y,
            PILLAR_Z + faceLength / 2,
          ]}
        >
          <boxGeometry args={[advance, h * 0.88, faceLength]} />
          <meshStandardMaterial color="#080809" transparent opacity={0.55} />
        </mesh>
      ) : null}
      {showLabels ? (
        <Tag
          position={[cutX - 2, y, Math.max(10, cutZ * 0.42)]}
          title={layer.name}
          sub={`${layer.thickness.toFixed(0)} m`}
          tone={isCoal ? "coal" : "rock"}
        />
      ) : null}
    </group>
  );
}

function Strata(props: Props) {
  const { stacked, hidden, showLabels, showFracture, scenario, advance } = props;
  const { length, width } = modelSize(scenario);
  const coal = coalLayer(stacked);
  const { cutX, cutZ } = cutPlanes(scenario, advance);

  return (
    <group>
      {stacked.map((layer) =>
        hidden[layer.id] ? null : (
          <LayerBlock
            key={layer.id}
            layer={layer}
            length={length}
            width={width}
            cutX={cutX}
            cutZ={cutZ}
            showLabels={showLabels}
            advance={advance}
            faceLength={scenario.faceLength}
          />
        ),
      )}
      {showFracture && !hidden[coal.id] ? (
        <FractureBands
          advance={advance}
          miningHeight={scenario.miningHeight}
          fillRatio={scenario.fillRatio}
          coalTop={coal.yTop}
          faceLength={scenario.faceLength}
          cutZ={cutZ}
          showLabels={showLabels}
        />
      ) : null}
    </group>
  );
}

export function MineViewport(props: Props) {
  const { scenario, stacked, advance } = props;
  const { length, width } = modelSize(scenario);
  const coal = coalLayer(stacked);
  const { cutX, cutZ } = cutPlanes(scenario, advance);
  const target: [number, number, number] = [cutX + 36, coal.yTop + 22, cutZ + 28];

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [cutX - 175, coal.yTop + 92, cutZ - 205],
        fov: 36,
        near: 1,
        far: 4000,
      }}
      gl={{ antialias: true, alpha: false, localClippingEnabled: true }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color("#0c0e11");
        scene.fog = new THREE.Fog("#0c0e11", 650, 2000);
      }}
    >
      <ambientLight intensity={0.52} />
      <hemisphereLight args={["#d5dbe0", "#2c2822", 0.6]} />
      <directionalLight position={[80, 280, -100]} intensity={1.15} castShadow />
      <Strata {...props} />
      <Grid
        position={[length / 2, 0.02, width / 2]}
        args={[length + 60, width + 60]}
        cellSize={20}
        cellThickness={0.55}
        cellColor="#2a2d32"
        sectionSize={100}
        sectionThickness={1}
        sectionColor="#3d4248"
        fadeDistance={1300}
        fadeStrength={1}
      />
      <OrbitControls
        makeDefault
        target={target}
        minDistance={60}
        maxDistance={1500}
        maxPolarAngle={Math.PI / 2.05}
        enableDamping
      />
    </Canvas>
  );
}
