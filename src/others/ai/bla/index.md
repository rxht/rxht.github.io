---
Date: 2026-11-13 14:54:53
LastEditTime: 2026-11-13 15:34:07
title: BLA
description: BLA(Blind LLM Agents) 在 Windows 下的安装与使用：CLI 加固、WorkBuddy MCP 接入与打包器插件，并说明与 REA 的关系。
tags:
  - ai
  - bla
  - rea
  - agent
  - mcp
  - security
  - install
  - use
---

# BLA 安装使用教程(Windows)

> **BLA(Blind LLM Agents,让 LLM 智能体"致盲")** 是一个开源的**蓝队防御工具**(MCP 服务器 + CLI),用于在软件发布前加固**自己的**构建产物,使其能够抵御 REA 这类 AI 逆向工程智能体的自动分析。其核心思路用一句话概括就是官方口号:
>
> **Poison → Exhaust → Hallucinate(投毒 → 耗尽 → 诱导幻觉),让逆向工程在经济上破产。**
>
> - 官方仓库:https://github.com/qybaihe/bla
> - npm 包名:`bla-agents`(安装后得到 `bla` 命令,另有 `bla-agents`、`bla-shield` 两个等价别名)
> - 许可证:MIT · 官网:https://bla.tools/
> - 适用产物:二进制文件、Electron 应用、JS bundle、Python、WebAssembly、SQLite、AI 模型权重(Safetensors/GGUF)、Android DEX/IL2CPP 等 19+ 种格式
>
> **重要边界**:BLA 严格面向软件作者与安全团队保护**自有**知识产权与发布产物,属于防御(Blue Team)工具,不应用于攻击他人软件。

---

## 第 0 步 整体流程概览

```
① 检查 Node.js 版本       →  ② 安装/获取 BLA(bla-agents)
③ 选择使用方式:
   ├─ A. CLI 直接加固(harden/defend/audit/verify)
   ├─ B. 在 WorkBuddy 配置 MCP,用自然语言驱动
   └─ C. 接入 Vite/Rollup/Webpack/esbuild 打包流程
④ 加固前审计 → 加固 → 校验等价性   →  ⑤(可选)签名证明 / 基准测试
```

全程只需 PowerShell 命令行(配合 WorkBuddy 界面操作),纯 Node.js 实现,**无需安装 Ghidra、IDA、Wabt 等任何外部逆向工具**即可完成加固。

---

## 第 1 步 检查前置条件(Node.js)

BLA 对 Node.js 版本有明确要求(来自包的 `engines` 字段):

```
Node.js ^22.23.4  ||  >=24.0.0
```

即:22.x 支线需不低于 `22.23.4`,或直接使用 24.0.0 及以上版本(官方实测环境为 Node v24.22.1)。

### 1.1 检查当前 Node 版本

打开 **PowerShell**(Win 键 → 输入 `powershell` → 回车),执行:

```powershell
node --version
npm --version
```

- 输出 `v22.23.4+`、`v24.x`、`v26.x` 等 → **满足要求**,跳到[第 2 步](#第-2-步-获取-bla)。
- 版本过低或提示"无法识别 node" → 继续 1.2。

### 1.2 安装/升级 Node.js(仅版本不足时需要)

**方式 A:winget(推荐,命令行安装)**

```powershell
winget install OpenJS.NodeJS.LTS
```

安装完成后**关闭并重新打开 PowerShell**,再执行 `node --version` 确认。

**方式 B:官网安装包**

访问 https://nodejs.org ,下载 **LTS** 版本安装包(`.msi`),双击安装,全部默认选项即可,完成后重开 PowerShell 验证。

> BLA 的全部 19+ 格式护盾均以纯 TypeScript/Node.js 内建,零外部打包器依赖。可选的 `Wabt`(WASM 实测)与 `tshark`(PCAP 实测)仅在运行官方红队基准套件 `redteam:rea` 时才需要,普通加固用不到。

---

## 第 2 步 获取 BLA

### 方式 A:临时使用(不安装,适合先体验)

```powershell
npx -y bla-agents@latest --help
```

`npx` 会通过 npm 缓存临时拉取,不产生全局命令。本文多数 CLI 示例都可以直接用 `npx bla-agents@latest <子命令>` 形式运行。

### 方式 B:全局安装(推荐,本文后续以 `bla` 命令为准)

```powershell
npm install --global bla-agents
```

验证安装(全局安装后可使用 `bla`、`bla-agents`、`bla-shield` 三个等价命令):

```powershell
bla --version
bla --help
```

能打印版本号与命令清单即安装成功。也可运行自检:

```powershell
bla doctor
```

`doctor` 会检查各防护引擎的就绪状态,以及各 AI 客户端的 MCP 注册情况。

> **安全提示**:BLA 只通过官方仓库 `qybaihe/bla` 与 npm 包 `bla-agents` 分发。请勿下载任何第三方"Windows 绿色版/zip 安装包",一律走 npm 官方源。

---

## 第 3 步 方式 A —— 用 CLI 直接加固(最常用)

### 3.1 一键加固:`harden`

进入你的项目(或已构建好的发布目录),执行:

```powershell
cd D:\your-project
npx bla-agents@latest harden .
```

`harden .` 会自动发现构建产物(`dist/`、`build/`、`.asar`、`.wasm`、`.sqlite`、`.safetensors`、原生二进制,以及 Python/C/Rust/Go 产物),并自动跑完 **audit(审计) → protect(加固) → verify(校验)** 全流程,默认强度为最高档 `bankrupt`。

**先演练、不落盘(强烈建议第一次使用时先跑)**

```powershell
bla harden . --dry-run
```

`--dry-run` 只做发现与规划,**不写入任何字节**(不生成输出目录、不写种子文件),用于确认将要处理哪些文件。

**常用可选参数**

```powershell
# 启用结构性编织诱饵 + JS/Node 自完整性自封 + 兄弟产物纠缠
bla harden . --weave-decoys --self-seal --sidecar-entangle

# 把加固结果输出到指定目录,而不是默认位置
bla harden . --output-directory D:\release\protected
```

> 写入安全机制:当输出文件已存在时,BLA 默认**拒绝覆盖**并返回 `confirmation_required` 与待覆盖清单;确认无误后再按提示重试。原地覆盖需显式 `--in-place` 并配合确认。

### 3.2 针对单个已知目标:`defend`(五阶段流水线)

```powershell
bla defend D:\build\app.asar
```

`defend` 对指定路径执行 `inspect-release → audit → protect → verify →(可选)清单` 五个阶段。可选开关:

| 参数 | 作用 |
| --- | --- |
| `--manifest` | 生成 `.bla-manifest.json` 产物清单(默认不签名) |
| `--sign-manifest --manifest-key <pem>` | 用 ed25519 私钥对清单签名 |
| `--llm-directives` | 启用激进的带内提示诱饵(**默认关闭**) |
| `--weave-decoys` | 启用结构性编织诱饵(**默认关闭**) |

### 3.3 加固前体检:`audit` 与 `lint`

```powershell
# 只读的 16 维 REA 暴露面与 token 成本审计(不修改文件)
bla audit D:\build

# 只读扫描:SourceMap、sourcesContent、sourceMappingURL 等符号泄露
bla inspect-release D:\build

# 打包"坑"统一门禁扫描;若 bankrupt 级加固会被拒绝,退出码为 2
bla lint .
```

`lint` 对应 `bla-packaging-gates/v1` 规范,会检查源码里是否还残留明文 `FLAG{...}` 密钥、单点完整性校验、未绑定的导出验证器等问题,并给出修复建议(`remediationPlan`)。**存在阻断项时,`bankrupt` 级加固会被直接拒绝**,需先按建议整改。

### 3.4 加固后校验:`verify`

```powershell
bla verify D:\release\protected D:\build\original
```

`verify` 检查 Counter-REA 结构不变量,并计算 **token / 成本放大倍数**。加固产物应保持输入/输出功能等价——官方 14 个基准目标全部 100% 通过等价测试;**自定义产物请额外运行你项目自己的测试套件**(`npm test` 等)确认功能无回归。

### 3.5 四档加固强度

`protect`/`defend`/`harden` 支持强度参数,由轻到强:

```
stealth  →  balanced  →  maximum  →  bankrupt(默认,最强)
```

```powershell
bla protect D:\build\app.js -o D:\build\app.protected.js --intensity balanced
```

### 3.6 配置文件与随机种子

首次运行时,BLA 会在项目中自动生成 `.blarc`(或 `bla.config.json`)并持久化一个**每项目唯一的加密种子**,确保不同项目永不共享诱饵标识符。也可手动初始化:

```powershell
bla init
```

命令行参数与配置文件取"或"关系;例如在配置里设置 `"weaveDecoys": true`、`"selfSeal": true` 后,就不必每次重复传参。

---

## 第 4 步 方式 B —— 在 WorkBuddy 中配置 BLA(MCP)

把 BLA 注册为 MCP 服务器后,即可用自然语言让 WorkBuddy 调用 `bla_harden`、`bla_audit`、`bla_lint` 等 30+ 个工具,完成"审计 → 源码编织 → 加固 → 校验"的智能体闭环。

### 4.1 关于官方 `setup` 命令的说明

BLA 提供一键注册命令:

```powershell
npx bla-agents@latest setup
```

但它官方支持的客户端是 **Claude Code、Cursor、Codex、Windsurf、Gemini CLI、Google Antigravity、VS Code、GitHub Copilot CLI、OpenCode**,**列表中不包含 WorkBuddy**。因此在 WorkBuddy 中应采用下面的**手动 `mcp.json` 配置**(这也是最可靠的路径);`setup` 主要用于上述其他编辑器。

### 4.2 打开 MCP 配置入口(界面操作)

1. 打开 WorkBuddy,点击左侧边栏 **「插件」**(或对话输入框下方的 **「连接器」**);
2. 进入 **「管理连接器」**,点击右上角 **「自定义连接器」** → **「配置 MCP」**;
3. 在打开的 JSON 编辑器(`mcp.json`)中新增 `bla` 条目。

配置文件分两级:

| 级别 | 适用场景 | 配置文件位置 |
| --- | --- | --- |
| 用户级 | 所有项目通用(推荐 BLA 放这里) | `C:\Users\<你的用户名>\.workbuddy\mcp.json` |
| 项目级 | 仅当前项目生效 | `<项目根目录>\.workbuddy\mcp.json` |

### 4.3 粘贴 BLA 配置

BLA 的 MCP 服务器通过 **stdio** 启动,子命令为 `mcp`(即 `bla mcp`)。

**示例 A:使用全局安装的 `bla` 命令(推荐,前提是完成第 2 步方式 B)**

```json
{
  "mcpServers": {
    "bla": {
      "type": "stdio",
      "command": "bla",
      "args": ["mcp"],
      "env": {}
    }
  }
}
```

**示例 B:使用 npx 拉取(未全局安装时)**

```json
{
  "mcpServers": {
    "bla": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "bla-agents@latest", "mcp"],
      "env": {}
    }
  }
}
```

> **Windows 兼容说明**:若保存后状态为红色、报"找不到命令",这是因为 npm 在 Windows 上生成的是 `.cmd` shim。把 `command` 加上 `.cmd` 后缀即可:
>
> ```json
> "command": "bla.cmd"
> ```
>
> 或 npx 形式:
>
> ```json
> "command": "npx.cmd"
> ```

### 4.4 信任并验证

1. 保存后,`bla` 条目出现在连接器列表,点击 **「信任」** 启用(新 MCP 服务器需手动信任,不会自动生效);
2. 条目显示**绿色**即连接成功;
3. 在对话中输入:

   > 列出你当前可用的 MCP 工具。

   应能看到 `bla_` 前缀的工具(如 `bla_harden`、`bla_audit`、`bla_lint`、`bla_verify`、`bla_weave_plan` 等)。若未出现,重启 WorkBuddy 或当前会话(MCP 通常在客户端启动时加载)。

### 4.5 用自然语言驱动加固

接入成功后,直接下达指令即可,例如:

> 用 BLA 审计当前项目 `D:\your-project` 的 REA 暴露面,先做 dry-run 列出会被加固的文件,不要写入。

或在 AI 编码代理中使用官方推荐的一句话提示:

```text
Harden my software against REA
```

宿主代理会按 BLA 3.x 闭环自动编排:`bla_weave_plan`(源码编织计划)→ 字符串加密/作用域绑定 → `bla_verify_weave` → `bla_harden` → `bla_verify`。

---

## 第 5 步 方式 C —— 接入打包器(Vite / Rollup / Webpack / esbuild)

对于前端/Electron 项目,可在打包阶段自动保护 JS chunk、用 VLQ v3 蜂蜜 SourceMap 替换真实映射、屏蔽 `.wasm` 资源。以 Vite 为例:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { blaVitePlugin } from "bla-agents/bundler";

export default defineConfig({
  plugins: [
    blaVitePlugin({
      intensity: "bankrupt",
      enableHoneySourceMaps: true,
    }),
  ],
});
```

该子路径通过包的 `bla-agents/bundler` 导出,无需额外安装依赖。Rollup、Webpack、esbuild 同理从 `bla-agents/bundler` 引入对应插件。

---

## 第 6 步 进阶:签名证明与基准测试

### 6.1 ed25519 签名清单(发布证明)

```powershell
# 1. 生成清单并签名
bla defend D:\dist --manifest --sign-manifest --manifest-key D:\keys\release-key.pem

# 2. 下游用公钥验证签名与产物 SHA-256
bla verify-manifest D:\dist\.bla-manifest.json --public-key D:\keys\release-pub.pem
```

签名采用"失败即闭合"策略:传了 `--sign-manifest` 却没给密钥、密钥文件缺失等情况都会直接报错,绝不会静默产出未签名清单。

### 6.2 运行 14 目标基准

```powershell
bla benchmark
```

运行官方 14 个展示目标的 Counter-REA 基准套件,输出各目标的 token/成本放大倍数与等价性结果。

### 6.3 为 C/C++、Rust、Go 生成编译期防护头文件

```powershell
bla emit-headers --lang rust
bla emit-headers --lang c
bla emit-headers --lang go
```

分别生成 `bla_shield.rs`、`bla_shield.h`、`bla_shield.go`,可直接纳入原生源码编译。

---

## 第 7 步 更新与卸载

```powershell
# 更新全局安装
npm update --global bla-agents

# 卸载全局安装
npm uninstall --global bla-agents
```

移除 WorkBuddy 中的条目:插件 → 管理连接器 → 在 `bla` 条目上关闭或删除。若曾用 `setup` 注册到其他编辑器,可运行 `bla uninstall` 清理对应集成。

---

## 第 8 步 Windows 常见问题排查

| 现象 | 原因与处理 |
| --- | --- |
| 连接器条目**红色** / 报"找不到命令" | 检查 JSON 格式(括号/引号)、`bla`/`npx` 是否在 PATH 中;Windows 上把 `command` 改为 `bla.cmd` 或 `npx.cmd`;确认已点「信任」 |
| 提示 Node 版本不满足 | 按[第 1 步](#第-1-步-检查前置条件nodejs)升级到 Node `^22.23.4` 或 `>=24.0.0` |
| `npx` 拉取缓慢或缓存损坏 | 执行 `npm cache clean --force` 后重试;或改用全局安装方式 |
| `harden`/`protect` 报 `confirmation_required` | 输出文件已存在,BLA 默认拒绝覆盖。核对 `wouldOverwrite` 清单后,按需加 `--in-place` 并确认,或换用新的输出目录 |
| `lint` 退出码为 2、bankrupt 被拒绝 | 存在明文密钥、单点完整性校验等阻断项。查看输出中的 `remediationPlan`,整改后重跑;实验性绕过需显式加对应 `--allow-*` 参数 |
| 信任后没有 `bla_` 工具出现 | 重启 WorkBuddy 或当前会话(MCP 在启动时加载);确认条目为绿色 |
| 加固后程序行为异常 | 先用 `--dry-run` 复核目标范围;运行项目自身测试套件验证等价性;降低强度档(`maximum`/`balanced`)或收窄目标目录再试 |
| WASM 加固后公共导出函数名丢失 | `maximum`/`bankrupt` 默认重命名非保留导出。用 `--wasm-preserve-exports 函数a,函数b` 显式保留公共 ABI |
| 想确认 MCP 与引擎是否就绪 | 运行 `bla doctor`(或 MCP 工具 `bla_doctor`),按报告逐项处理 |

---

## 第 9 步 CLI 命令速查

| 命令 | 作用 | 是否写入文件 |
| --- | --- | --- |
| `bla setup` | 向受支持的 AI 客户端注册 MCP 与技能(不含 WorkBuddy,需手动配置) | 是 |
| `bla doctor` | 检查防护引擎与 MCP 注册就绪状态 | 否 |
| `bla init` | 生成带随机种子的 `bla.config.json` | 是(仅配置) |
| `bla harden <dir>` | 一键发现并加固项目目录(默认 bankrupt) | 是 |
| `bla harden <dir> --dry-run` | 只发现与规划,不写入 | 否 |
| `bla defend <target>` | 对已知目标跑五阶段流水线 | 是 |
| `bla audit <target>` | 16 维 REA 暴露面与 token 成本审计 | 否 |
| `bla inspect-release <target>` | SourceMap/符号泄露只读扫描 | 否 |
| `bla lint <dir>` | 打包门禁统一扫描(阻断时退出码 2) | 否 |
| `bla protect <in> -o <out>` | 细粒度护盾注入(可选强度) | 是 |
| `bla verify <protected> [original]` | 校验 Counter-REA 不变量与放大倍数 | 否 |
| `bla verify-manifest <file> --public-key <pem>` | 验证 ed25519 签名与 SHA-256 | 否 |
| `bla benchmark` | 运行 14 目标 Counter-REA 基准 | 否 |
| `bla emit-headers --lang <c\|rust\|go>` | 生成原生编译期防护头文件 | 是 |
| `bla mcp` | 以 stdio 方式启动 MCP 服务器 | — |

---

## BLA 与 REA 的相关性:一组红蓝对抗关系

### 1. 一句话定位:BLA 是 REA 的"防御对手"

二者是**同一战场的攻防两端**,而非同类工具:

- **REA(Reverse Engineer Anything,`morluto/rea`,npm 包 `rea-agents`)** 是**红队/进攻向**的 AI 逆向工程智能体。它通过 MCP 把 Ghidra、Hopper、IDA 等逆向工具与内建静态分析器统一暴露给 AI,可自动解包 Electron `.asar`、还原 SourceMap、追踪 IPC 桥、检查 `.wasm`/`.sqlite`/`.safetensors`,在数秒内、以约 **$0.20** 的成本克隆出应用的核心业务逻辑。本站另有 [REA 安装使用教程](../rea/)。
- **BLA(Blind LLM Agents,`qybaihe/bla`,npm 包 `bla-agents`)** 是**蓝队/防御向**工具,官方定位即 **Counter-REA Blue Defense(反 REA 蓝队防御)**。它在软件**发布前**对自有产物做加固,目标是让 REA 这类智能体"看不动、算不起、读不准"。

> 二者都以 npm 包 + MCP 服务器 + CLI 的形态交付,且都面向 AI 编码智能体生态——一个提供"逆向分析能力",一个提供"抗逆向护盾",互为镜像。

### 2. BLA 如何对抗 REA:四大防御支柱

| 支柱 | 机制 | 对 REA 的效果 |
| --- | --- | --- |
| **Poison(投毒/欺骗)** | 植入格式合法的 canary、伪造的 SGX/TPM2 委托清单、VLQ v3 蜂蜜 SourceMap、逼真的影子状态机 | 迫使 LLM 在相互冲突的假设间分割上下文,追逐合成的"兔子洞" |
| **Exhaust(耗尽预算)** | 精准触发分析器的确定性资源上限(如 ASAR 16 MiB 头、WASM Wabt 表示上限、SQLite 虚拟陷阱列、模型 32 层嵌套) | 在核心逻辑被提取前,把 REA 状态从 `COMPLETE` 打降级为 `LIMITED` / `CapacityError` |
| **Entangle(纠缠/防剥离)** | 运行时 SHA-256 自封(`--self-seal`)、兄弟产物互相绑定、多点调用者作用域折叠 | 防止 REA 剥离诱饵、nop 掉单点校验、把导出函数当离线 oracle 调用 |
| **Runtime(运行时伪装)** | 加固 Electron Fuses,检测 CDP/Inspector/Frida/WebDriver 挂载 | 实时调试时返回逼真的合成遥测,正常用户运行不受影响 |

### 3. 实测对抗效果(基于真实 REA 验证)

BLA 团队用真实的 `morluto/rea`(命令 `npm run redteam:rea`)在普通硬件上做了验证,14 个基准目标全部通过运行时等价测试,典型结果:

| 产物格式 | 加固后体积变化 | REA 结果 | 触发的 REA 预算/错误 |
| --- | --- | --- | --- |
| Electron ASAR | 607 B → 16.9 MiB | Capacity error | ASAR 头 16 MiB 上限 |
| Go buildinfo | 50 KiB → 1.16 MiB | Capacity error | `MAX_BUILD_INFO_BYTES`(1 MiB) |
| WebAssembly | 54 B → 6.56 MiB(251 导出) | 部分可用 | 超出 Wabt 表示预算 |
| JavaScript | 761 B → 116 KiB | 预算拒绝 | 别名选择/取值器展开等语义预算 |
| Safetensors | 128 B → 10.1 KiB | Capacity error | JSON 嵌套超 32 层 |
| SQLite | 12 KiB → 56 KiB | 求值陷阱 | 虚拟陷阱列未知函数求值失败 |

聚合数据(内部估算):约 **639.5×** 的 token 放大、**304.4×** 的成本放大;最高单目标放大达 **2,822.7×**(约 4,800 token/$0.20 被放大到 1,350 万 token/$212.82),REA 评分由 84 降到 2、状态变为 `LIMITED`,而运行时功能 100% 等价。

---
*基于 bla-agents 3.2.x(对应 BLA 3.x)与 rea-agents 6.x 整理,命令与参数以官方仓库最新文档为准。*