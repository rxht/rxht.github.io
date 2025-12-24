---
Date: 2025-12-24 16:54:19
LastEditTime: 2025-12-24 17:40:09
description: 详细介绍 Pake 的安装以及存在的问题解决方法和具体的使用和配置参数
head:
  - - meta
    - name: keywords
      content: Pake, 网页, 桌面, 打包, desktop, linux, windows, macOS
tags:
    - Pake
    - 网页
    - 桌面
    - 打包
    - desktop
    - linux
    - windows
    - macOS
---


# Pake 网页打包客户端

> 只需一个命令，就能将任何网页变成桌面应用，支持 macOS、Windows 和 Linux

:::tip
确保你的 Node.js 版本是 22.0 或更高版本（例如 22.11.0）。 注意：旧版本≥18.0.0 也可能有效。
:::

:::tip
平台特定需求

**macOS：** Xcode 命令行工具：`xcode-select --install`

**Windows：**

- [Tauri 的先决条件](https://tauri.app/start/prerequisites/)
- Windows 10 SDK（10.0.19041.0）和 Visual Studio Build Tools 2022（≥17.2）
- Required redistributables:
    - Microsoft Visual C++ 2015-2022 Redistributable (x64)
    - Microsoft Visual C++ 2015-2022 Redistributable (x86)
    - Microsoft Visual C++ 2012 Redistributable (x86) (optional)
    - Microsoft Visual C++ 2013 Redistributable (x86) (optional)
    - Microsoft Visual C++ 2008 Redistributable (x86) (optional)
- Windows ARM (ARM64) support: Install C++ ARM64 build tools in Visual Studio Installer under "Individual Components" → "MSVC v143 - VS 2022 C++ ARM64 build tools"

**Linux (Ubuntu):** `sudo apt install libdbus-1-dev libsoup-3.0-dev libjavascriptcoregtk-4.1-dev libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev gnome-video-effects gnome-video-effects-extra libglib2.0-dev pkg-config`
:::


## 安装 pake-cli

::: code-group

```sh [pnpm]
pnpm install -g pake-cli
```

```sh [npm]
npm install -g pake-cli
```

:::


## 修改打包后的发布者

> 此步骤只需要修改一次即可

1. 查看 npm 的全局安装路径

::: code-group

```sh [pnpm]
pnpm root -g
```

```sh [npm]
npm root -g
```

:::

2. 然后进入对应的全局路径文件夹，编辑  `/pake-cli/dist/cli.js` 文件

3. 找到如下代码位置，大概 165 行左右，将 `com.pake.${postFixHash}` 改为 `com.szbl.${postFixHash}` 

```javascript [cli.js]
// Generates an identifier based on the given URL.
function getIdentifier(url) {
    const postFixHash = crypto
        .createHash('md5')
        .update(url)
        .digest('hex')
        .substring(0, 6);
    return `com.pake.${postFixHash}`;
}
```

## 使用 Pake 命令构建应用

命令 `pake https://xxxxx --name app-name --icon https://xxxx/xxx.png`

常用的部分参数如下：

| Option	                    | Description	                                    | Example                                       |
| -----------------             | :------------------------------------------------ | :-------------------------------------------- |
| --name	                    | 应用名称      	                                 | --name "Weekly"                               |
| --icon	                    | 自定义图标（可选，自动获取网站图标）                 | --icon https://xxxx/xxx.png                   |
| --width	                    | 窗口宽度 (default: 1200px)	                     | --width 1400                                  |
| --height	                    | 窗口高度 (default: 780px)	                         | --height 900                                  |
| --min-width                   | 窗口最小宽度	                                     | --min-width 800                               |
| --min-height                  | 窗口最小高度	                                     | --min-height 400                              |
| --zoom                        | 初始页面的缩放等级（50-200）	                      | --zoom 100                                    |
| --hide-title-bar	            | Immersive header (macOS only)	                    | --hide-title-bar                              |
| --fullscreen	                | 是否全屏启动 (default: false)	                     | --fullscreen                                  |
| --maximize	                | 启动时窗口是否最大化 (default: false)	              | --maximize                                    |
| --activation-shortcut	        | 设置激活快捷键	                                  | --activation-shortcut "CmdOrControl+Shift+P" |
| --always-on-top	            | 窗口是否始终处于顶层 (default: false)               | --always-on-top                               |
| --app-version	                | 程序的版本号 (default: 1.0.0)                       | --app-version "0.2.7"                        |
| --dark-mode	                | 强制 Mac 用暗黑模式 (default: false)	              | --dark-mode                                   |
| --disabled-web-shortcuts      | 禁用网页快捷键 (default: false)	                   | --disabled-web-shortcuts                     |
| --force-internal-navigation   | 所有点击的链接都放在 Pake 窗口里打开 (default: false)	| --force-internal-navigation                   |
| --debug	                    | 启用开发工具	                                      | --debug                                       |
| --multi-arch                  | 应用打包为支持Intel和M1芯片仅限macOS(default: false)	| --multi-arch                                  |
| --targets	                    | 指定构建目标架构	                                  |  --targets arm64                               |
|       	                    | - # Windows ARM64             	                 |  --targets arm64                              |
|       	                    | - Windows x64             	                     |  --targets x64                                 |
|       	                    | - macOS Universal (Intel + Apple Silicon)          |  --targets universal                           |
|       	                    | - macOS Apple Silicon only             	         |  --targets apple                              |
|       	                    | - macOS Intel only                    	         |  --targets intel                              |
|       	                    | - Linux DEB package (x64)                     	 |  --targets deb                                |
|       	                    | - Linux RPM package (x64)                     	 |  --targets rpm                                |
|       	                    | - Linux AppImage (x64)                    	     |  --targets appimage                           |
|       	                    | - Linux DEB package (ARM64)                   	 |  --targets deb-arm64                          |
|       	                    | - Linux RPM package (ARM64)                   	 |  --targets rpm-arm64                          |
|       	                    | - Linux AppImage (ARM64)                  	     |  --targets appimage-arm64                     |


:::tip

注意：启用 **multi-arch** 选项后，必须通过官方 Rust 官网的 rustup 安装 Rust。不支持通过 **brew** 安装。

对于英特尔芯片用户，请使用以下命令安装 arm64 跨平台封装以支持 M1 芯片：

`rustup target add aarch64-apple-darwin`

对于 M1 芯片用户，请使用以下命令安装 x86 跨平台封装以支持英特尔芯片：

`rustup target add x86_64-apple-darwin`
:::

## 其余参数可查看官网

[官网参数](https://github.com/tw93/Pake/blob/main/docs/cli-usage.md)