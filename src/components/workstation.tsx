import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Box,
  Layers,
  Play,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_SCENARIO,
  LAYERS,
  aquiferLayer,
  assessRisk,
  coalLayer,
  dummyHf,
  empiricalHf,
  hfCurve,
  keyStrataHf,
  shapeLabel,
  stackLayers,
  type LithologyClass,
  type Scenario,
} from "@/lib/sim/model";
import { cn } from "@/lib/utils";

const MineViewport = lazy(() =>
  import("@/components/mine-scene").then((m) => ({ default: m.MineViewport })),
);

export function Workstation() {
  const [scenario, setScenario] = useState<Scenario>(DEFAULT_SCENARIO);
  const [advance, setAdvance] = useState(180);
  const [running, setRunning] = useState(false);
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const [showLabels, setShowLabels] = useState(true);
  const [showFracture, setShowFracture] = useState(true);
  const [selected, setSelected] = useState(LAYERS[6].id);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<"geo" | "mech" | "run">("geo");

  useEffect(() => setMounted(true), []);

  const stacked = useMemo(() => {
    const layers = LAYERS.map((l) =>
      l.kind === "coal" ? { ...l, thickness: scenario.miningHeight } : l,
    );
    return stackLayers(layers);
  }, [scenario.miningHeight]);

  const coal = coalLayer(stacked);
  const aquifer = aquiferLayer(stacked);
  const L0 = empiricalHf(scenario.miningHeight, scenario.lithology);
  const L1 = keyStrataHf(scenario.miningHeight, stacked);
  const L2 = dummyHf(advance, scenario.miningHeight, scenario.fillRatio);
  const aquaDist = aquifer.yBottom - coal.yTop;
  const pillar = aquaDist - L2;
  const risk = assessRisk(pillar, advance);
  const curve = useMemo(
    () => hfCurve(scenario.maxAdvance, scenario.miningHeight, scenario.fillRatio),
    [scenario.maxAdvance, scenario.miningHeight, scenario.fillRatio],
  );
  const selectedLayer = stacked.find((l) => l.id === selected) ?? stacked[0];

  useEffect(() => {
    if (!running) return;
    let a = 0;
    const id = window.setInterval(() => {
      a = Math.min(scenario.maxAdvance, a + 8);
      setAdvance(a);
      if (a >= scenario.maxAdvance) {
        window.clearInterval(id);
        setRunning(false);
      }
    }, 40);
    return () => window.clearInterval(id);
  }, [running, scenario.maxAdvance]);

  const patch = (partial: Partial<Scenario>) =>
    setScenario((s) => ({ ...s, ...partial }));

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-4 md:px-6">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
            WCFZ · DummySolver
          </p>
          <h1 className="truncate font-display text-base font-medium tracking-tight md:text-lg">
            导水裂隙带预测工作台
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:inline">
            {scenario.mine} · {scenario.workface}
          </span>
          <Button
            size="sm"
            onClick={() => {
              setAdvance(0);
              setRunning(true);
            }}
          >
            <Play className="size-3.5" />
            运行
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setRunning(false);
              setAdvance(0);
            }}
          >
            <RotateCcw className="size-3.5" />
            重置
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_320px]">
        <aside className="order-2 min-h-0 overflow-y-auto border-b border-border lg:order-1 lg:border-r lg:border-b-0">
          <div className="flex gap-1 border-b border-border p-2">
            {(
              [
                ["geo", "地质", Layers],
                ["mech", "力学", SlidersHorizontal],
                ["run", "工况", Box],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md text-xs",
                  tab === id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
          </div>

          {tab === "geo" ? (
            <div className="p-3">
              <p className="mb-2 text-[11px] tracking-wide text-muted-foreground">
                钻孔柱状 · 自上而下 · 点击查看参数
              </p>
              <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border">
                {stacked.map((layer) => (
                  <div
                    key={layer.id}
                    className={cn(
                      "flex items-center gap-2 px-2 py-2 text-left text-xs",
                      selected === layer.id ? "bg-muted" : "bg-card hover:bg-muted/60",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(layer.id)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    >
                      <span
                        className="size-2.5 shrink-0 rounded-sm"
                        style={{ background: layer.color }}
                      />
                      <span className="min-w-0 flex-1 truncate">{layer.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                        {layer.thickness.toFixed(1)} m
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label={hidden[layer.id] ? "显示该层" : "隐藏该层"}
                      onClick={() =>
                        setHidden((h) => ({ ...h, [layer.id]: !h[layer.id] }))
                      }
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-sm border text-[10px]",
                        hidden[layer.id]
                          ? "border-border text-muted-foreground"
                          : "border-foreground/40 text-foreground",
                      )}
                    >
                      {hidden[layer.id] ? "隐" : "显"}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-border bg-card p-3">
                <p className="text-[11px] text-muted-foreground">{selectedLayer.id}</p>
                <p className="mt-1 text-sm font-medium">{selectedLayer.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {selectedLayer.notes}
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                  <Pair k="厚度" v={`${selectedLayer.thickness} m`} />
                  <Pair k="密度" v={`${selectedLayer.density} kg/m³`} />
                  <Pair k="E" v={`${selectedLayer.youngs} GPa`} />
                  <Pair k="ν" v={`${selectedLayer.poisson}`} />
                  <Pair k="c" v={`${selectedLayer.cohesion} MPa`} />
                  <Pair k="φ" v={`${selectedLayer.friction}°`} />
                  <Pair k="抗拉强度" v={`${selectedLayer.tensile} MPa`} />
                  <Pair k="渗透" v={selectedLayer.permeability} />
                </dl>
              </div>
            </div>
          ) : null}

          {tab === "mech" ? (
            <div className="p-3">
              <p className="mb-2 text-[11px] text-muted-foreground">
                岩石力学参数（示意，可在真实系统中由试验赋值）
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[520px] text-left text-[11px]">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      {["层", "ρ", "E", "ν", "c", "φ", "σt"].map((h) => (
                        <th key={h} className="px-2 py-2 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stacked.map((l) => (
                      <tr key={l.id} className="border-t border-border">
                        <td className="px-2 py-1.5">{l.name}</td>
                        <td className="px-2 font-mono tabular-nums">{l.density}</td>
                        <td className="px-2 font-mono tabular-nums">{l.youngs}</td>
                        <td className="px-2 font-mono tabular-nums">{l.poisson}</td>
                        <td className="px-2 font-mono tabular-nums">{l.cohesion}</td>
                        <td className="px-2 font-mono tabular-nums">{l.friction}</td>
                        <td className="px-2 font-mono tabular-nums">{l.tensile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                ρ kg/m³ · E GPa · c / σt MPa · φ ° · 本构 {scenario.constitutive}
              </p>
            </div>
          ) : null}

          {tab === "run" ? (
            <div className="space-y-3 p-3">
              <Field label="采高 M (m)">
                <input
                  type="number"
                  step="0.1"
                  min="2"
                  max="12"
                  value={scenario.miningHeight}
                  onChange={(e) => patch({ miningHeight: Number(e.target.value) })}
                  className="field"
                />
              </Field>
              <Field label="工作面长度 (m)">
                <input
                  type="number"
                  value={scenario.faceLength}
                  onChange={(e) => patch({ faceLength: Number(e.target.value) })}
                  className="field"
                />
              </Field>
              <Field label="埋深 (m)">
                <input
                  type="number"
                  value={scenario.buriedDepth}
                  onChange={(e) => patch({ buriedDepth: Number(e.target.value) })}
                  className="field"
                />
              </Field>
              <Field label="覆岩岩性">
                <select
                  value={scenario.lithology}
                  onChange={(e) =>
                    patch({ lithology: e.target.value as LithologyClass })
                  }
                  className="field"
                >
                  <option value="hard">坚硬</option>
                  <option value="medium">中硬</option>
                  <option value="soft">软弱</option>
                </select>
              </Field>
              <Field label={`充填率 ${(scenario.fillRatio * 100).toFixed(0)}%`}>
                <input
                  type="range"
                  min={0}
                  max={0.85}
                  step={0.05}
                  value={scenario.fillRatio}
                  onChange={(e) => patch({ fillRatio: Number(e.target.value) })}
                  className="w-full"
                />
              </Field>
              <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-card p-3 text-xs">
                <Pair k="倾角" v={`${scenario.dip}°`} />
                <Pair k="网格" v={`${scenario.meshSize} m`} />
                <Pair k="最大推进" v={`${scenario.maxAdvance} m`} />
                <Pair k="求解器" v={scenario.solver} />
              </dl>
            </div>
          ) : null}
        </aside>

        <section className="relative order-1 flex min-h-[340px] flex-col bg-background lg:order-2 lg:min-h-0">
          <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-lg border border-border bg-card/90 px-3 py-2 text-xs">
            <p className="text-muted-foreground">拖拽旋转 · 滚轮缩放</p>
            <p className="mt-1 font-mono tabular-nums">
              推进 {advance.toFixed(0)} m · {shapeLabel(advance)}
            </p>
            <p className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <i className="inline-block size-2 rounded-sm bg-danger/80" />
                导裂带 · 从煤层顶板往上
              </span>
              <span className="inline-flex items-center gap-1">
                <i className="inline-block size-2 rounded-sm bg-danger/40" />
                垮落带
              </span>
            </p>
          </div>
          {showLabels ? (
            <div className="pointer-events-none absolute top-28 left-3 z-10 w-[168px] rounded-lg border border-border bg-card/90 p-2">
              <p className="mb-1.5 text-[10px] tracking-wide text-muted-foreground">
                地层（剖面上已标注）
              </p>
              <div className="flex max-h-[42vh] flex-col overflow-hidden rounded-md">
                {stacked.map((layer) => (
                  <div
                    key={layer.id}
                    className="flex items-center gap-1.5 px-1.5 text-[10px] leading-tight"
                    style={{
                      flex: `${Math.max(layer.thickness, 5)} 1 0`,
                      minHeight: 15,
                      background: `${layer.color}2e`,
                    }}
                  >
                    <span
                      className="size-1.5 shrink-0 rounded-sm"
                      style={{ background: layer.color }}
                    />
                    <span className="min-w-0 flex-1 truncate">{layer.name}</span>
                    <span className="font-mono text-[9px] text-muted-foreground tabular-nums">
                      {layer.thickness.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="pointer-events-auto absolute top-3 right-3 z-10 flex gap-2">
            <Toggle
              on={showFracture}
              onClick={() => setShowFracture((v) => !v)}
              label="裂隙带"
            />
            <Toggle
              on={showLabels}
              onClick={() => setShowLabels((v) => !v)}
              label="标注"
            />
          </div>
          <div className="min-h-0 flex-1">
            {mounted ? (
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    载入三维场景
                  </div>
                }
              >
                <MineViewport
                  scenario={scenario}
                  stacked={stacked}
                  advance={advance}
                  hidden={hidden}
                  showFracture={showFracture}
                  showLabels={showLabels}
                />
              </Suspense>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                载入三维场景
              </div>
            )}
          </div>
          <div className="border-t border-border px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>工作面推进</span>
              <span className="font-mono tabular-nums text-foreground">
                {advance} / {scenario.maxAdvance} m
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={scenario.maxAdvance}
              step={2}
              value={advance}
              onChange={(e) => {
                setRunning(false);
                setAdvance(Number(e.target.value));
              }}
              className="w-full"
              suppressHydrationWarning
            />
          </div>
        </section>

        <aside className="order-3 min-h-0 overflow-y-auto border-t border-border lg:border-t-0 lg:border-l">
          <div className="grid grid-cols-2 gap-2 p-3">
            <Kpi label="数值模拟导高" value={advance < 8 ? "—" : L2.toFixed(1)} unit="m" />
            <Kpi label="安全岩柱" value={advance < 8 ? "—" : pillar.toFixed(1)} unit="m" />
            <Kpi
              label="裂采比"
              value={advance < 8 ? "—" : (L2 / scenario.miningHeight).toFixed(2)}
            />
            <Kpi label="含水层距煤层" value={aquaDist.toFixed(0)} unit="m" />
          </div>
          <div
            className={cn(
              "mx-3 rounded-lg border px-3 py-3 text-sm",
              risk.grade === "safe" && "border-success/30 bg-success/10 text-success",
              risk.grade === "watch" && "border-warning/30 bg-warning/10 text-warning",
              risk.grade === "danger" && "border-danger/30 bg-danger/10 text-danger",
              risk.grade === "idle" && "border-border bg-card text-muted-foreground",
            )}
          >
            <p className="text-[11px] tracking-wide uppercase opacity-80">通道风险</p>
            <p className="mt-1 font-medium">{risk.label}</p>
            <p className="mt-1 text-xs leading-relaxed opacity-90">{risk.detail}</p>
          </div>

          <div className="p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Activity className="size-3.5" />
              方法对照（当前推进）
            </p>
            <table className="w-full text-left text-xs">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="pb-2 font-medium">方法</th>
                  <th className="pb-2 font-medium">导高</th>
                  <th className="pb-2 font-medium">裂采比</th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                <tr className="border-t border-border">
                  <td className="py-2 font-sans">L0 规程公式</td>
                  <td>{L0.toFixed(1)}</td>
                  <td>{(L0 / scenario.miningHeight).toFixed(2)}</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-2 font-sans">L1 关键层</td>
                  <td>{L1.toFixed(1)}</td>
                  <td>{(L1 / scenario.miningHeight).toFixed(2)}</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-2 font-sans">L2 Dummy 模拟</td>
                  <td>{L2.toFixed(1)}</td>
                  <td>{(L2 / scenario.miningHeight).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="h-40 px-2 pb-3">
            <p className="mb-1 px-1 text-[11px] text-muted-foreground">Hf 随推进</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curve} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="advance"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hf"
                  stroke="var(--color-accent)"
                  dot={false}
                  strokeWidth={1.6}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 px-3 pb-6 text-[11px] leading-relaxed text-muted-foreground">
            <p>含水层底界 {aquifer.yBottom.toFixed(0)} m（自模型底起算）。</p>
            <p>
              主关键层位于煤层顶板以上约{" "}
              {(
                stacked.find((l) => l.kind === "key")!.yBottom - coal.yTop
              ).toFixed(0)}{" "}
              m。
            </p>
            <p>本演示为假数据与示意求解器，用于界面与三维图层联调。</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Pair({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-mono text-foreground tabular-nums">{v}</dd>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Kpi({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl tracking-tight tabular-nums">
        {value}
        {unit ? (
          <span className="ml-1 text-xs font-sans text-muted-foreground">{unit}</span>
        ) : null}
      </p>
    </div>
  );
}

function Toggle({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-md border px-2.5 text-[11px]",
        on
          ? "border-border bg-card text-foreground"
          : "border-border bg-transparent text-muted-foreground",
      )}
    >
      {label}
    </button>
  );
}
