export type LithologyClass = "hard" | "medium" | "soft";

export type LayerKind =
  | "loose"
  | "aquitard"
  | "aquifer"
  | "key"
  | "rock"
  | "coal"
  | "floor";

export type Layer = {
  id: string;
  name: string;
  thickness: number;
  color: string;
  kind: LayerKind;
  density: number;
  youngs: number;
  poisson: number;
  cohesion: number;
  friction: number;
  tensile: number;
  permeability: string;
  notes: string;
};

export type Scenario = {
  mine: string;
  workface: string;
  miningHeight: number;
  faceLength: number;
  maxAdvance: number;
  buriedDepth: number;
  dip: number;
  lithology: LithologyClass;
  fillRatio: number;
  constitutive: string;
  meshSize: number;
  solver: string;
};

export const DEFAULT_SCENARIO: Scenario = {
  mine: "兖矿集团 · 演示煤矿",
  workface: "1306 综采工作面",
  miningHeight: 6.2,
  faceLength: 220,
  maxAdvance: 380,
  buriedDepth: 486,
  dip: 8,
  lithology: "medium",
  fillRatio: 0,
  constitutive: "Mohr–Coulomb + 拉伸截断",
  meshSize: 4,
  solver: "DummySolver（示意）",
};

export const LAYERS: Layer[] = [
  {
    id: "L01",
    name: "第四系冲积层",
    thickness: 92,
    color: "#c4a882",
    kind: "loose",
    density: 1820,
    youngs: 0.06,
    poisson: 0.33,
    cohesion: 0.03,
    friction: 20,
    tensile: 0.015,
    permeability: "0.42 m/d",
    notes: "兖州煤田表土层，砂黏互层",
  },
  {
    id: "L02",
    name: "黏土隔水层",
    thickness: 16,
    color: "#8b5a3c",
    kind: "aquitard",
    density: 2040,
    youngs: 0.18,
    poisson: 0.3,
    cohesion: 0.11,
    friction: 23,
    tensile: 0.04,
    permeability: "2.8e-6 m/d",
    notes: "第四系底黏土，相对隔水",
  },
  {
    id: "L03",
    name: "侏罗系红层",
    thickness: 22,
    color: "#a56b52",
    kind: "rock",
    density: 2280,
    youngs: 3.4,
    poisson: 0.27,
    cohesion: 1.8,
    friction: 30,
    tensile: 0.7,
    permeability: "5.5e-5 m/d",
    notes: "局部发育",
  },
  {
    id: "L04",
    name: "上石盒子组泥岩",
    thickness: 38,
    color: "#6b7c5e",
    kind: "rock",
    density: 2420,
    youngs: 4.6,
    poisson: 0.28,
    cohesion: 2.7,
    friction: 32,
    tensile: 1.1,
    permeability: "3.2e-5 m/d",
    notes: "隔水段",
  },
  {
    id: "L05",
    name: "石盒子砂岩含水层",
    thickness: 26,
    color: "#4a7fa6",
    kind: "aquifer",
    density: 2360,
    youngs: 9.2,
    poisson: 0.24,
    cohesion: 4.0,
    friction: 37,
    tensile: 1.7,
    permeability: "0.54 m/d",
    notes: "裂隙承压水，水位 +12 m",
  },
  {
    id: "L06",
    name: "砂泥岩互层",
    thickness: 36,
    color: "#7d8a6a",
    kind: "rock",
    density: 2400,
    youngs: 6.4,
    poisson: 0.26,
    cohesion: 3.2,
    friction: 34,
    tensile: 1.4,
    permeability: "7.4e-5 m/d",
    notes: "软硬互层",
  },
  {
    id: "L07",
    name: "中砂岩 · 主关键层",
    thickness: 21,
    color: "#9aa7b4",
    kind: "key",
    density: 2490,
    youngs: 17.8,
    poisson: 0.22,
    cohesion: 6.2,
    friction: 40,
    tensile: 3.0,
    permeability: "1.8e-4 m/d",
    notes: "山西组顶板关键层",
  },
  {
    id: "L08",
    name: "粉砂岩直接顶",
    thickness: 12,
    color: "#a89b86",
    kind: "rock",
    density: 2440,
    youngs: 7.2,
    poisson: 0.25,
    cohesion: 3.4,
    friction: 35,
    tensile: 1.5,
    permeability: "5.1e-5 m/d",
    notes: "随采随冒",
  },
  {
    id: "L09",
    name: "3 煤",
    thickness: 6.2,
    color: "#1c1c1e",
    kind: "coal",
    density: 1390,
    youngs: 2.2,
    poisson: 0.31,
    cohesion: 1.0,
    friction: 27,
    tensile: 0.35,
    permeability: "0.018 m/d",
    notes: "山西组主采煤层，一次采全高",
  },
  {
    id: "L10",
    name: "底板泥岩",
    thickness: 14,
    color: "#4e5848",
    kind: "floor",
    density: 2430,
    youngs: 5.4,
    poisson: 0.27,
    cohesion: 2.8,
    friction: 33,
    tensile: 1.2,
    permeability: "2.9e-5 m/d",
    notes: "直接底",
  },
  {
    id: "L11",
    name: "太原组灰岩",
    thickness: 18,
    color: "#7a8580",
    kind: "floor",
    density: 2580,
    youngs: 22.0,
    poisson: 0.21,
    cohesion: 7.4,
    friction: 42,
    tensile: 3.6,
    permeability: "0.12 m/d",
    notes: "模型底界",
  },
];

export type StackedLayer = Layer & { yBottom: number; yTop: number };

export function stackLayers(layers: Layer[]): StackedLayer[] {
  let y = 0;
  const reversed = [...layers].reverse();
  const stacked: StackedLayer[] = [];
  for (const layer of reversed) {
    stacked.push({ ...layer, yBottom: y, yTop: y + layer.thickness });
    y += layer.thickness;
  }
  return stacked.reverse();
}

export function coalLayer(stacked: StackedLayer[]) {
  return stacked.find((l) => l.kind === "coal")!;
}

export function aquiferLayer(stacked: StackedLayer[]) {
  return stacked.find((l) => l.kind === "aquifer")!;
}

export function empiricalHf(M: number, kind: LithologyClass) {
  if (kind === "hard") return (100 * M) / (0.15 * M + 3.12);
  if (kind === "soft") return (100 * M) / (0.31 * M + 8.81);
  return (100 * M) / (1.6 * M + 3.6);
}

export function keyStrataHf(M: number, stacked: StackedLayer[]) {
  const coal = coalLayer(stacked);
  const crit = 8.5 * M;
  const keys = stacked.filter((l) => l.kind === "key");
  const above = keys
    .map((k) => ({ layer: k, dist: k.yBottom - coal.yTop }))
    .filter((k) => k.dist > 0)
    .sort((a, b) => a.dist - b.dist);
  const firstBeyond = above.find((k) => k.dist > crit);
  if (firstBeyond) return firstBeyond.dist;
  const last = above[above.length - 1];
  return last ? last.dist + last.layer.thickness : crit;
}

export function dummyHf(advance: number, M: number, fillRatio: number) {
  const fillDamp = 1 - 0.55 * Math.min(0.9, fillRatio);
  const Hmax = 10.6 * M * fillDamp;
  const grow = 1 - Math.exp(-advance / 95);
  let h = Hmax * Math.min(1, grow);
  if (advance > 250) h = Hmax * 0.98;
  return Math.max(0, h);
}

export function collapseHf(hf: number, M: number) {
  return Math.min(hf * 0.38, 4.2 * M);
}

export function saddleScale(nx: number, ny: number, advance: number) {
  const ex = Math.min(nx, 1 - nx);
  const ey = Math.min(ny, 1 - ny);
  if (advance < 80) {
    const arch =
      Math.exp(-Math.pow((nx - 0.5) * 2.3, 2)) *
      Math.exp(-Math.pow((ny - 0.5) * 2.0, 2));
    return 0.28 + 0.72 * arch;
  }
  const rim =
    Math.exp(-Math.pow(ex * 4.4, 2)) * 0.7 +
    Math.exp(-Math.pow(ey * 3.4, 2)) * 0.55;
  return 0.64 + 0.36 * Math.min(1, rim);
}

export function shapeLabel(advance: number) {
  if (advance < 8) return "尚未开挖";
  if (advance < 80) return "拱形 · 增长阶段";
  if (advance < 220) return "过渡 · 缓增阶段";
  return "马鞍形 · 充分采动稳定";
}

export type RiskGrade = "idle" | "safe" | "watch" | "danger";

export function assessRisk(
  pillar: number,
  advance: number,
): {
  grade: RiskGrade;
  label: string;
  detail: string;
} {
  if (advance < 8) {
    return { grade: "idle", label: "待机", detail: "未开挖，无通道风险。" };
  }
  if (pillar > 20) {
    return {
      grade: "safe",
      label: "未沟通",
      detail: `安全岩柱 ${pillar.toFixed(1)} m，导裂带未触及含水层。`,
    };
  }
  if (pillar > 0) {
    return {
      grade: "watch",
      label: "接近沟通",
      detail: `岩柱仅 ${pillar.toFixed(1)} m，需复核防水煤岩柱留设。`,
    };
  }
  return {
    grade: "danger",
    label: "通道可能形成",
    detail: "导高已进入含水层底界以上，存在导水通道风险。",
  };
}

export function hfCurve(maxAdvance: number, M: number, fillRatio: number) {
  const pts: { advance: number; hf: number }[] = [];
  for (let a = 0; a <= maxAdvance; a += 8) {
    pts.push({ advance: a, hf: dummyHf(a, M, fillRatio) });
  }
  return pts;
}

export const PILLAR_X = 40;
export const PILLAR_Z = 40;
