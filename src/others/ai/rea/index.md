---
Date: 2026-11-13 14:54:53
LastEditTime: 2026-11-13 15:34:28
title: REA
description: REA(Reverse Engineer Anything) 是一个基于 AI Agent 的本地逆向工程平台。
tags:
  - ai
  - rea
  - agent
  - mcp
  - install
  - use
---

# REA 安装使用教程

> **REA(Reverse Engineer Anything)** 是一个基于 AI Agent 的本地逆向工程平台:通过 MCP 协议把 Ghidra、Hopper、IDA 等逆向工具,以及 JS/Electron、.NET、Go/Rust 等内建静态分析能力,统一暴露给 AI Agent 调用。所有分析都在本机执行,结果附带证据(Evidence)与未知项清单。
>
> - 官方仓库:https://github.com/morluto/rea

---

## 第 0 步 整体流程概览

```
① 检查 Node.js 版本      →  ② 安装/获取 REA(rea-agents)
③ WorkBuddy 配置 MCP     →  ④ 信任 + 验证(绿灯 / 列出工具)
⑤(可选)装 Ghidra+JDK    →  ⑥ 使用 REA 分析目标
```

全程只需 PowerShell 命令行 + WorkBuddy 界面操作,预计 10–15 分钟(不含可选 Ghidra 安装)。

---

## 第 1 步 检查前置条件(Node.js)

REA 对 Node.js 有**硬性版本要求**,低于以下版本无法运行:

| 版本线 | 最低版本 |
| --- | --- |
| Node.js 22.x | `22.23.4` 及以上 |
| Node.js 24.x | `24.22.1` 及以上 |
| Node.js 26.x | `26.12.1` 及以上 |

### 1.1 检查当前 Node 版本

打开 **PowerShell**(Win 键 → 输入 `powershell` → 回车),执行:

```powershell
node --version
npm --version
```

- 若输出形如 `v22.23.4`、`v24.22.1`、`v26.12.1` 或更高 → **满足要求**,跳到[第 2 步](#第-2-步-获取-rea)。
- 若版本过低或提示"无法识别 node" → 继续 1.2。

### 1.2 安装/升级 Node.js(仅版本不足时需要)

**方式 A:winget(推荐,命令行安装)**

```powershell
winget install OpenJS.NodeJS.LTS
```

安装完成后**关闭并重新打开 PowerShell**,再执行 `node --version` 确认。

**方式 B:官网安装包**

访问 https://nodejs.org ,下载 **LTS** 版本安装包(`.msi`),双击安装,全部默认选项即可。完成后重开 PowerShell 验证。

> 注意:REA 的安装器**不会自动升级 Node**,版本不达标时需先手动升级。

---

## 第 2 步 获取 REA

两种方式,任选其一:

### 方式 A:临时使用(不安装,适合先体验)

```powershell
npx -y rea-agents@latest --help
```

这种方式每次通过 npm 缓存拉取,不会产生全局命令。

### 方式 B:全局安装(推荐,本文后续以它为准)

```powershell
npm install --global rea-agents
```

验证安装:

```powershell
rea --help
```

看到命令列表即安装成功。

> **安全提示**:REA 只通过 npm 包 `rea-agents` 与官方仓库(仓库属主为 `morluto`)分发。网上存在仿冒仓库以"Windows zip 安装包"名义诱导下载,**不要下载任何 zip/安装器**,一律走 npm。

---

## 第 3 步 在 WorkBuddy 中配置 REA(MCP)

WorkBuddy 通过 `mcp.json` 管理 MCP 服务器,支持**用户级**与**项目级**两种级别:

| 级别 | 适用场景 | 配置文件位置 |
| --- | --- | --- |
| 用户级 | 所有项目通用(推荐 REA 放这里) | `C:\Users\<你的用户名>\.workbuddy\mcp.json` |
| 项目级 | 仅当前项目生效 | `<项目根目录>\.workbuddy\mcp.json` |

### 3.1 打开配置入口(界面操作)

1. 打开 WorkBuddy,点击左侧边栏的 **「插件」**(或对话输入框下方的 **「连接器」** 按钮);
2. 进入 **「管理连接器」**,点击右上角 **「自定义连接器」** → **「配置 MCP」**;
3. 系统会打开一个 JSON 编辑器,即 `mcp.json`。

### 3.2 粘贴 REA 配置

在 `mcpServers` 节点下新增 `rea` 条目。

**示例 A:使用全局安装的 `rea` 命令(推荐,前提是已完成第 2 步方式 B)**

```json
{
  "mcpServers": {
    "rea": {
      "type": "stdio",
      "command": "rea",
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
    "rea": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "rea-agents@latest", "mcp"],
      "env": {}
    }
  }
}
```

> **Windows 兼容说明**:若保存后状态为红色,且报错信息是"找不到命令",可将 `command` 改为带 `.cmd` 后缀的形式:
>
> ```json
> "command": "rea.cmd"
> ```
>
> 或
>
> ```json
> "command": "npx.cmd"
> ```
>
> (npm 在 Windows 上生成的全局命令是 `.cmd` shim,部分启动器需要显式后缀。)

**示例 C:固定版本 + 环境变量(进阶)**

```json
{
  "mcpServers": {
    "rea": {
      "type": "stdio",
      "command": "rea",
      "args": ["mcp"],
      "env": {
        "REA_MCP_INPUT_SCHEMA_PROFILE": "compact",
        "REA_LOG_LEVEL": "info"
      }
    }
  }
}
```

### 3.3 保存并选择配置级别

- 保存后,如果系统询问配置级别:**选择「用户级」**(REA 是跨项目通用能力;如需隔离再选项目级)。
- 配置文件实际写入位置见上文表格,也可直接手动编辑该文件。

### 3.4 备选:用 REA 官方 setup 自动注册

REA 官方**原生支持 WorkBuddy 客户端**(`--client workbuddy`,需 `rea-agents@6.5.0+`),可以尝试自动注册:

```powershell
npx -y rea-agents@latest setup --client workbuddy
```

按提示选择客户端、审查变更并批准。setup 会备份现有配置。**注意**:自动注册是否完整兼容 WorkBuddy 的配置格式取决于 REA 版本,若注册后未生效,请回到 3.1–3.3 手动配置(手动配置是最终可靠路径)。

---

## 第 4 步 信任并验证

### 4.1 信任新服务器

- 保存配置后,新条目出现在连接器列表中;
- 点击条目上的 **「信任」** 按钮启用(WorkBuddy 要求手动信任新 MCP 服务器,不会自动生效);
- 信任后条目应显示**绿色状态** = 连接成功。

### 4.2 验证工具已加载

在对话中向 WorkBuddy 提问:

> 列出你当前可用的 MCP 工具。

应能看到 `rea` 前缀的工具(如 `rea_*` 系列:分析 JavaScript 应用、原生二进制反编译、证据查询等)。看到即表示接入成功。

也可以让 WorkBuddy 执行一次真正的分析来端到端验证(见[第 9 步](#第-9-步-使用示例))。

> 若信任后工具未出现,重启 WorkBuddy(或重启该会话)后再次查看——MCP 服务器通常在客户端启动时加载。

---

## 第 5 步(可选)配置 Ghidra 用于原生二进制分析

> 仅当你要分析 **原生 C/C++ 编译的 PE/ELF/Mach-O 二进制**时才需要 Ghidra(或 Hopper/IDA/Kuna)。
> 分析 **JavaScript/Electron 应用、.NET 程序、Go/Rust 二进制、网站、固件、网络抓包** 时,REA 使用内建静态解析器,**无需安装任何反编译器**。

REA 在 Windows 上的 Ghidra 支持当前标记为**实验性**(P0 边界):支持 x86 / x86-64 / ARMNT(Thumb-2) / ARM64 的 PE 应用与 DLL、DOS MZ 可执行文件;要求目标位于本地 NTFS/ReFS 卷。

### 5.1 安装 JDK 与 Ghidra

1. 安装 JDK 21 或更高(https://adoptium.net 下载 Temurin JDK 21);
2. 下载 Ghidra 公开发布版(https://github.com/NationalSecurityAgency/ghidra/releases),解压到如 `C:\tools\ghidra_11.3_PUBLIC`。

### 5.2 设置环境变量(PowerShell)

```powershell
$env:GHIDRA_INSTALL_DIR = "C:\tools\ghidra_11.3_PUBLIC"
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21"
```

> 这两个变量需在**启动 REA(即启动 WorkBuddy)的环境**中生效。要让它们全局生效:
> 系统设置 → 高级系统设置 → 环境变量 → 新建用户变量 `GHIDRA_INSTALL_DIR` / `JAVA_HOME`,然后**重启 WorkBuddy**。

### 5.3 检查就绪状态

```powershell
rea doctor --provider ghidra --json
```

输出中该 provider 相关检查为 healthy 即可。

> 大二进制建议调大 Ghidra 启动超时:`REA_GHIDRA_STARTUP_TIMEOUT_MS`(默认 330000 ms)。

---

## 第 6 步 常用环境变量

在 `mcp.json` 的 `env` 字段中配置(需重启 WorkBuddy 生效):

| 变量 | 用途 |
| --- | --- |
| `REA_MCP_INPUT_SCHEMA_PROFILE` | 输入 schema 档位,`compact`(默认,省上下文)/ `full`(完整字段说明) |
| `REA_MCP_OUTPUT_SCHEMA_PROFILE` | 输出 schema 档位,`compact` / `off`(省略输出 schema) |
| `REA_MCP_MAX_RESPONSE_BYTES` | MCP 最大响应字节数限制 |
| `REA_MCP_TOOL_FAMILIES` | 只启用指定工具族 |
| `REA_LOG_LEVEL` | 日志级别(`info` / `debug` 等;非法值会导致启动失败) |
| `GHIDRA_INSTALL_DIR` / `JAVA_HOME` | Ghidra 安装目录与 JDK 路径 |
| `REA_ANALYSIS_PROVIDER` | 强制分析提供者(如 `ghidra`) |
| `REA_GHIDRA_STARTUP_TIMEOUT_MS` | Ghidra 启动超时(默认 330000) |
| `REA_HOPPER_STARTUP_TIMEOUT_MS` | Hopper 启动超时(默认 120000) |

---

## 第 7 步 更新与卸载

**更新(全局安装)**

```powershell
rea update
```

**更新 npx 方式安装的 setup 注册**

```powershell
npx rea-agents@latest setup
```

**刷新 WorkBuddy 中的注册**:更新后重新执行第 3 步的配置(或 `rea setup --client workbuddy`),然后**重启 WorkBuddy**。

**卸载全局安装**

```powershell
npm uninstall --global rea-agents
```

**移除 WorkBuddy 中的条目**:插件 → 管理连接器 → 在 `rea` 条目上关闭或删除。

---

## 第 8 步 常见问题排查(Windows 特有)

| 现象 | 原因与处理 |
| --- | --- |
| 连接器条目**红色** | 检查 JSON 格式(括号/引号)、`command` 是否拼写正确、`rea`/`npx` 是否在 PATH 中;必要时把 command 改为 `rea.cmd` / `npx.cmd`;确认已点「信任」 |
| 报错 `ERR_MODULE_NOT_FOUND`,路径指向 `_npx\<key>\node_modules` | npm npx 缓存损坏。修复: |
| | ```powershell
| | npm.cmd cache npx ls
| | npm.cmd cache npx info REA_CACHE_KEY
| | npm.cmd cache npx rm REA_CACHE_KEY
| | npx.cmd --yes rea-agents@latest doctor --json
| | ``` |
| 信任后没有工具出现 | 重启 WorkBuddy 或该会话(MCP 在启动时加载);确认条目为绿色 |
| 提示 Node 版本不满足 | 按[第 1 步](#第-1-步-检查前置条件nodejs)升级 Node,REA 不自动升级 Node |
| Ghidra 分析失败/超时 | 确认 `GHIDRA_INSTALL_DIR` 与 `JAVA_HOME` 在启动 WorkBuddy 的环境里;调大 `REA_GHIDRA_STARTUP_TIMEOUT_MS` |
| 工具调用超时 | 大文件分析耗时以分钟计,属正常;可在对话中让 WorkBuddy 等待,或先分析小目标 |
| 修改环境变量不生效 | 环境变量在**启动 REA 的环境**中读取;修改后必须重启 WorkBuddy |

---

## 第 9 步 使用示例

接入成功后,直接用自然语言下指令,例如:

- **分析 JavaScript/Electron 应用**(无需 Ghidra):

  > 用 REA 分析 `D:\apps\example`(一个 Electron 应用目录),找出它的 IPC 通道和 preload 边界,并给出证据。

- **理解某个原生功能**(需要 Ghidra):

  > 用 REA 分析 `D:\bin\app.exe`,解释这个程序是如何调用 Windows 音频接口的,展示反编译伪代码与证据。

- **终端直接使用**(不经 WorkBuddy):

  ```powershell
  rea analyze-javascript-application "D:/apps/example" --json
  ```

典型返回结构:结论 + `evidence_id`(原始证据工件)+ 局限性/未知项清单,便于审计与继续追问。

---

## 附:REA 支持的分析目标一览

| 目标 | 是否需要外部反编译器 |
| --- | --- |
| JavaScript / Electron 应用 / ASAR | 否(内建解析器) |
| .NET 程序集 | 否(内建解析器) |
| Go / Rust 二进制 | 否(内建静态检查) |
| 网站(结构、脚本清单、网络行为) | 否(经 Chrome 系浏览器) |
| 原生二进制(PE/ELF/Mach-O) | 是(Ghidra / Hopper / IDA / Kuna) |
| Android APK | JADX / Apktool |
| 固件 / 网络抓包(HAR/mitmproxy) | 视目标而定 |

---

*基于 rea-agents 6.x 版本*
