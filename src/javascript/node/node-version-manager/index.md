---
Date: 2025-12-19 17:03:48
LastEditTime: 2025-12-19 17:29:10
description: 本文介绍如何在 macOS 和 Windows 上安装使用 nvm 管理 node 版本。
head:
  - - meta
    - name: keywords
      content: node, nvm, macOS, windows, win, 版本管理
tags:
  - node
  - nvm
  - macOS
  - windows
  - 版本管理
---

# Node 版本管理

> 本文介绍如何在 macOS 和 Windows 上安装使用 nvm 管理 node 版本。nvm 允许我们在同一台计算机上安装和切换多个 node 版本，极大地提高了开发效率和灵活性。

## macOS 安装 nvm 

通过以下两种主要方式来安装nvm：使用 **curl** 或 **Homebrew**

### 使用 curl 安装

```bash:no-line-numbers
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

安装完成后，您需要加载 nvm 的环境变量。

```bash:no-line-numbers
$ source ~/.nvm/nvm.sh
```

将下方环境变量添加到您的shell启动脚本中（例如 **~/.bash_profile**、**~/.bashrc** 或 **~/.zshrc**），以便每次启动终端时自动加载nvm：

``` bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

### 使用 Homebrew 安装

```bash:no-line-numbers
$ brew install nvm
```

:::tip 提示
如果还没有安装 **Homebrew** ，就需要打开终端，输入以下命令来安装 **Homebrew**

```bash:no-line-numbers
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
:::

将下方环境变量添加到您的shell启动脚本中（例如 **~/.bash_profile**、**~/.bashrc** 或 **~/.zshrc**），以便每次启动终端时自动加载nvm：

``` bash
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix nvm)/nvm.sh" ] && \. "$(brew --prefix nvm)/nvm.sh"  # This loads nvm
```

安装完成后，您需要运行以下命令以使更改生效。

```bash:no-line-numbers
$ source ~/.bash_profile # 或者 ~/.bashrc、.zshrc
```

## Windows 安装 nvm

### 下载 nvm-windows

1. 访问 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 的 GitHub 发布页面，下载最新版本的 **nvm-setup.exe** 文件。

2. 运行 **nvm-setup.exe** 安装程序。

> 安装过程中，您可以选择 nvm 的安装路径和 node 的存储路径。

3. 安装完成后，**nvm-windows** 会自动配置环境变量。


## 使用 nvm 安装 node

使用 nvm 安装特定版本的 node，例如安装 node: V22.18.0，执行如下命令。

```bash:no-line-numbers
$ nvm install 22.18.0
```

## 使用 nvm 切换 node 版本

```bash:no-line-numbers
$ nvm use 22.18.0
```

切换对应的 node 版本后可以使用命令 `node -v` 来验证当前的 node 版本


## nvm常用命令
- **nvm list available：** 查看可在线安装的 NodeJS 版本
- **nvm ls：** 列出所有已经在 NVM 中安装的 NodeJS 版本。
- **nvm current：** 显示当前正在使用的 NodeJS 版本。
- **nvm install xx.xx.xx：** 在 NVM 中在线安装指定版本的 NodeJS ，xx.xx.xx 为指定的版本号。
- **nvm uninstall xx.xx.xx：** 在 NVM 中卸载指定版本的 NodeJS ，xx.xx.xx 为指定的版本号。
- **nvm use xx.xx.xx：** 切换 NodeJS 版本，xx.xx.xx为指定的版本号。
- **nvm version：** 显示当前所使用的 NVM 的版本号。
- 其它命令，如：**nvm arch**、**nvm on**、**nvm off**、**nvm proxy**、**nvm node_mirror**、**nvm npm_mirror**、**nvm root**等，