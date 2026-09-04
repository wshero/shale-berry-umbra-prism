import { i as __toESM } from "../_runtime.mjs";
import { a as Canvas, c as Color, f as require_jsx_runtime, i as Html, l as Float32BufferAttribute, n as OrbitControls, p as require_react, r as Line, s as BufferGeometry, t as Grid, u as Fog } from "../_libs/@react-three/drei+[...].mjs";
import { i as saddleScale, n as coalLayer, r as dummyHf } from "./routes-BeJGNKkU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mine-scene-Clg6jDm4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function modelSize(scenario) {
	return {
		length: 80 + scenario.maxAdvance,
		width: 80 + scenario.faceLength
	};
}
function FractureMesh({ advance, miningHeight, fillRatio, coalTop, faceLength }) {
	const geometry = (0, import_react.useMemo)(() => {
		const nxSeg = 56;
		const nySeg = 32;
		const positions = [];
		const indices = [];
		const colors = [];
		const hf = dummyHf(advance, miningHeight, fillRatio);
		const x0 = 40;
		const z0 = 40;
		const span = Math.max(advance, 1);
		for (let j = 0; j <= nySeg; j++) {
			const ny = j / nySeg;
			const z = z0 + ny * faceLength;
			for (let i = 0; i <= nxSeg; i++) {
				const nx = i / nxSeg;
				const x = x0 + nx * span;
				const s = saddleScale(nx, ny, advance);
				positions.push(x, coalTop + hf * s, z);
				colors.push(.86, .28 + .22 * s, .3);
			}
		}
		for (let j = 0; j < nySeg; j++) for (let i = 0; i < nxSeg; i++) {
			const a = j * 57 + i;
			const b = a + 1;
			const c = a + 57;
			indices.push(a, c, b, b, c, c + 1);
		}
		const geo = new BufferGeometry();
		geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
		geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
		geo.setIndex(indices);
		geo.computeVertexNormals();
		return geo;
	}, [
		advance,
		miningHeight,
		fillRatio,
		coalTop,
		faceLength
	]);
	if (advance < 6) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry,
		renderOrder: 4,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			vertexColors: true,
			transparent: true,
			opacity: .72,
			side: 2,
			depthWrite: false,
			roughness: .28
		})
	});
}
function FractureRidge({ advance, miningHeight, fillRatio, coalTop, faceLength }) {
	const ridge = (0, import_react.useMemo)(() => {
		const hf = dummyHf(advance, miningHeight, fillRatio);
		const zCut = 40 + faceLength * .52;
		const pts = [];
		for (let i = 0; i <= 52; i++) {
			const nx = i / 52;
			const x = 40 + nx * Math.max(advance, 1);
			pts.push([
				x,
				coalTop + hf * saddleScale(nx, .52, advance) + .6,
				zCut
			]);
		}
		return pts;
	}, [
		advance,
		miningHeight,
		fillRatio,
		coalTop,
		faceLength
	]);
	if (advance < 6) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
		points: ridge,
		color: "#f0d4d0",
		lineWidth: 2,
		transparent: true,
		opacity: 1
	});
}
function LayerMaterial({ layer }) {
	const isAqua = layer.kind === "aquifer";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		color: layer.color,
		roughness: isAqua ? .26 : .74,
		metalness: isAqua ? .12 : 0,
		transparent: isAqua,
		opacity: isAqua ? .84 : 1,
		emissive: isAqua ? "#163044" : "#000000",
		emissiveIntensity: isAqua ? .3 : 0
	});
}
function Strata(props) {
	const { stacked, hidden, showLabels, showFracture, scenario, advance } = props;
	const { length, width } = modelSize(scenario);
	const coal = coalLayer(stacked);
	const cutX = 40 + Math.max(advance, 80) * .78;
	const cutZ = 40 + scenario.faceLength * .78;
	const keepLen = Math.max(length - cutX, 24);
	const keepDepth = Math.max(width - cutZ, 24);
	const keepX = cutX + keepLen / 2;
	const keepZ = cutZ + keepDepth / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [stacked.map((layer) => {
		if (hidden[layer.id]) return null;
		const h = Math.max(layer.thickness, .35);
		const explode = layer.yBottom >= coal.yTop - .01 ? 8 + (layer.yBottom - coal.yTop) * .08 : 0;
		const y = (layer.yBottom + layer.yTop) / 2 + explode;
		const isCoal = layer.kind === "coal";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					keepX,
					y,
					keepZ
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					keepLen,
					h,
					keepDepth
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerMaterial, { layer })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					keepX,
					y,
					cutZ + .2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					keepLen,
					h,
					.4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: layer.color,
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					cutX + .2,
					y,
					keepZ
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.4,
					h,
					keepDepth
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: layer.color,
					roughness: .5
				})]
			}),
			isCoal && advance > 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					40 + advance / 2,
					y,
					40 + scenario.faceLength / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					advance,
					h * .7,
					scenario.faceLength
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#070708",
					transparent: true,
					opacity: .35
				})]
			}) : null,
			showLabels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
				position: [
					length + 12,
					y,
					keepZ
				],
				center: true,
				style: { pointerEvents: "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "whitespace-nowrap rounded-sm border border-border bg-card/90 px-2 py-1 text-[10px] text-foreground",
					children: [layer.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-1 text-muted-foreground",
						children: [layer.thickness, " m"]
					})]
				})
			}) : null
		] }, layer.id);
	}), showFracture && !hidden[coal.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FractureMesh, {
		advance,
		miningHeight: scenario.miningHeight,
		fillRatio: scenario.fillRatio,
		coalTop: coal.yTop,
		faceLength: scenario.faceLength
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FractureRidge, {
		advance,
		miningHeight: scenario.miningHeight,
		fillRatio: scenario.fillRatio,
		coalTop: coal.yTop,
		faceLength: scenario.faceLength
	})] }) : null] });
}
function MineViewport(props) {
	const { scenario, stacked } = props;
	const { length, width } = modelSize(scenario);
	const height = stacked[0]?.yTop ?? 200;
	const cutX = 40 + scenario.maxAdvance * .55;
	const cutZ = 40 + scenario.faceLength * .55;
	const target = [
		cutX + 40,
		height * .34,
		cutZ + 30
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		shadows: true,
		dpr: [1, 2],
		camera: {
			position: [
				cutX - 300,
				height * .7,
				cutZ - 320
			],
			fov: 34,
			near: 1,
			far: 4e3
		},
		gl: {
			antialias: true,
			alpha: false
		},
		onCreated: ({ scene }) => {
			scene.background = new Color("#0c0e11");
			scene.fog = new Fog("#0c0e11", 640, 2e3);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .5 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
				"#d5dbe0",
				"#2c2822",
				.6
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
				position: [
					40,
					260,
					-140
				],
				intensity: 1.25,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strata, { ...props }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
				position: [
					length / 2,
					.02,
					width / 2
				],
				args: [length + 60, width + 60],
				cellSize: 20,
				cellThickness: .55,
				cellColor: "#2a2d32",
				sectionSize: 100,
				sectionThickness: 1,
				sectionColor: "#3d4248",
				fadeDistance: 1300,
				fadeStrength: 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				makeDefault: true,
				target,
				minDistance: 70,
				maxDistance: 1500,
				maxPolarAngle: Math.PI / 2.08,
				enableDamping: true
			})
		]
	});
}
//#endregion
export { MineViewport };
