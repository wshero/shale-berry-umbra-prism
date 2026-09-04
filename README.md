# 导水裂隙带预测工作台

矿区导水裂隙带（WCFZ）三维演示前端。用于提前判识导高、对照规程公式 / 关键层 / 示意模拟，并把通道风险从「事后治理」做成界面上的超前预览。

> **重要：** 本仓库是 **前端 + DummySolver 示意**，地质柱状、力学参数、导高均为假数据，**不能**当作生产设计或防水煤岩柱留设依据。真实计算需接 FLAC3D / 实测导高标定。

演示工况默认对齐兖州煤田风格：兖矿集团 · 演示煤矿 · 1306 综采工作面，主采 **3 煤**。

仓库：[wshero/shale-berry-umbra-prism](https://github.com/wshero/shale-berry-umbra-prism)

---

## 能看什么

- 三维剖切地层：第四系、石盒子砂岩含水层、关键层、3 煤、底板
- 导裂带体积从煤层顶板往上发育（下部垮落带、上部导水裂隙带）
- 推进滑条 / 「运行」：拱形 → 缓增 → 马鞍形稳定
- L0 规程经验公式、L1 关键层位置、L2 Dummy 模拟对照
- 导高、裂采比、安全岩柱、通道风险分级

---

## 技术栈

| 层 | 选用 |
| --- | --- |
| 前端 | React 19 + TanStack Start / Router |
| 样式 | Tailwind CSS v4 |
| 三维 | three.js + React Three Fiber + drei |
| 曲线 | Recharts |
| 示意计算 | `src/lib/sim/model.ts`（无真实求解器） |
| 构建 | Vite 8 + Nitro（Vercel 预设） |

**不需要** 数据库、登录、API Key。浏览器打开即可。

---

## 本地运行

需要 **Node.js 22** 与 npm。

```bash
git clone https://github.com/wshero/shale-berry-umbra-prism.git
cd shale-berry-umbra-prism
npm install
npm run dev
```

浏览器打开终端提示的本地地址（开发脚本监听 `0.0.0.0:8080`）。

常用命令：

```bash
npm run typecheck   # 类型检查
npm run build       # 生产构建（输出 Vercel / Nitro 产物）
```

---

## 临时免费部署（推荐）

本项目是 **带 SSR 的 Vite/Nitro 应用**，并带 WebGL 三维场景。  
**不要用 GitHub Pages**（只适合纯静态 HTML，接不住这套构建）。

### 方案 A：Vercel Hobby（首选，免费）

和当前构建目标一致（Nitro 已使用 Vercel 预设），零服务器运维。

1. 打开 [https://vercel.com](https://vercel.com)，用 **GitHub 账号**登录（Hobby 免费）。
2. **Add New → Project → Import**，选择仓库 `wshero/shale-berry-umbra-prism`。
3. 保持默认即可：
   - Framework：Vite / Other
   - Build Command：`npm run build`（以仓库 `vercel.json` 为准）
   - 不需要填写 `DATABASE_URL` 等环境变量
4. 点 **Deploy**。约 1–2 分钟后得到 `https://xxx.vercel.app`。
5. 以后每次 `git push` 到 `main` 会自动再部署。

**重要：** 不要让 Vercel 直接使用仓库里的旧 `.vercel/output`（那是早期「神东」演示的预构建产物）。本仓库已加 `vercel.json`，每次部署会先删掉旧产物再 `npm run build`。若线上仍是旧版：Vercel → Deployments → Redeploy，**不要勾选 Use existing Build Cache**，Node.js 选 **22.x**。

若构建报 Node 版本：在 Vercel 项目 Settings → General 把 Node.js 设为 **22.x**。

免费额度对演示足够；睡眠/流量限制远好过传统 VPS。自定义域名可在 Project → Settings → Domains 绑定。

### 方案 B：Cloudflare Pages（备选，免费）

可以托管，但本仓库 **没有** Cloudflare 适配器，可能要改 Nitro preset，不建议作为第一次部署路径。若 Vercel 不可用再考虑。

### 方案 C：自己的 Linux 云主机（非免费）

仅当必须内网或离线演示时：

```bash
npm install
npm run build
npx vite preview --host 0.0.0.0 --port 8080
```

前面加 Nginx 反代与 HTTPS。注意：`vite preview` 适合预览构建结果，不是高并发生产方案。

### 不推荐

| 平台 | 原因 |
| --- | --- |
| GitHub Pages | 无 SSR、无 Node 构建流水线（除非另做纯静态导出） |
| 仅上传 `index.html` | 旧版单页 demo，不是当前三维工作台 |
| 免费 Oracle/AWS 试用机 | 要备案/防火墙/Node 进程守护，临时演示成本高 |

---

## 目录（业务相关）

```text
src/components/workstation.tsx   工作台布局、参数、风险与曲线
src/components/mine-scene.tsx    三维地层 / 导裂带 / 垮落带
src/lib/sim/model.ts             柱状、经验公式、Dummy 导高与风险规则
src/routes/index.tsx             首页
```

示意求解链路：

```text
工况 + 柱状 → L0 公式 / L1 关键层 / L2 DummyHf(推进)
         → 导高、裂采比、与含水层底界求岩柱 → 风险分级
         → 三维带体（从煤层顶板长到导高）
```

---

## 免责声明

演示数据不代表任何真实矿井。若接入 FLAC3D / 实测导高，应替换 DummySolver，并由地质、水害专业人员校核后再用于生产决策。
