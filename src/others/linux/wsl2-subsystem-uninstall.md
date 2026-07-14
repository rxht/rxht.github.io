---
Date: 2026-07-14 22:28:37
LastEditTime: 2026-07-14 23:16:40
title: WSL2 卸载 Ubuntu_24_04
description: 详细介绍 Widows 子系统卸载 Ubuntu 24.04
tags:
  - wsl2
  - ubuntu
  - 24.04
  - uninstall
  - subsystem
  - windows
  - linux
---

# Widows 子系统卸载 Ubuntu 24.04

## 查看已安装的发行版

打开 PowerShell（管理员权限） 或 Windows 终端，执行：

```sh:no-line-numbers
wsl --list --verbose

# 示例输出：
# NAME STATE VERSION
# * Ubuntu-24.04 Running 2
# Ubuntu-24.04 Stopped 2

```

## 停止目标发行版

如果目标发行版正在运行，先终止它：

```sh:no-line-numbers
wsl --terminate Ubuntu-24.04
```

## 卸载目标发行版

执行以下命令注销并删除该发行版：

```sh:no-line-numbers
wsl --unregister Ubuntu-24.04
```

## 验证卸载结果

再次查看已安装列表：

```sh:no-line-numbers
wsl --list --verbose

# 示例输出：
# NAME STATE VERSION
```
## 清理残留文件

删除如下目录：

`C:\Users\xxx\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu24.04LTS_79rhkp1fndgsc`


## 提示与注意事项：

- 此操作仅卸载指定的 Ubuntu，不影响 WSL 功能本身，可随时重新安装其他发行版。

- 若需彻底移除 WSL，可在“启用或关闭 Windows 功能”中取消勾选 适用于 Linux 的 Windows 子系统 和 虚拟机平台。

- 卸载前务必备份重要数据，以免无法恢复。
