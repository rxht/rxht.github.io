---
Date: 2026-08-26 17:40:49
LastEditTime: 2026-08-26 17:46:15
description: DeepSeek Harness 安装与使用完全教程
tags:
  - ai
  - deepseek
  - harness
  - agent
  - install
  - use
---

# DeepSeek Harness

> 一份从零到实战的保姆级指南，涵盖环境准备、四种安装方式、Web UI 上手、Headless 自动化、多模型接入、插件开发、SDK 集成与常见问题排查。


## 一、认识 DeepSeek Harness

### 1.1 它是什么

**DeepSeek Harness**（命令行简称 `dsh`）是 DeepSeek 官方于 **2026 年 8 月 13 日**开源的智能体运行框架（Agent Harness），以 **MIT 协议**发布全部源代码，对标 Claude Code / Codex / Cursor 等工程化 AI 编码工具。

它的核心公式：

```
Agent = Model + Harness
```

- **Model（模型）**：负责思考与生成，如 DeepSeek-V4-Pro、R1 等；
- **Harness（外壳）**：负责让模型"在真实世界里干活"——接入文件系统、终端、工具链、沙箱、会话日志等。

一句话理解：**它不生产模型，而是让模型落地的脚手架。**

### 1.2 核心设计哲学：Everything is a Plugin

整个项目贯穿一句口号——**"一切皆插件"**：

- **Cordis 内核**：只负责插件的加载、卸载、依赖管理，**不承载任何具体 Agent 能力**，类似"主板"；
- **插件提供能力**：模型适配、工具注册、会话日志、沙箱、存储、Agent 循环、调度、UI……**全部都是插件**；
- **配置层自由组合**：无需修改源码，即可在配置层选择、替换或扩展任一能力，**没有特权核心**（官方功能与社区插件地位平等）。

这种设计意味着：模型、工具、技能、会话、沙箱、UI，甚至 Agent 运行循环本身都可自由替换和重组。

### 1.3 关键事实速览

| 项目 | 信息 |
|---|---|
| 仓库 | `github.com/deepseek-ai/deepseek-harness` |
| npm 包 | `@deepseek-ai/dsh` |
| 官网 | `https://deepseek.com/harness` |
| 文档 | `https://deepseek-harness.github.io/deepseek-harness/` |
| 主语言 | TypeScript（pnpm monorepo，`packages/` 下 40+ 包） |
| 开源协议 | MIT |
| 当前阶段 | **v0.1 开发者预览版**（存在破坏性变更风险） |
| 模型支持 | 模型无关，支持 DeepSeek、OpenAI、Anthropic、Google、Kimi 等近 40 家 Provider |

> ⚠️ **重要提醒**：官方 README 明确强调项目处于 **developer preview** 阶段，**一定会有破坏性兼容变更**。建议用于学习架构、原型验证，生产环境请谨慎评估。

## 二、前置环境准备

### 2.1 环境要求

| 依赖 | 版本要求 | 说明 |
|---|---|---|
| **Node.js** | `^22.19.0` 或 `>=24.0.0` | **不支持 Node 23.x**（已 EOL）；推荐 22.x LTS 或 24.x |
| **pnpm** | `11.7.0` | 源码安装需要，通过 Corepack 启用 |
| **Git** | `>=2.26` | 支持 worktree 特性 |
| **DeepSeek API Key** | 可选（Web/Headless/SDK 需要） | 去 `platform.deepseek.com` 申请 |

> 💡 Node 版本门槛的原因：`dsh` 运行时使用了 `node:sqlite`（22.13+/23.4+ 可用）和原生 TypeScript 类型剥离（22.18+/23.6+ 可用）。

### 2.2 安装 Node.js

推荐使用 **nvm**（Node 版本管理器）安装：

```bash
# macOS / Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc   # 或 ~/.zshrc

# 安装并切换到 24.x（推荐）
nvm install 24
nvm use 24

# 验证
node -v   # 应输出 v24.x.x
npm -v
```

Windows 用户可直接从 [Node.js 官网](https://nodejs.org/) 下载 24.x LTS 安装包。

### 2.3 启用 pnpm（源码安装才需要）

`dsh` 仓库使用 pnpm 11.7.0，通过 Corepack（Node 自带）启用：

```bash
corepack enable
corepack prepare pnpm@11.7.0 --activate
pnpm --version   # 确认输出 11.7.0
```

### 2.4 申请 DeepSeek API Key

1. 打开 [DeepSeek 开放平台](https://platform.deepseek.com/)，注册并登录；
2. 进入「API Keys」页面，点击「创建 API Key」；
3. **Key 只显示一次，务必立即复制保存到安全位置**；
4. （可选）充值，新用户通常有免费额度可测试。

## 三、安装方式（四种任选）

> 新手推荐 **方式一（npx）**，日常高频使用推荐 **方式二（全局安装）**。

### 方式一：npx 直接运行（推荐新手）

无需全局安装，npx 自动按需下载依赖，一行命令即可启动：

```bash
npx @deepseek-ai/dsh web
```

启动成功后终端会打印本地访问地址（如 `http://127.0.0.1:3080`），浏览器打开即可。

> 📦 说明：npx 方式不会在全局 npm 目录留下包，零配置、即用即走；缺点是每次会检查更新，不适合高频日常使用。

### 方式二：全局安装（日常使用推荐）

确定长期使用，全局安装一次更省心：

```bash
# 全局安装
npm install -g @deepseek-ai/dsh

# 验证安装（看到版本号即成功）
dsh --version

# 启动 Web UI
dsh web
```

**优点**：命令短、启动快、不重复下载；**缺点**：需要手动 `npm update -g @deepseek-ai/dsh` 更新。

### 方式三：源码运行（插件开发 / 深度定制）

如果你想**改源码、写插件、看内部实现**，走源码安装路线：

```bash
# 1. 克隆仓库
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness

# 2. 启用 Corepack 并安装依赖
corepack enable
pnpm install
# postinstall 会自动配置 Lefthook Git hooks

# 3. 构建项目（⚠️ 不能省略！否则 Web 页面缺少构建产物，界面会异常）
pnpm run build
# 流程：tsc 类型检查 → tsdown 打包 → Web 前端构建

# 4. 启动 Web UI
pnpm dsh web

# 5. 运行 Headless 一次性任务（需要 API Key）
export DEEPSEEK_API_KEY=sk-your-key-here
pnpm dsh --profile headless "summarize this workspace"

# 6. 启动 ACP 自动化服务（需要 API Key）
pnpm run demo:acp
```

> ⚠️ **`pnpm run build` 必须执行**，否则 Web 前端构建产物缺失，界面无法正常工作。
>
> 💡 实测使用 **Node.js v24.19.0** 可顺利运行。开发 TypeScript 插件时，建议把插件目录放在 Harness 源码仓库内，否则可能出现 `Cannot find module` 报错。

源码安装还支持**开发模式**（热更新）：

```bash
pnpm run dev:web       # 开发模式启动 Web UI（热更新）
pnpm run typecheck     # 类型检查
pnpm run test          # 单元测试
pnpm run test:coverage # 覆盖率测试（CI 标准：每文件 100%）
pnpm run lint          # 代码检查
pnpm run check:all     # 完整检查套件
```

### 方式四：Docker 部署（服务器 / 隔离环境）

适合不想污染宿主机、或部署在远程服务器的场景：

```bash
docker run --rm -it \
  --name deepseek-harness \
  -p 127.0.0.1:3080:3080 \
  -e DEEPSEEK_API_KEY="你的密钥" \
  -v deepseek-harness-home:/home/node/.dsh \
  -v "$PWD:/workspace" \
  alliot/deepseek-harness:latest
```

> **优点**：环境隔离，适合服务器部署；**缺点**：镜像由社区维护，更新可能滞后。

### 安装方式选择速查

| 你的身份 | 推荐方式 | 理由 |
|---|---|---|
| 第一次听说、想试试 | **npx** | 一行命令，不行就删 |
| 确定日常开发使用 | **全局安装** | 命令短、启动快 |
| 写插件 / 看源码 | **源码安装** | 完整控制权 |
| 部署到服务器 | **Docker** | 隔离干净 |

## 四、首次启动与 Web UI 使用

### 4.1 启动服务

无论用哪种方式安装，启动命令统一为：

```bash
dsh web
# 等价于：npx @deepseek-ai/dsh web
```

默认 Web UI 地址为 **`http://127.0.0.1:3080`**，端口被占用时可自定义：

```bash
dsh web --port 3082
```

启动成功后，终端会打印实际访问地址，**浏览器打开即可**。

> 🐢 **首次启动可能会"卡"一会儿**：npx 首次运行会下载整包依赖（实测占用 300MB+），且**没有进度条**，屏幕只会一直滚字。有 Windows 用户报告第一次跑了 8 分钟毫无反馈，以为卡死。**别慌，等它滚完打印出网址就行**。

### 4.2 首次配置四步走

进入 Web UI 后的标准流程：

**Step 1 — 同意内测声明**
首次打开会弹出开发者预览声明（提示接口和功能随时可能破坏性变更），点击「继续 / Continue」进入主界面。

**Step 2 — 配置模型（填入 API Key）**
进入 `Settings → Models`，填入你的 DeepSeek API Key。

**Step 3 — 选择工作区（Workspace）**
添加一个项目目录作为 Agent 的工作区（即 AI 能操作的项目文件夹）。

**Step 4 — 开始对话**
点「新会话」，选一个模式（新手默认**标准模式**），在输入框用自然语言提需求即可。

### 4.3 切换界面语言

看不懂英文？点击左下角 **`Settings`** 页面，将语言切换到**中文**。

### 4.4 选择模型

在模型选择处，根据任务复杂度选择 **Flash**（轻量快速）或 **Pro**（强力深度）模型：

- 简单任务、快速问答 → Flash
- 复杂编码、多步推理 → Pro

## 五、配置模型与工作区

### 5.1 API Key 的三种配置方式

**方式 A：Web UI 内配置（推荐新手）**
`Settings → Models` 中直接填写，Key 会被安全存储。

**方式 B：环境变量**
```bash
export DEEPSEEK_API_KEY="sk-your-key-here"
```

**方式 C：`.env` 文件**
在项目根目录创建 `.env`：
```
DEEPSEEK_API_KEY=sk-your-key-here
```

> 🔒 **安全机制**：API Key 仅在本地存储，不会上传到任何远端服务。

### 5.2 工作区（Workspace）说明

工作区是 Agent 能读写文件、执行命令的根目录。**务必选择一个专用的项目文件夹**，避免让 Agent 接触到敏感数据或系统关键目录：

```bash
mkdir ~/my-agent-workspace
cd ~/my-agent-workspace
# 在 Web UI 中添加此目录作为工作区
```

### 5.3 首次任务示例

进入工作区后，试试一个简单需求，熟悉完整流程：

```
批量整理当前文件夹里的文档，总结一下每篇的核心内容
```

框架会自动调用对应插件，自主完成「插件调用 → 任务编排 → 结果输出」全流程——就像玩游戏先打教程关。

## 六、四种 Agent 运行模式

DeepSeek Harness 内置四种 **Agent Preset（智能体模式）**，可在「新会话」时选择：

| 模式 | 工具集 | 适用场景 |
|---|---|---|
| **① 标准模式（Standard）** | 全工具组合：文件编辑、Shell、网页搜索、子 Agent、Skills 等 | **日常开发首选**，够用且均衡 |
| **② PTC 模式** | 程序化工具调用：模型直接生成 TypeScript 代码，串联多步一次性执行 | 复杂多步逻辑、需要确定性流程 |
| **③ 极简模式（Minimal）** | 仅保留 `Bash` + 文件编辑两个工具 | 官方用于跑基准测试，安全可控 |
| **④ 创造模式（Creative）** | 标准模式 + 运行时检查插件、试验新插件组合 | 让 AI 自己造插件、探索新能力 |

**新手默认选「标准模式」即可**，熟悉后再尝试其他模式。

## 七、Headless 无界面模式

适合**一次性任务、脚本、CI/CD 集成**——无需打开浏览器，直接在终端跑：

### 前置条件

- 已安装 `dsh`（全局或源码）；
- 已配置 `DEEPSEEK_API_KEY` 环境变量。

### 运行命令

```bash
# 基础用法
dsh --profile headless "summarize this workspace"

# 指定工作区
dsh --profile headless --workspace ./my-project "review the code"

# 源码方式
pnpm dsh --profile headless "summarize this workspace"
```

### 行为说明

- Agent 在**无界面**环境下自主执行任务，直到完成或达到限制；
- 结果直接输出到终端 / 可重定向到文件；
- 非常适合**自动化流水线**和**批量任务**。

## 八、多模型 / 第三方 Provider 接入

"一切皆插件"最直观的体现——**模型本身也能换**。DeepSeek 只是默认预置的一个模型插件，你可以接入 Anthropic、OpenAI，或通过自定义兼容端点接公司内部网关、自建模型服务。

### 8.1 图形界面配置

路径：`Web 界面 → 左下角 Settings → 模型（Models）标签页 → 添加提供方（Add Provider）`。

支持近 **40 家模型提供方**，包括 OpenAI、Anthropic、Google、Kimi 等。

### 8.2 自定义 Provider（兼容端点）

如果要用 OpenAI 兼容接口（如自建网关、Ollama 本地模型），可配置自定义端点：

```yaml
# cordis.yml 或 Provider 配置示例
providers:
  - name: my-openai-compatible
    baseUrl: http://localhost:11434/v1   # 例如 Ollama 本地地址
    apiKey: ${env:MY_API_KEY}
    models:
      - id: qwen2.5:7b
        name: Qwen 2.5 7B (local)
```

### 8.3 接入 Ollama 本地模型（离线跑）

```bash
# 1. 本地启动 Ollama
ollama serve
ollama pull qwen2.5:7b

# 2. 在 dsh Settings → Models → Add Provider 中填写：
#    Base URL: http://localhost:11434/v1
#    Model: qwen2.5:7b
```

### 8.4 Vision 模型配置

部分场景（如截图分析、OCR）需要配置 Vision 模型，在 Provider 设置中指定支持多模态的模型 ID 即可。

## 九、插件安装与开发

### 9.1 安装社区插件

社区插件以 `dsh-plugin` 标签收录，安装标准语法：

```bash
# 从 GitHub 安装
dsh plugin --profile web add "github:所有者/仓库名"

# 从 npm 安装（建议锁定版本号，不要用 @latest）
dsh plugin --profile web add "@作者/插件名@1.0.0"

# 安装后重启生效
dsh --profile web
```

装完后可在 **`设置 → 插件 → 插件列表`** 中查看状态是否为「已启用」。

### 9.2 官方插件目录约定

内置插件按 `packages/` 组织，每个插件是一个独立包，遵循 **seam（三角色）** 结构：

- **定义接口**（Interface）
- **提供方实现**（Provider）
- **消费方使用**（Consumer，通常面向模型的工具）

### 9.3 自定义 Preset 存放位置

自定义智能体模式（Preset）可放在用户配置目录下，无需修改源码即可被加载。

### 9.4 开发一个简单插件（只读工具示例）

建议从**只读工具**开始，遵循安全原则：**不读取 Secrets、不修改文件、不执行破坏性命令**。

```typescript
// my-plugin/src/index.ts
import { definePlugin } from '@deepseek-ai/dsh-core'

export default definePlugin({
  name: 'my-readonly-tool',
  apply(ctx) {
    ctx.tools.register({
      name: 'list_files',
      description: '列出工作区文件（只读）',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: '相对路径' }
        }
      },
      async execute({ path }) {
        // 仅读取，不写入
        const fs = await import('fs/promises')
        const entries = await fs.readdir(path || '.')
        return { entries }
      }
    })
  }
})
```

挂载插件启动：

```bash
pnpm dsh web --patch ./my-plugin/cordis.yml
```

## 十、Python / TypeScript SDK 集成

### 10.1 Python SDK（程序化驱动 Agent）

适合将 Agent 嵌入数据脚本、AI 流水线：

```python
# 运行仓库自带示例
from deepseek_harness import Agent

agent = Agent(
    model="deepseek-pro",
    workspace="./my-project",
    api_key="sk-your-key"
)

result = agent.run("分析这个代码库并给出改进建议")
print(result.output)
```

在自己的程序中使用：

```python
import os
from deepseek_harness import Agent, Session

os.environ["DEEPSEEK_API_KEY"] = "sk-your-key"

agent = Agent(model="deepseek-flash")
session = agent.create_session(workspace="/path/to/repo")

try:
    for chunk in session.stream("总结当前工作区"):
        if chunk.type == "text-delta":
            print(chunk.text, end="", flush=True)
finally:
    session.close()
```

> 🔒 **安全提示**：关键语义——凡抵达模型请求的输入都会被会话日志记录，回放/分叉/审计均可追溯。

### 10.2 TypeScript SDK（JSON-RPC 驱动）

适合**进程外**驱动，通过 JSON-RPC 与主进程通信：

```typescript
import { createAgent } from '@deepseek-ai/dsh-sdk'

const agent = createAgent({
  model: 'deepseek-pro',
  workspace: process.cwd(),
})

const session = await agent.createSession()

try {
  const stream = await agent.run({
    session,
    prompt: 'Analyze this codebase and suggest improvements.',
  })
  for await (const part of stream) {
    if (part.type === 'text-delta') {
      process.stdout.write(part.text)
    }
  }
} finally {
  await session.destroy()
}
```

## 十一、常用命令与参数速查

### 11.1 启动命令

| 命令 | 说明 |
|---|---|
| `dsh web` | 启动 Web UI（默认 `http://127.0.0.1:3080`） |
| `dsh web --port 3082` | 自定义端口 |
| `dsh --profile headless "任务"` | Headless 一次性任务 |
| `dsh --profile web` | 重启 Web（加载新插件后） |
| `pnpm run dev:web` | 开发模式（热更新） |

### 11.2 核心 Flag 速查

| Flag | 说明 |
|---|---|
| `--profile <name>` | 指定运行配置（web / headless） |
| `--workspace <path>` | 指定工作区目录 |
| `--port <port>` | 指定端口 |
| `--patch <file>` | 挂载额外插件配置（cordis.yml） |

### 11.3 Profile 自动初始化规则

首次使用某 profile 时，`dsh` 会自动生成默认配置文件（通常位于 `~/.dsh/`），后续可手动编辑以持久化自定义设置。

### 11.4 管理插件

```bash
dsh plugin --profile web add <name>     # 安装插件
dsh plugin --profile web remove <name>  # 卸载插件
dsh plugin --profile web list           # 列出已安装插件
```

### 11.5 ACP 自动化协议（进阶）

将 Agent 暴露为 **ACP（Agent Communication Protocol）** 服务，供其他系统调用：

```bash
# 启动 ACP 服务
dsh acp serve
# 或源码方式
pnpm run demo:acp
```

主要协议方法：`createSession`、`sendMessage`、`streamEvents`、`destroySession`。

## 十二、常见问题排查

### 12.1 安装相关

| 问题 | 原因 | 解决方案 |
|---|---|---|
| `node -v` 版本过低 | 需要 `^22.19.0` 或 `>=24.0.0` | 用 nvm 升级到 24.x |
| `pnpm` 命令找不到 | 未启用 Corepack | 运行 `corepack enable` |
| npx 首次启动很久无响应 | 正在下载 300MB+ 依赖，无进度条 | **耐心等待**，直到打印网址 |
| `pnpm run build` 报错 | 依赖未装全或 Node 版本不符 | 确认 Node ≥ 22.19，重跑 `pnpm install` |

### 12.2 运行相关

| 问题 | 原因 | 解决方案 |
|---|---|---|
| 浏览器打不开 3080 | 端口被占用 | 用 `--port 3082` 换端口 |
| 界面能打开但操作失败 | API Key 未配置 / 网络问题 | 检查 `Settings → Models` 中的 Key |
| Web UI 页面空白 / 异常 | **未执行 build**，缺少前端产物 | 源码安装必须 `pnpm run build` |
| Agent 执行了非预期操作 | Prompt / 权限 / 工具配置问题 | 停止进程 → 检查 Prompt、Tools、Permission、Session Log、cordis.yml → 改为只读 + 要求审批 |
| `Cannot find module` | 插件目录在仓库外 | 将插件目录放到 Harness 源码仓库内 |

### 12.3 模型相关

| 问题 | 解决方案 |
|---|---|
| 默认模型失效 | 切换到其他 Provider 或更新 API Key |
| 想用本地模型 | 配置 OpenAI 兼容端点指向 Ollama（localhost:11434） |
| Token 消耗过快 | 查看内置 **Token 仪表盘**，实测缓存命中率可达 93%-100% |

### 12.4 Windows 特别提示

Windows 存在已知的**沙箱（sandbox）bug**，macOS 和 Linux 上没有。在 Windows 上让 `dsh` 写文件系统前，**务必先阅读官方 Windows 指南**。

## 十三、进阶学习路线

### 13.1 推荐三阶段路径

**第一阶段：Web UI 体验** 
- `npx @deepseek-ai/dsh web`
- 完成：建立 Session、执行只读任务、观察 Tool Calls、测试 API Credentials、了解 Approval 行为

**第二阶段：源码运行与理解**
```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install && pnpm run build && pnpm dsh web
```
- 阅读 Repository Layout、执行 Unit Tests、找到 CLI Entrypoint、阅读 Architecture 文档、执行 Headless Task

**第三阶段：建立自定义能力**
- 从简单只读 Tool 开始
- 加入 Input Validation、Focused Tests
- 让 Tool Output 可被 Session Log 重建

### 13.2 核心特性回顾

- **轨迹回放（Trajectory）**：事件级原始记录回放，AI 每一步操作有迹可循
- **超高缓存命中率**：实测 93%-100%
- **权限审批**：涉及写操作时按策略弹审批，不会偷偷改文件
- **多模型支持**：20+ Provider，也可接 Ollama 本地离线跑

### 13.3 适用场景与工作流设计

适合 AI 工程与自动化团队：

- 代码库分析与自动 Code Review
- CI 失败调查
- 多步骤 Research Agent（Web Research → 数据提取 → 事实验证 → 报告生成）
- 浏览器 / Shell 自动化
- 子 Agent 委派（Subagent Delegation）
- 可重复执行的工作流
- 企业内部 Agent 平台（将 Agent 暴露为 ACP / JSON-RPC 服务）

> 💡 **设计建议**：将每个步骤建模为独立 Capability，再通过 Workflow 或 Subagent Plugin 组合，**避免把全部逻辑塞进单一巨大 Prompt**。

### 13.4 延伸资源

- **GitHub 仓库**：https://github.com/deepseek-ai/deepseek-harness
- **官方文档**：https://deepseek-harness.github.io/deepseek-harness/
- **产品页**：https://deepseek.com/harness
- **API 开放平台**：https://platform.deepseek.com/
- **社区反馈**：GitHub Discussions（主仓库暂不接收外部 PR，建议在此反馈或自行开发插件）


## 结语

DeepSeek Harness 的最大看点不在"又一个 Agent 框架"，而在于**"万物皆插件"**的架构理念——它把 Agent 的每一层都开放给开发者掌控。当前 v0.1 开发者预览版仍在快速迭代，正是研究架构、抢占插件生态位的好窗口。

**现在就动手试试吧：**

```bash
npx @deepseek-ai/dsh web
```

一行命令，10 分钟内即可跑通「安装 → Web UI → 配模型 → 执行第一个任务」的完整流程。

> 📌 **使用提示**：本文基于 2026 年 8 月的 v0.1 开发者预览版编写，项目迭代较快，如遇命令差异请以[官方文档](https://deepseek-harness.github.io/deepseek-harness/)和仓库 README 为准。
