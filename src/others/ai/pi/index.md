---
Date: 2026-11-13 15:43:53
LastEditTime: 2026-11-13 15:47:19
title: Pi
description: Pi（@earendil-works/pi-coding-agent）在 Windows 下的手把手安装与使用教程：环境准备、PowerShell 一键安装、登录 AI 服务、交互式使用、命令行与 print 模式、会话管理、MCP 与扩展配置，以及常见问题排查。
head:
  - - meta
    - name: keywords
      content: pi, earendil-works, pi-coding-agent, AI agent, 编码智能体, Windows 安装, 终端 AI, Claude Code 替代, 命令行 AI
tags:
  - ai
  - 工具
  - mcp
  - agent
---

# Pi 在 Windows 下的安装与使用教程

> 一份面向 Windows 用户的保姆级指南，从零开始带你安装并上手 **Pi**——一个极简、可扩展的 AI 智能体外壳（Agent Harness）。涵盖环境准备、一键安装、登录 AI 服务、交互式使用、命令行与 print 模式、会话管理、MCP 与扩展配置，以及常见问题排查。

## 一、认识 Pi

### 1.1 它是什么

**Pi**（npm 包名 `@earendil-works/pi-coding-agent`）是 [earendil-works](https://github.com/earendil-works) 开源的一个**极简、可扩展的智能体外壳（agent harness）**，以 **MIT 协议**发布，官方定位是「你可以把它改造成自己想要的样子的智能体框架」。

它的核心思路：

```
Agent = Model（模型）+ Harness（外壳）
```

- **模型**负责思考与生成，Pi 本身不绑定任何一家模型，通过统一的 `pi-ai` 层支持 OpenAI、Anthropic、Google 等多家 Provider；
- **外壳**负责让模型在真实世界里干活——读写文件、执行命令、调用工具、管理会话，并提供终端 UI（TUI）。

一句话理解：**它不生产模型，而是让模型落地的脚手架**，对标 Claude Code / Codex 这类终端 AI 编码工具。

### 1.2 关键事实速览

| 项目 | 信息 |
|---|---|
| 仓库 | `github.com/earendil-works/pi` |
| npm 包 | `@earendil-works/pi-coding-agent` |
| 官网 | `https://pi.dev` |
| 文档 | `https://pi.dev/docs/latest` |
| 主语言 | TypeScript（monorepo） |
| 开源协议 | MIT |
| 运行环境 | **Node.js 22.19 或更高版本** |
| 支持平台 | Windows / macOS / Linux |

### 1.3 设计理念：轻量 + 可扩展

Pi 默认只保留「强大的基本能力」，刻意**不内置**子智能体（sub-agents）、计划模式（plan mode）这类重型功能。它通过以下机制让你按需扩展：

- **Extensions（扩展）**：加载自定义能力；
- **Skills（技能）**：沉淀可复用的工作流；
- **Prompt templates（提示词模板）**：定制交互风格；
- **Themes（主题）**：定制终端界面；
- **Pi packages（包）**：把上面这些打包，通过 npm 或 git 分享。

> ⚠️ **安全提醒**：Pi 默认**不内置权限沙箱**，以启动它的用户权限运行，可读写文件、执行命令、访问网络。处理不可信任务时，建议使用 Docker 等容器化方式隔离（见官方 containerization 文档）。

## 二、环境准备

### 2.1 安装 Node.js

Pi 要求 **Node.js 22.19 或更高版本**。二选一：

**方式 A：使用官方安装器（推荐）**

Pi 的 Windows 安装脚本可以在必要时**自动帮你安装 Node.js**，所以你可以直接跳到「三、安装 Pi」，无需手动装 Node。

**方式 B：手动安装**

1. 访问 Node.js 官网 <https://nodejs.org>，下载 **LTS 版本**（22.x 及以上）的 Windows 安装包（`.msi`）；
2. 双击安装，一路默认即可；
3. 安装完成后，打开 PowerShell 验证：

```powershell
node -v
npm -v
```

正常应输出类似 `v22.19.0` 和对应 npm 版本号。

### 2.2 打开 PowerShell

教程中的命令均在 **PowerShell**（或 Windows Terminal 中的 PowerShell）里执行。右键开始菜单，选择「Windows PowerShell」或「终端」即可。

> 提示：新版 Windows 建议使用 **Windows Terminal**，对 Pi 的快捷键（如 Alt 组合键）支持更好。

## 三、安装 Pi

### 3.1 方式 A：官方安装脚本（推荐）

在 PowerShell 中执行：

```powershell
powershell -c "irm https://pi.dev/install.ps1 | iex"
```

说明：

- `irm` 即 `Invoke-RestMethod`，从 `pi.dev` 拉取安装脚本；
- `iex` 即 `Invoke-Expression`，执行该脚本；
- 该安装器会**锁定所有依赖版本**，并支持用 `pi update` 一键升级。

### 3.2 方式 B：通过 npm 安装

如果你更习惯用 npm，也可以直接安装（注意：npm 方式**不锁定**传递依赖版本）：

```powershell
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

其中 `--ignore-scripts` 用于跳过依赖的生命周期脚本，这是官方推荐的安全做法（Pi 正常使用不依赖这些脚本）。

### 3.3 验证安装

安装完成后，验证是否成功：

```powershell
pi --version
```

输出 Pi 的版本号即表示安装成功。可随时用 `pi --help` 查看完整命令与选项。

### 3.4 更新 Pi

```powershell
pi update
```

该命令会把 Pi 更新到最新版本。若同时想更新所有已安装的扩展包，可用：

```powershell
pi update --all
```

## 四、登录 AI 服务

Pi 本身不带模型，需要先连接一个 AI Provider（订阅或 API Key）才能使用。

### 4.1 交互式登录（推荐）

进入一个项目目录并启动 Pi：

```powershell
cd D:\你的项目目录
pi
```

在 Pi 的输入框里输入：

```
/login
```

它会引导你选择 Provider，打开浏览器完成账号登录，或让你粘贴 API Key。

### 4.2 命令行登录

也可以在终端直接登录，无需先进入交互界面：

```powershell
# 账号登录（会打开浏览器）
pi auth login <provider>

# 直接保存 API Key（不回显输入）
pi auth login <provider> --api-key

# 无浏览器环境（如 SSH）用设备码登录
pi auth login <provider> --no-browser
```

### 4.3 相关命令

```powershell
pi auth logout <provider>        # 退出登录
pi auth check --provider <p>     # 检查凭证状态（ready/not_ready/invalid）
pi auth print-api-key --provider <p>   # 打印解析出的 API Key（注意会输出密钥）
```

> Provider 名称请以 `pi auth login` 的提示或官方文档为准。

## 五、交互式使用

### 5.1 启动

在你要工作的目录下启动 Pi：

```powershell
cd D:\Workspace\my-project
pi
```

Pi 会以该目录为工作根目录，用于发现文件、指令、配置，并按目录分组保存会话。

### 5.2 发任务

- 直接输入一句话，按 **Enter** 发送任务，例如：「帮我看看这个项目怎么跑起来」；
- 按 **Shift+Enter** 换行输入多行内容；
- 按 **Ctrl+G** 在外部编辑器中编辑更长的提示词。

### 5.3 引用文件与图片

- 输入 `@` 搜索文件并加入提示词；
- 按 **Tab** 补全路径；
- 直接粘贴或拖入图片到终端。

### 5.4 观察 Pi 工作

Pi 会实时展示每次工具调用及其结果：

- 按 **Ctrl+O** 展开/折叠工具输出；
- 按 **Ctrl+T** 显示/隐藏思考（thinking）块；
- 底部状态栏显示当前目录、会话、模型、上下文占用与费用。

### 5.5 工作中调整方向

| 你想做的事 | 操作 |
|---|---|
| 调整当前任务 | 输入内容后按 **Enter** |
| 在当前任务后追加工作 | 输入内容后按 **Alt+Enter** |
| 把排队消息取回编辑器 | 按 **Alt+Up** |
| 停止当前任务 | 按 **Escape** |

> 注意：Windows Terminal 会占用部分 Alt 快捷键，具体替代键位见官方 Terminal Setup 文档。

### 5.6 常用斜杠命令

在输入框输入 `/` 可搜索所有可用命令，最常用的有：

| 命令 | 作用 |
|---|---|
| `/model` | 选择模型（快捷键 **Ctrl+L**） |
| `/thinking` | 选择推理强度（**Shift+Tab** 循环切换） |
| `/login` / `/logout` | 登录 / 退出 Provider |
| `/settings` | 修改常用偏好设置 |
| `/new` | 新建会话 |
| `/resume` | 打开其他已保存会话 |
| `/name` | 给当前会话命名 |
| `/compact` | 压缩上下文，减少发送给模型的历史 |
| `/copy` | 复制上一条回答（快捷键 **Ctrl+X**） |
| `/export` | 将会话导出为 HTML 或 JSONL |
| `/share` | 上传会话并生成查看链接 |
| `/hotkeys` | 查看当前会话的快捷键 |

### 5.7 在会话里执行终端命令

在输入框以 `!` 开头执行命令并让模型看到输出：

```
!git status
```

用 `!!` 开头则只执行命令、**不**把输出发给模型：

```
!!npm run build
```

## 六、命令行与 print 模式

除了交互式界面，Pi 也支持「一次性执行并输出结果」的 print 模式，适合脚本化和自动化。

### 6.1 print 模式

```powershell
# 给一句任务，输出结果后退出
pi --print "总结一下这个仓库"

# 把 git diff 交给 Pi 审查
git diff | pi --print "Review this change"
```

`--print`（可简写 `-p`）会让 Pi 跑完任务、把最终回答写到标准输出后退出。

### 6.2 JSON 模式

```powershell
pi --mode json "Inspect this repository" > events.jsonl
```

以 JSONL 事件流输出，方便程序化解析。

### 6.3 选择模型

```powershell
pi --model sonnet:high
```

- `--model` 支持精确 ID 或模糊匹配，可带 `provider/id` 与 `:<thinking>` 后缀；
- `--list-models [搜索词]` 列出可用模型；
- `--thinking <级别>` 单独设置推理强度（`off`/`low`/`medium`/`high`/`max` 等）。

### 6.4 会话相关参数

```powershell
pi --continue          # 继续当前目录最近的会话
pi --resume            # 打开会话选择器
pi --session <path|id> # 按路径或 ID 打开会话
pi --fork <path|id>    # 复刻某个会话到当前目录
pi -n <name>           # 设置会话显示名
```

### 6.5 工具选择

```powershell
pi --tools read,grep,find,ls --print "Review this project"
```

通过 `--tools` 限制本次运行启用的工具集合。

## 七、MCP 与扩展配置

### 7.1 管理 MCP 服务器

```powershell
# 添加 stdio 服务器
pi mcp add <server> --env KEY=VALUE --cwd <dir> -- <command> [args...]

# 添加 HTTP 服务器
pi mcp add <server> --url <url> --header KEY=VALUE

# 移除、列出、登录
pi mcp remove <server>
pi mcp list [--json]
pi mcp login <server>
pi mcp logout <server>
```

添加/移除默认修改全局配置 `~/.pi/agent/mcp.json`；加 `--local`（`-l`）则作用于当前项目的 `.pi/mcp.json`。

### 7.2 安装扩展包

```powershell
pi install npm:@scope/package   # 安装包
pi list                          # 列出已配置的包
pi remove <source>               # 移除包
pi config                        # 配置包的加载方式
```

### 7.3 运行时的扩展参数

```powershell
pi -e <path>            # 加载扩展文件/目录（可重复）
pi --no-extensions      # 禁用所有扩展
pi --skill <path>       # 加载技能
pi --no-skills          # 禁用技能
pi --prompt-template <path>  # 加载提示词模板
```

## 八、常见问题排查

### 8.1 提示 `pi` 不是内部或外部命令

说明安装未成功或 PATH 未刷新：

1. 重新打开一个新的 PowerShell 窗口再试；
2. 用 `pi --version` 确认；
3. 若仍失败，用 npm 方式重装：`npm install -g --ignore-scripts @earendil-works/pi-coding-agent`。

### 8.2 提示 Node 版本过低

Pi 要求 Node.js ≥ 22.19。升级方式：

```powershell
node -v   # 查看当前版本
```

版本过低时，从 Node.js 官网下载最新 LTS 覆盖安装，或使用 nvm-windows 管理多版本。

### 8.3 无浏览器环境无法登录

使用设备码登录：

```powershell
pi auth login <provider> --no-browser
```

### 8.4 终端渲染或快捷键异常

- 运行 `/debug`，Pi 会把诊断信息写入代理目录下的 `pi-debug.log`；
- 查看 `/hotkeys` 确认当前快捷键；
- Windows Terminal 的 Alt 快捷键冲突，参考官方 Terminal Setup 文档调整。

### 8.5 如何离线运行

```powershell
pi --offline
```

禁用自动联网（包括模型目录刷新），等价于设置环境变量 `PI_OFFLINE=1`。

## 九、小结

Pi 是一个轻量、可扩展的终端 AI 智能体外壳，Windows 下通过官方 PowerShell 脚本即可快速安装。上手路径很清晰：

1. **装环境**：Node.js ≥ 22.19（安装脚本可代劳）；
2. **装 Pi**：`powershell -c "irm https://pi.dev/install.ps1 | iex"`；
3. **登录**：`pi` 后执行 `/login`，或用 `pi auth login <provider>`；
4. **干活**：交互式发任务，或 `pi --print "..."` 脚本化调用；
5. **进阶**：MCP、扩展包、会话管理、模型选择。

更完整的用法请参考官方文档 <https://pi.dev/docs/latest>。
