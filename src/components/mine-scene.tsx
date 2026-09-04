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

function heightField(
  nxSeg: number,
  nySeg: number,
  advance: number,
  faceLength: number,
  coalTop: number,
  miningHeight: number,
  fillRatio: number,
) {
  const hf = dummyHf(advance, miningHeight, fillRatio);
  const hc = collapseHf(hf, miningHeight);
  const span = Math.max(advance, 1);
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
  return { hf, hc, span, tops, cols };
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
      const x = x0 + (i / nxSeg) * span;
      const idx = j * cols + i;
      push(x, yTop[idx], z);
    }
  }
  const botOff = (nySeg + 1) * cols;
  for (let j = 0; j <= nySeg; j++) {
    const z = z0 + (j / nySeg) * faceLength;
    for (let i = 0; i <= nxSeg; i++) {
      const x = x0 + (i / nxSeg) * span;
      const idx = j * cols + i;
      push(x, yBottom[idx], z);
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
    const f = i;
    const f2 = i + 1;
    quad(botOff + f, botOff + f2, f, f2);
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

function FractureBands({
  advance,
  miningHeight,
  fillRatio,
  coalTop,
  faceLength,
}: {
  advance: number;
  miningHeight: number;
  fillRatio: number;
  coalTop: number;
  faceLength: number;
}) {
  const nxSeg = 36;
  const nySeg = 22;
  const { tops, cols } = useMemo(
    () =>
      heightField(nxSeg, nySeg, advance, faceLength, coalTop, miningHeight, fillRatio),
    [advance, faceLength, coalTop, miningHeight, fillRatio],
  );
  const roof = useMemo(
    () => Array.from({ length: (nxSeg + 1) * (nySeg + 1) }, () => coalTop),
    [coalTop, nxSeg, nySeg],
  );
  const collapseGeo = useMemo(
    () => bandGeometry(nxSeg, nySeg, advance, faceLength, roof, cols),
    [advance, faceLength, roof, cols],
  );
  const fractureGeo = useMemo(
    () => bandGeometry(nxSeg, nySeg, advance, faceLength, cols, tops),
    [advance, faceLength, cols, tops],
  );
  const ridge = useMemo(() => {
    const hf = dummyHf(advance, miningHeight, fillRatio);
    const zCut = PILLAR_Z + faceLength * 0.22;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 48; i++) {
      const nx = i / 48;
      const x = PILLAR_X + nx * Math.max(advance, 1);
      pts.push([x, coalTop + hf * saddleScale(nx, 0.22, advance) + 0.4, zCut]);
    }
    return pts;
  }, [advance, miningHeight, fillRatio, coalTop, faceLength]);

  if (advance < 6) return null;
  return (
    <group>
      <mesh geometry={collapseGeo} renderOrder={3}>
        <meshStandardMaterial
          color="#5c2e2c"
          transparent
          opacity={0.78}
          roughness={0.85}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={fractureGeo} renderOrder={4}>
        <meshStandardMaterial
          color="#c45d56"
          transparent
          opacity={0.48}
          roughness={0.4}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Line points={ridge} color="#edd4d0" lineWidth={1.8} transparent opacity={0.95} />
    </group>
  );
}

function Strata(props: Props) {
  const { stacked, hidden, showLabels, showFracture, scenario, advance } = props;
  const { length, width } = modelSize(scenario);
  const coal = coalLayer(stacked);
  const cutX = PILLAR_X + Math.max(advance, 60) * 0.55;
  const cutZ = PILLAR_Z + scenario.faceLength * 0.38;
  const keepLen = Math.max(length - cutX, 28);
  const keepDepth = Math.max(width - cutZ, 28);
  const keepX = cutX + keepLen / 2;
  const keepZ = cutZ + keepDepth / 2;

  return (
    <group>
      {stacked.map((layer) => {
        if (hidden[layer.id]) return null;
        const h = Math.max(layer.thickness, 0.35);
        const y = (layer.yBottom + layer.yTop) / 2;
        const isCoal = layer.kind === "coal";
        const isAqua = layer.kind === "aquifer";
        const isFloor = layer.kind === "floor" || isCoal;
        const opacity = isFloor ? 1 : isAqua ? 0.55 : 0.5;

        return (
          <group key={layer.id}>
            <mesh position={[keepX, y, keepZ]} castShadow receiveShadow>
              <boxGeometry args={[keepLen, h, keepDepth]} />
              <meshStandardMaterial
                color={layer.color}
                roughness={0.72}
                transparent={!isFloor}
                opacity={opacity}
                depthWrite={isFloor}
                emissive={isAqua ? "#163044" : "#000000"}
                emissiveIntensity={isAqua ? 0.25 : 0}
              />
            </mesh>
            <mesh position={[keepX, y, cutZ + 0.15]}>
              <boxGeometry args={[keepLen, h, 0.3]} />
              <meshStandardMaterial color={layer.color} roughness={0.5} />
            </mesh>
            <mesh position={[cutX + 0.15, y, keepZ]}>
              <boxGeometry args={[0.3, h, keepDepth]} />
              <meshStandardMaterial color={layer.color} roughness={0.5} />
            </mesh>
            {isCoal && advance > 4 ? (
              <mesh position={[PILLAR_X + advance / 2, y, PILLAR_Z + scenario.faceLength / 2]}>
                <boxGeometry args={[advance, h * 0.85, scenario.faceLength]} />
                <meshStandardMaterial color="#080809" transparent opacity={0.4} />
              </mesh>
            ) : null}
            {showLabels ? (
              <Html position={[length + 12, y, keepZ]} center style={{ pointerEvents: "none" }}>
                <div className="whitespace-nowrap rounded-sm border border-border bg-card/90 px-2 py-1 text-[10px] text-foreground">
                  {layer.name}
                  <span className="ml-1 text-muted-foreground">{layer.thickness} m</span>
                </div>
              </Html>
            ) : null}
          </group>
        );
      })}
      {showFracture && !hidden[coal.id] ? (
        <FractureBands
          advance={advance}
          miningHeight={scenario.miningHeight}
          fillRatio={scenario.fillRatio}
          coalTop={coal.yTop}
          faceLength={scenario.faceLength}
        />
      ) : null}
    </group>
  );
}

export function MineViewport(props: Props) {
  const { scenario, stacked, advance } = props;
  const { length, width } = modelSize(scenario);
  const coal = coalLayer(stacked);
  const cutX = PILLAR_X + Math.max(advance, 60) * 0.55;
  const cutZ = PILLAR_Z + scenario.faceLength * 0.38;
  const target: [number, number, number] = [cutX + 70, coal.yTop + 28, cutZ + 50];

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [cutX - 210, coal.yTop + 115, cutZ - 230],
        fov: 38,
        near: 1,
        far: 4000,
      }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color("#0c0e11");
        scene.fog = new THREE.Fog("#0c0e11", 700, 2100);
      }}
    >
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#d5dbe0", "#2c2822", 0.58]} />
      <directionalLight position={[60, 260, -120]} intensity={1.2} castShadow />
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
        minDistance={70}
        maxDistance={1500}
        maxPolarAngle={Math.PI / 2.08}
        enableDamping
      />
    </Canvas>
  );
}
