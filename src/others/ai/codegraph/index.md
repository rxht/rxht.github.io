---
Date: 2026-08-15 09:22:52
LastEditTime: 2026-08-18 14:14:12
description: codegraph 安装使用教程
tags:
  - codegraph
  - ai
  - 工具
  - 代码知识图谱
  - mcp
  - 安装使用教程
---

# codegraph 安装使用教程

> codegraph 是一个基于本地的代码知识图谱工具，用于帮助 AI 编码助手快速理解代码结构。

[下载地址](https://github.com/colbymchenry/codegraph/releases)，下载最新版本。

解压下载的压缩包到指定目录，例如 `D:\codegraph-win32-x64`，然后将 `D:\codegraph-win32-x64\bin\` 添加到系统环境变量的 `PATH` 中。

启动 cmd，输入 `codegraph --version` ，查看版本号，确认安装成功。

```bash
D:\codegraph-win32-x64\bin>codegraph --version
# 1.5.0
```

进入项目目录，执行 `codegraph init -i` 初始化项目知识图谱。

```bash
E:\RXH\2026\[project]>codegraph init -i

codegraph init -i
T  Initializing CodeGraph
|
*  Initialized in E:\RXH\2026\molstar
|
|  . Scanning files... 1,670 found|  * Scanning files - 1,670 found
|  O Parsing code  #########################  100%|  * Parsing code - done
|  o Resolving refs  ########################-  96%|  * Resolving refs - done
|  * Linking dynamic dispatch - done
|
*  Indexed 1,669 files
|
•  35,393 nodes, 132,135 edges in 2.1s
codegraph collects anonymous usage stats (no code, paths, or names) — "codegraph telemetry off" or CODEGRAPH_TELEMETRY=0 disables. Details: https://github.com/colbymchenry/codegraph/blob/main/TELEMETRY.md
|
—  Done
```

验证项目知识图谱是否初始化成功。

```bash
E:\RXH\2026\[project]>codegraph status

CodeGraph Status

Project: E:\RXH\2026\[project]

Index Statistics:
  Files:     1,669
  Nodes:     35,393
  Edges:     132,135
  DB Size:   101.80 MB
  Backend:   node:sqlite - built-in (full WAL)
  Journal:   wal

Nodes by Kind:
  import          11,332
  function        7,788
  constant        4,217
  method          3,340
  property        2,793
  type_alias      1,985
  file            1,666
  interface       1,143
  class           530
  enum_member     469
  variable        64
  enum            61
  component       3
  route           2

Files by Language:
  typescript      1,589
  tsx             70
  javascript      7
  yaml            3

[OK] Index is up to date
```

启动 mcp 服务，监听端口 8080。

```bash
E:\RXH\2026\[project]>codegraph serve --mcp

CodeGraph MCP server

This is the MCP server your AI agent (Claude Code, Cursor, Codex, opencode, …)
starts automatically — you don't run it yourself.

It's already wired up by codegraph install. To check on things:
  codegraph status   — is this project indexed and healthy?
  codegraph daemon   — list or stop background MCP servers

(Running it directly only does something when an MCP client drives it over stdin.)

```

## WorkBuddy 中使用 codegraph 服务

在 WorkBuddy 中的连接器中，添加 codegraph 服务的连接信息。

```json
{
  "mcpServers": {
    "codegraph": {
      "command": "codegraph",
      "args": [
        "serve",
        "--mcp"
      ],
      "env": {},
      "disabled": false
    }
  }
}
```

::: tip
在 WorkBuddy 中的连接器中，添加 codegraph 服务的连接信息后，首次使用时，需要进行确认授权，授权后即可看到 codegraph 服务所提供的mcp工具。
:::

配置完成后，在 WorkBuddy 中，就可以参考以下截图，使用 codegraph 服务。

![workbuddy](assets/workbuddy.webp)


