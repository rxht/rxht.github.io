---
Date: 2026-08-24 14:11:29
LastEditTime: 2026-08-24 15:04:38
description: linux 版本安装，出现的问题以及解决方法
tags:
    - linux
    - molstar
    - Qbics-MolStar
    - deb
    - 安装
    - 权限
---


# linux 版本安装

[linux 下载地址](https://molstar.szbl.ac.cn/download/)

本教程适用于 Debian / Ubuntu 等衍生系统，介绍如何安装 `.deb` 版本的 Qbics-MolStar，以及解决安装后常见的权限问题。


## 安装步骤

建议通过 `apt` 命令安装 `.deb` 包，以便自动处理依赖关系：

```bash
sudo apt install ./Qbics-Molstar-1.2.4.deb
```

> **注意**：该软件默认安装至 `/opt/Qbics-Molstar` 目录下。

## 问题 1：内置更新功能因权限不足失败

### 现象

软件安装成功后，在菜单中点击 **Help → Check Update** 时提示更新完成，软件重新启动后版本号未更新。

### 原因

使用 `sudo apt install` 安装后，`/opt/Qbics-Molstar` 目录及其子文件的属主为 `root`。而软件运行时是以当前普通用户身份启动的，缺乏对该目录的写入权限，导致无法下载和替换更新文件。

## 解决方法

推荐按以下优先级尝试解决：

### 方案一：更改目录属主（推荐）

将安装目录的所有权递归赋予当前用户，这是最安全且标准的修复方式。

```bash
sudo chown -R $USER:$USER /opt/Qbics-Molstar
```

### 方案二：使用免安装版本（推荐）
若您不需要通过系统包管理器管理该软件，建议直接下载 **Standalone（免安装）** 版本。将其解压至用户目录（如 `$HOME/Applications`），即可从根本上避免系统级权限问题。

### 方案三：放宽目录权限（不推荐用于生产环境）
直接开放目录的读写执行权限。**注意：此操作存在安全风险，不建议在多用户服务器环境中使用。**

```bash
sudo chmod -R 777 /opt/Qbics-Molstar
```

## 卸载 Qbics-Molstar

如需卸载，可使用以下命令：

```bash
sudo apt remove molstar-exec
```

如需彻底删除配置与数据文件，可使用：

```bash
sudo apt purge molstar-exec
```
