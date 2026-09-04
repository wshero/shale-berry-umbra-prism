import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { a as Layers, i as Play, n as SlidersHorizontal, o as Box, r as RotateCcw, s as Activity } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BeJGNKkU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var DEFAULT_SCENARIO = {
	mine: "神东矿区 · 演示煤矿",
	workface: "8301 综采工作面",
	miningHeight: 6.5,
	faceLength: 240,
	maxAdvance: 400,
	buriedDepth: 428,
	dip: 3,
	lithology: "medium",
	fillRatio: 0,
	constitutive: "Mohr–Coulomb + 拉伸截断",
	meshSize: 4,
	solver: "DummySolver（示意）"
};
var LAYERS = [
	{
		id: "L01",
		name: "黄土松散层",
		thickness: 32,
		color: "#c4a882",
		kind: "loose",
		density: 1780,
		youngs: .08,
		poisson: .32,
		cohesion: .04,
		friction: 22,
		tensile: .02,
		permeability: "1.2e-4 m/d",
		notes: "第四系，弱胶结"
	},
	{
		id: "L02",
		name: "红土隔水层",
		thickness: 18,
		color: "#8b5a3c",
		kind: "aquitard",
		density: 2010,
		youngs: .21,
		poisson: .3,
		cohesion: .12,
		friction: 24,
		tensile: .05,
		permeability: "3.5e-6 m/d",
		notes: "遇水可部分弥合"
	},
	{
		id: "L03",
		name: "白垩系砂岩含水层",
		thickness: 24,
		color: "#4a7fa6",
		kind: "aquifer",
		density: 2320,
		youngs: 8.4,
		poisson: .24,
		cohesion: 3.8,
		friction: 36,
		tensile: 1.6,
		permeability: "0.86 m/d",
		notes: "孔隙承压，水位 +18 m"
	},
	{
		id: "L04",
		name: "泥岩",
		thickness: 16,
		color: "#6b7c5e",
		kind: "rock",
		density: 2410,
		youngs: 4.2,
		poisson: .28,
		cohesion: 2.6,
		friction: 32,
		tensile: 1.1,
		permeability: "4.0e-5 m/d",
		notes: "隔水相对较好"
	},
	{
		id: "L05",
		name: "中砂岩 · 主关键层",
		thickness: 18,
		color: "#9aa7b4",
		kind: "key",
		density: 2480,
		youngs: 18.6,
		poisson: .22,
		cohesion: 6.4,
		friction: 41,
		tensile: 3.2,
		permeability: "2.1e-4 m/d",
		notes: "控制覆岩整体破断"
	},
	{
		id: "L06",
		name: "砂泥岩互层",
		thickness: 22,
		color: "#7d8a6a",
		kind: "rock",
		density: 2390,
		youngs: 6.1,
		poisson: .26,
		cohesion: 3.1,
		friction: 34,
		tensile: 1.4,
		permeability: "8.8e-5 m/d",
		notes: "软硬互层，台阶发育"
	},
	{
		id: "L07",
		name: "细砂岩 · 亚关键层",
		thickness: 12,
		color: "#b7c0c8",
		kind: "key",
		density: 2460,
		youngs: 14.2,
		poisson: .23,
		cohesion: 5.1,
		friction: 39,
		tensile: 2.4,
		permeability: "1.6e-4 m/d",
		notes: "距煤层约 36 m"
	},
	{
		id: "L08",
		name: "粉砂岩",
		thickness: 14,
		color: "#a89b86",
		kind: "rock",
		density: 2440,
		youngs: 7.8,
		poisson: .25,
		cohesion: 3.6,
		friction: 35,
		tensile: 1.7,
		permeability: "6.2e-5 m/d",
		notes: "直接顶以上"
	},
	{
		id: "L09",
		name: "煤层 2-2",
		thickness: 6.5,
		color: "#1c1c1e",
		kind: "coal",
		density: 1410,
		youngs: 2.4,
		poisson: .31,
		cohesion: 1.1,
		friction: 28,
		tensile: .4,
		permeability: "0.02 m/d",
		notes: "一次采全高"
	},
	{
		id: "L10",
		name: "底板泥岩",
		thickness: 14,
		color: "#4e5848",
		kind: "floor",
		density: 2430,
		youngs: 5.5,
		poisson: .27,
		cohesion: 2.9,
		friction: 33,
		tensile: 1.2,
		permeability: "3.1e-5 m/d",
		notes: "底板隔水"
	},
	{
		id: "L11",
		name: "底板中砂岩",
		thickness: 20,
		color: "#6d7780",
		kind: "floor",
		density: 2510,
		youngs: 16.4,
		poisson: .22,
		cohesion: 5.8,
		friction: 40,
		tensile: 2.8,
		permeability: "1.1e-4 m/d",
		notes: "模型底界"
	}
];
function stackLayers(layers) {
	let y = 0;
	const reversed = [...layers].reverse();
	const stacked = [];
	for (const layer of reversed) {
		stacked.push({
			...layer,
			yBottom: y,
			yTop: y + layer.thickness
		});
		y += layer.thickness;
	}
	return stacked.reverse();
}
function coalLayer(stacked) {
	return stacked.find((l) => l.kind === "coal");
}
function aquiferLayer(stacked) {
	return stacked.find((l) => l.kind === "aquifer");
}
function empiricalHf(M, kind) {
	if (kind === "hard") return 100 * M / (.15 * M + 3.12);
	if (kind === "soft") return 100 * M / (.31 * M + 8.81);
	return 100 * M / (1.6 * M + 3.6);
}
function keyStrataHf(M, stacked) {
	const coal = coalLayer(stacked);
	const crit = 8.5 * M;
	const above = stacked.filter((l) => l.kind === "key").map((k) => ({
		layer: k,
		dist: k.yBottom - coal.yTop
	})).filter((k) => k.dist > 0).sort((a, b) => a.dist - b.dist);
	const firstBeyond = above.find((k) => k.dist > crit);
	if (firstBeyond) return firstBeyond.dist;
	const last = above[above.length - 1];
	return last ? last.dist + last.layer.thickness : crit;
}
function dummyHf(advance, M, fillRatio) {
	const fillDamp = 1 - .55 * Math.min(.9, fillRatio);
	const Hmax = 11.2 * M * fillDamp;
	const grow = 1 - Math.exp(-advance / 92);
	let h = Hmax * Math.min(1, grow);
	if (advance > 260) h = Hmax * .985;
	return Math.max(0, h);
}
function saddleScale(nx, ny, advance) {
	const ex = Math.min(nx, 1 - nx);
	const ey = Math.min(ny, 1 - ny);
	if (advance < 80) return .28 + .72 * (Math.exp(-Math.pow((nx - .5) * 2.3, 2)) * Math.exp(-Math.pow((ny - .5) * 2, 2)));
	const rim = Math.exp(-Math.pow(ex * 4.4, 2)) * .7 + Math.exp(-Math.pow(ey * 3.4, 2)) * .55;
	return .64 + .36 * Math.min(1, rim);
}
function shapeLabel(advance) {
	if (advance < 8) return "尚未开挖";
	if (advance < 80) return "拱形 · 增长阶段";
	if (advance < 220) return "过渡 · 缓增阶段";
	return "马鞍形 · 充分采动稳定";
}
function assessRisk(pillar, advance) {
	if (advance < 8) return {
		grade: "idle",
		label: "待机",
		detail: "未开挖，无通道风险。"
	};
	if (pillar > 20) return {
		grade: "safe",
		label: "未沟通",
		detail: `安全岩柱 ${pillar.toFixed(1)} m，导裂带未触及含水层。`
	};
	if (pillar > 0) return {
		grade: "watch",
		label: "接近沟通",
		detail: `岩柱仅 ${pillar.toFixed(1)} m，需复核防水煤岩柱留设。`
	};
	return {
		grade: "danger",
		label: "通道可能形成",
		detail: "导高已进入含水层底界以上，存在导水通道风险。"
	};
}
function hfCurve(maxAdvance, M, fillRatio) {
	const pts = [];
	for (let a = 0; a <= maxAdvance; a += 8) pts.push({
		advance: a,
		hf: dummyHf(a, M, fillRatio)
	});
	return pts;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			outline: "border border-border bg-transparent text-foreground hover:bg-muted",
			ghost: "text-muted-foreground hover:bg-muted hover:text-foreground"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var MineViewport = (0, import_react.lazy)(() => import("./mine-scene-Clg6jDm4.mjs").then((m) => ({ default: m.MineViewport })));
function Workstation() {
	const [scenario, setScenario] = (0, import_react.useState)(DEFAULT_SCENARIO);
	const [advance, setAdvance] = (0, import_react.useState)(180);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [hidden, setHidden] = (0, import_react.useState)({});
	const [showLabels, setShowLabels] = (0, import_react.useState)(false);
	const [showFracture, setShowFracture] = (0, import_react.useState)(true);
	const [selected, setSelected] = (0, import_react.useState)(LAYERS[4].id);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("geo");
	(0, import_react.useEffect)(() => setMounted(true), []);
	const stacked = (0, import_react.useMemo)(() => {
		return stackLayers(LAYERS.map((l) => l.kind === "coal" ? {
			...l,
			thickness: scenario.miningHeight
		} : l));
	}, [scenario.miningHeight]);
	const coal = coalLayer(stacked);
	const aquifer = aquiferLayer(stacked);
	const L0 = empiricalHf(scenario.miningHeight, scenario.lithology);
	const L1 = keyStrataHf(scenario.miningHeight, stacked);
	const L2 = dummyHf(advance, scenario.miningHeight, scenario.fillRatio);
	const aquaDist = aquifer.yBottom - coal.yTop;
	const pillar = aquaDist - L2;
	const risk = assessRisk(pillar, advance);
	const curve = (0, import_react.useMemo)(() => hfCurve(scenario.maxAdvance, scenario.miningHeight, scenario.fillRatio), [
		scenario.maxAdvance,
		scenario.miningHeight,
		scenario.fillRatio
	]);
	const selectedLayer = stacked.find((l) => l.id === selected) ?? stacked[0];
	(0, import_react.useEffect)(() => {
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
	const patch = (partial) => setScenario((s) => ({
		...s,
		...partial
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 flex-col bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-4 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] tracking-[0.22em] text-muted-foreground uppercase",
					children: "WCFZ · DummySolver"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate font-display text-base font-medium tracking-tight md:text-lg",
					children: "导水裂隙带预测工作台"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:inline",
						children: scenario.mine
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => {
							setAdvance(0);
							setRunning(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), "运行"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => {
							setRunning(false);
							setAdvance(0);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "重置"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_320px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "order-2 min-h-0 overflow-y-auto border-b border-border lg:order-1 lg:border-r lg:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 border-b border-border p-2",
							children: [
								[
									"geo",
									"地质",
									Layers
								],
								[
									"mech",
									"力学",
									SlidersHorizontal
								],
								[
									"run",
									"工况",
									Box
								]
							].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTab(id),
								className: cn("flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md text-xs", tab === id ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
							}, id))
						}),
						tab === "geo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-[11px] tracking-wide text-muted-foreground",
									children: "钻孔柱状 · 自上而下 · 点击查看参数"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-px overflow-hidden rounded-lg border border-border",
									children: stacked.map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("flex items-center gap-2 px-2 py-2 text-left text-xs", selected === layer.id ? "bg-muted" : "bg-card hover:bg-muted/60"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setSelected(layer.id),
											className: "flex min-w-0 flex-1 items-center gap-2 text-left",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "size-2.5 shrink-0 rounded-sm",
													style: { background: layer.color }
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "min-w-0 flex-1 truncate",
													children: layer.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-[10px] text-muted-foreground tabular-nums",
													children: [layer.thickness.toFixed(1), " m"]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": hidden[layer.id] ? "显示该层" : "隐藏该层",
											onClick: () => setHidden((h) => ({
												...h,
												[layer.id]: !h[layer.id]
											})),
											className: cn("flex size-8 shrink-0 items-center justify-center rounded-sm border text-[10px]", hidden[layer.id] ? "border-border text-muted-foreground" : "border-foreground/40 text-foreground"),
											children: hidden[layer.id] ? "隐" : "显"
										})]
									}, layer.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 rounded-lg border border-border bg-card p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: selectedLayer.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm font-medium",
											children: selectedLayer.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs leading-relaxed text-muted-foreground",
											children: selectedLayer.notes
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
											className: "mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
													k: "厚度",
													v: `${selectedLayer.thickness} m`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
													k: "密度",
													v: `${selectedLayer.density} kg/m³`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
													k: "E",
													v: `${selectedLayer.youngs} GPa`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
													k: "ν",
													v: `${selectedLayer.poisson}`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
													k: "c",
													v: `${selectedLayer.cohesion} MPa`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
													k: "φ",
													v: `${selectedLayer.friction}°`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
													k: "抗拉强度",
													v: `${selectedLayer.tensile} MPa`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
													k: "渗透",
													v: selectedLayer.permeability
												})
											]
										})
									]
								})
							]
						}) : null,
						tab === "mech" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-[11px] text-muted-foreground",
									children: "岩石力学参数（示意，可在真实系统中由试验赋值）"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto rounded-lg border border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full min-w-[520px] text-left text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "bg-muted text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
												"层",
												"ρ",
												"E",
												"ν",
												"c",
												"φ",
												"σt"
											].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2 font-medium",
												children: h
											}, h)) })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: stacked.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-1.5",
													children: l.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 font-mono tabular-nums",
													children: l.density
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 font-mono tabular-nums",
													children: l.youngs
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 font-mono tabular-nums",
													children: l.poisson
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 font-mono tabular-nums",
													children: l.cohesion
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 font-mono tabular-nums",
													children: l.friction
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 font-mono tabular-nums",
													children: l.tensile
												})
											]
										}, l.id)) })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-[10px] leading-relaxed text-muted-foreground",
									children: ["ρ kg/m³ · E GPa · c / σt MPa · φ ° · 本构 ", scenario.constitutive]
								})
							]
						}) : null,
						tab === "run" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "采高 M (m)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.1",
										min: "2",
										max: "12",
										value: scenario.miningHeight,
										onChange: (e) => patch({ miningHeight: Number(e.target.value) }),
										className: "field"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "工作面长度 (m)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: scenario.faceLength,
										onChange: (e) => patch({ faceLength: Number(e.target.value) }),
										className: "field"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "埋深 (m)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: scenario.buriedDepth,
										onChange: (e) => patch({ buriedDepth: Number(e.target.value) }),
										className: "field"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "覆岩岩性",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: scenario.lithology,
										onChange: (e) => patch({ lithology: e.target.value }),
										className: "field",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "hard",
												children: "坚硬"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "medium",
												children: "中硬"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "soft",
												children: "软弱"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `充填率 ${(scenario.fillRatio * 100).toFixed(0)}%`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 0,
										max: .85,
										step: .05,
										value: scenario.fillRatio,
										onChange: (e) => patch({ fillRatio: Number(e.target.value) }),
										className: "w-full"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "grid grid-cols-2 gap-2 rounded-lg border border-border bg-card p-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
											k: "倾角",
											v: `${scenario.dip}°`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
											k: "网格",
											v: `${scenario.meshSize} m`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
											k: "最大推进",
											v: `${scenario.maxAdvance} m`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
											k: "求解器",
											v: scenario.solver
										})
									]
								})
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative order-1 flex min-h-[340px] flex-col bg-background lg:order-2 lg:min-h-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none absolute top-3 left-3 z-10 rounded-lg border border-border bg-card/90 px-3 py-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "拖拽旋转 · 滚轮缩放"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono tabular-nums",
								children: [
									"推进 ",
									advance.toFixed(0),
									" m · ",
									shapeLabel(advance)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-auto absolute top-3 right-3 z-10 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: showFracture,
								onClick: () => setShowFracture((v) => !v),
								label: "裂隙带"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: showLabels,
								onClick: () => setShowLabels((v) => !v),
								label: "标注"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1",
							children: mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-full items-center justify-center text-sm text-muted-foreground",
									children: "载入三维场景"
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MineViewport, {
									scenario,
									stacked,
									advance,
									hidden,
									showFracture,
									showLabels
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center text-sm text-muted-foreground",
								children: "载入三维场景"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "工作面推进" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono tabular-nums text-foreground",
									children: [
										advance,
										" / ",
										scenario.maxAdvance,
										" m"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 0,
								max: scenario.maxAdvance,
								step: 2,
								value: advance,
								onChange: (e) => {
									setRunning(false);
									setAdvance(Number(e.target.value));
								},
								className: "w-full",
								suppressHydrationWarning: true
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "order-3 min-h-0 overflow-y-auto border-t border-border lg:border-t-0 lg:border-l",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
									label: "数值模拟导高",
									value: advance < 8 ? "—" : L2.toFixed(1),
									unit: "m"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
									label: "安全岩柱",
									value: advance < 8 ? "—" : pillar.toFixed(1),
									unit: "m"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
									label: "裂采比",
									value: advance < 8 ? "—" : (L2 / scenario.miningHeight).toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
									label: "含水层距煤层",
									value: aquaDist.toFixed(0),
									unit: "m"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("mx-3 rounded-lg border px-3 py-3 text-sm", risk.grade === "safe" && "border-success/30 bg-success/10 text-success", risk.grade === "watch" && "border-warning/30 bg-warning/10 text-warning", risk.grade === "danger" && "border-danger/30 bg-danger/10 text-danger", risk.grade === "idle" && "border-border bg-card text-muted-foreground"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-wide uppercase opacity-80",
									children: "通道风险"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium",
									children: risk.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed opacity-90",
									children: risk.detail
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2 flex items-center gap-1.5 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3.5" }), "方法对照（当前推进）"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2 font-medium",
											children: "方法"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2 font-medium",
											children: "导高"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2 font-medium",
											children: "裂采比"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
									className: "font-mono tabular-nums",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 font-sans",
													children: "L0 规程公式"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: L0.toFixed(1) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: (L0 / scenario.miningHeight).toFixed(2) })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 font-sans",
													children: "L1 关键层"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: L1.toFixed(1) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: (L1 / scenario.miningHeight).toFixed(2) })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 font-sans",
													children: "L2 Dummy 模拟"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: L2.toFixed(1) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: (L2 / scenario.miningHeight).toFixed(2) })
											]
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-40 px-2 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1 px-1 text-[11px] text-muted-foreground",
								children: "Hf 随推进"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data: curve,
									margin: {
										top: 8,
										right: 8,
										left: 0,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--color-border)",
											strokeDasharray: "3 3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "advance",
											tick: {
												fill: "var(--color-muted-foreground)",
												fontSize: 10
											},
											tickLine: false,
											axisLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tick: {
												fill: "var(--color-muted-foreground)",
												fontSize: 10
											},
											tickLine: false,
											axisLine: false,
											width: 32
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											background: "var(--color-card)",
											border: "1px solid var(--color-border)",
											fontSize: 12
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "hf",
											stroke: "var(--color-accent)",
											dot: false,
											strokeWidth: 1.6
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 px-3 pb-6 text-[11px] leading-relaxed text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"含水层底界 ",
									aquifer.yBottom.toFixed(0),
									" m（自模型底起算）。"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"主关键层位于煤层顶板以上约",
									" ",
									(stacked.find((l) => l.kind === "key" && l.id === "L05").yBottom - coal.yTop).toFixed(0),
									" ",
									"m。"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "本演示为假数据与示意求解器，用于界面与三维图层联调。" })
							]
						})
					]
				})
			]
		})]
	});
}
function Pair({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-muted-foreground",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-mono text-foreground tabular-nums",
		children: v
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[11px] text-muted-foreground",
			children: label
		}), children]
	});
}
function Kpi({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 font-display text-xl tracking-tight tabular-nums",
			children: [value, unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-xs font-sans text-muted-foreground",
				children: unit
			}) : null]
		})]
	});
}
function Toggle({ on, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 rounded-md border px-2.5 text-[11px]", on ? "border-border bg-card text-foreground" : "border-border bg-transparent text-muted-foreground"),
		children: label
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workstation, {});
}
//#endregion
export { saddleScale as i, coalLayer as n, dummyHf as r, routes_exports as t };
