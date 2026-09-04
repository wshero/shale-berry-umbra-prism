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

/** Demo build stamp — 兖矿 1306 + volume WCFZ */
export const BUILD_ID = "yanzhou-1306-wcfz-cutaway-labels";

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
