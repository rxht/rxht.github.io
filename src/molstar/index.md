---
Date: 2025-01-20 14:41:50
LastEditTime: 2026-08-19 17:19:19
description: 详细介绍 Qbics-MolStar 的功能、支持的文件格式、开发教程及使用步骤。
tags:
  - MolStar
  - Qbics
  - 分子可视化
head:
  - - meta
    - name: keywords
      content: molstar, qbics-molstar, 分子可视化, 蛋白质结构, pdb 查看器, 3d 分子, 在线工具, 轨迹分析, 分子轨道, webmcp
---

# Qbics-MolStar

> 基于开源 [MolStar](https://molstar.org) 的**增强编辑器版本**，集成了 MultiWfn、xTB、Ketcher、Maple、Openbabel 等计算化学工具链，支持 **60+ 种文件格式** 的在线/桌面端分子可视化与分析。


## 相关资源导航

> [!tip]
> 后续文档说明会持续更新至 [官方文档站](http://molstar.szbl.ac.cn/docs/)，最新功能会同步到 [在线 Viewer](http://molstar.szbl.ac.cn/viewer/)。

| 类型 | 链接 | 说明 |
|------|------|------|
| 🌐 官方网站 | [molstar.org](https://molstar.org) | MolStar 开源项目主页 |
| 📖 官方文档 | [molstar.org/docs](https://molstar.org/docs) | MolStar 官方开发文档 |
| 🤖 AI 生成文档 | [deepwiki.com/molstar/molstar](https://deepwiki.com/molstar/molstar) | 由 AI 自动生成的架构与 API 文档 |
| 🖥️ 在线编辑器 | [molstar.szbl.ac.cn/viewer](http://molstar.szbl.ac.cn/viewer/) | Qbics-MolStar 带编辑器版本（Web） |
| 💻 桌面客户端 | [molstar.szbl.ac.cn/download](http://molstar.szbl.ac.cn/download) | Windows / Linux / Android 客户端下载 |
| 📚 使用手册 | [molstar.szbl.ac.cn/docs](http://molstar.szbl.ac.cn/docs/) | Qbics-MolStar 用户手册与基础教程 |
| 📝 功能介绍 | [zhjun-sci.com/qmolstar.html](https://zhjun-sci.com/qmolstar.html) | 第三方功能介绍与说明 |

##  Logo 资源

| Logo | 用途 |
|------|------|
| ![molstar](./assets/molstar.svg) | Logo |
| ![molstar-icon](./assets/molstar-icon.svg) | 图标版本 |


## 核心功能一览

### 编辑与分析

| 功能模块 | 说明 |
|----------|------|
| ✏️ 结构编辑 | 添加/删除原子、编辑键长/键角/二面角、旋转平移原子片段 |
| 📏 几何测量 | 原子距离、键角、二面角测量，支持轨迹趋势图 |
| 🧮 MultiWfn 集成 | 分子表面定量分析、NCI 分析、波函数分析 |
| ⚡ xTB 计算 | 结构优化（LBFGS）、过渡态搜索（NEB/PRFO）、频率分析 |
| 🗺️ Maple 功能 | 结构优化、过渡态搜索、振幅分析 |
| 🔬 分子轨道 | 绘制轨道能级图、显示 α/β 轨道等值面 |
| 📐 RMSD 分析 | 轨迹 RMSD 趋势计算与展示 |
| 🧩 点群检测 | 自动检测分子点群对称性 |
| 📦 PBC Box | 周期性边界盒子，支持调整大小和位置 |
| 🔌 WebMCP | 支持外部 Agent 接入（webmcp / skills 双模式） |

### 表现与导出

- **快照导出**：批量导出高质量图片（支持轨迹逐帧）
- **动画录制**：播放/暂停动画，导出视频文件到本地
- **文件互转**：60+ 格式之间互转（如 xyz → pdb → mol2）
- **Ketcher 集成**：2D 结构式绘制，SMILES → 3D 结构


## 支持的文件格式（60+ 种）

### 坐标与结构文件

| 格式 | 扩展名 | 说明 |
|------|--------|------|
| PDB | `.pdb` `.ent` | 蛋白质结构数据库经典格式 |
| mmCIF | `.cif` `.mmcif` `.mcif` `.bcif` | PDB 官方主存档格式 |
| PDBQT | `.pdbqt` | AutoDock 对接格式 |
| PDBML | `.xml` | PDBML 格式 |
| PQR | `.pqr` | 带电荷半径的 PDB |
| XYZ | `.xyz` `.txt` | 简单坐标格式，支持多帧轨迹 |
| GRO | `.gro` | GROMACS 坐标文件 |
| MOL/SDF | `.mol` `.sdf` `.sd` | MDL 化学结构格式 |
| MOL2 | `.mol2` | Tripos 分子格式（含力场信息） |
| PSF | `.psf` | CHARMM/NAMD 拓扑文件 |
| Amber 拓扑 | `.prmtop` `.parm7` `.top` | Amber 力场拓扑 |

### 量子化学格式

| 格式 | 扩展名 | 说明 |
|------|--------|------|
| 波函数 | `.wfn` `.wfx` `.mwfn` | 波函数文件 |
| Molden | `.molden` | Molden 格式（轨道/频率） |
| Gaussian | `.fch` `.fchk` `.log` `.out` `.gjf` `.inp` | Gaussian 输入/输出/检查点 |
| NBO | `.47` | NBO 分析结果文件 |
| ORCA | `.out` | ORCA 输出文件 |

### 轨迹文件

| 格式 | 扩展名 | 说明 |
|------|--------|------|
| LAMMPS | `.lammpstrj` `.data` | LAMMPS 轨迹/数据文件 |
| DCD | `.dcd` | CHARMM/NAMD 轨迹 |
| XTC | `.xtc` | GROMACS 压缩轨迹 |
| TRR | `.trr` | GROMACS 全精度轨迹 |
| NetCDF | `.nc` `.nctraj` | Amber NetCDF 轨迹 |
| Amber | `.mdcrd` `.rst7` | Amber 坐标/重启文件 |
| H5MD | `.h5md` | HDF5 分子动力学格式 |

### 体积与密度数据

| 格式 | 扩展名 | 说明 |
|------|--------|------|
| CCP4/MRC | `.ccp4` `.mrc` `.map` | 电子密度图（Cryo-EM/X-ray） |
| DSN6/BRIX | `.dsn6` `.brix` | 预计算密度图 |
| OpenDX | `.dx` `.dxbin` | 通用体数据格式 |
| CUBE | `.cube` `.cub` | 格点标量场 |
| DAT | `.dat` | 自定义标量场（gnuplot 兼容） |
| MTZ | `.mtz` | CCP4 反射数据 |

### 其他格式

| 格式 | 扩展名 | 说明 |
|------|--------|------|
| 图像识别 | `.png` `.jpg` `.jpeg` | 拖入图片识别为结构数据 |
| 3D 模型 | `.ply` `.obj` `.vtp` | 通用 3D 网格格式 |
| 粗粒化 | `.xml` | XML 粗粒化拓扑 |
| RXH | `.rxh` | 含键连信息的紧凑坐标格式 |
| SMILES | `.smi` | 结构式表示 |
| 压缩包 | `.zip` | 压缩文件（支持批量加载） |
| 化学绘图 | Ketcher 内建 | 2D → 3D 结构生成 |


## 快速开始

### 方式一：Web 在线使用

1. 打开 [https://molstar.szbl.ac.cn/viewer/](http://molstar.szbl.ac.cn/viewer/)
2. 点击 **Load Files** 或直接 **拖拽文件** 到窗口
3. 支持同时拖入：坐标文件 + 轨迹文件 + 密度图 + 图片
4. 使用工具栏调整显示样式、测量、编辑

### 方式二：桌面客户端

| 平台 | 安装包 | 大小 | 说明 |
|------|--------|------|------|
| Windows 10+ | 64-bit EXE | ~150 MB | 标准安装版 |
| Windows 10+ | 免安装版 | ~200 MB | 解压即用 |
| Windows 10+ | 精简版 | ~7 MB | 需联网加载资源（Ctrl+Shift+R 强刷） |
| Linux (Debian) | 64-bit DEB | ~110 MB | 标准安装包 |
| Linux (Debian) | 免安装版 | ~430 MB | 解压即用 |
| Linux (Debian) | 精简版 | ~9 MB | 需联网加载资源 |
| Android | APK | ~2 MB | 移动端版本 |

> 💡 **升级提示**：无需重复下载！在工具栏点击 **About → Check Update** 即可完成版本升级。
> 💡 **重要提示**：首次使用建议先点击一次 Check Update。


## 常见使用场景

### 场景 1：查看蛋白质结构

```
1. 打开 Viewer → Download Structure → 输入 PDB ID（如 1TQN）
2. 默认 Cartoon 表示自动加载
3. 右侧 Sequence 面板可点击残基定位
4. 右键原子 → 添加测量 / 显示环境
```

### 场景 2：播放 MD 轨迹

```
1. 拖入 .gro + .xtc（或 .dcd / .trr）
2. 打开左上角动画播放控制器
3. 点击播放 ▶ 或拖动滑块切换帧
4. 使用 Measurements 面板记录几何量随时间的演变
```

### 场景 3：查看分子轨道（mwfn 文件）

```
1. 拖入 .mwfn 文件（含分子轨道数据）
2. 右侧轨道列表选择目标轨道（HOMO/LUMO 等）
3. 调整 Isovalue 滑块控制等值面阈值
4. 可叠加显示 Cartoon + 轨道等值面
```

### 场景 4：结构编辑与格式转换

```
1. 打开坐标文件 → 点击编辑按钮 ✏️
2. 选择原子 → 修改键长/键角/二面角
3. 旋转/平移选中的原子片段
4. 导出 → 选择目标格式（如 .pdb / .mol2 / .xyz）
```


## WebMCP：让 AI Agent 操控 MolStar

Qbics-MolStar v0.2.14 新增 **WebMCP** 功能，允许外部 AI Agent 通过标准协议连接并操控 Viewer：

| 能力 | 说明 |
|------|------|
| 🔗 连接方式 | 支持 webmcp 协议接入 + skills 方式接入 |
| 📂 文件操作 | 打开本地文件 / 加载 URL 文件 / 导出文件到本地 |
| 🧬 结构获取 | 获取原子坐标 / 指定帧坐标 / 当前文件列表 |
| 📊 分析功能 | 获取振动频率 / 测量距离键角二面角 / RMSD |
| ⚡ 计算调用 | 调用 xTB 优化 / MultiWfn 分析 |
| 🎬 动画控制 | 播放 / 暂停 / 导出动画 |
| 🎨 视觉控制 | 切换球棍/球模型 / 编辑结构 / 调整相机参数 |

> 这让 MolStar 不仅是一个可视化工具，更成为 **AI for Science** 工作流中的可程序化组件。

## 技术架构

Qbics-MolStar 基于以下开源项目构建：

| 项目 | 角色 |
|------|------|
| [MolStar](https://molstar.org) | 核心 3D 可视化引擎（WebGL/TypeScript） |
| [MultiWfn](http://sobereva.com/multiwfn/) | 波函数分析与电子结构计算 |
| [PdbTop](https://github.com/Valdes-Tresanco-MS/PdbTop) | PDB 拓扑处理 |
| [FFmpeg](https://ffmpeg.org) | 动画视频编码 |
| [OpenBabel](https://openbabel.org) | 化学格式互转 |
| [Mokit](https://gitlab.com/jxzou/mokit) | 量子化学接口工具 |
| [MAPLE](https://github.com/radovanbast/maple) | 分子建模与势能面分析 |
| [Ketcher](https://ketcher.github.io/) | 2D 化学结构编辑器 |


## 相关链接汇总

- 🌐 [MolStar 官网](https://molstar.org)
- 📖 [MolStar 官方文档](https://molstar.org/docs)
- 🤖 [DeepWiki - MolStar](https://deepwiki.com/molstar/molstar)
- 🖥️ [Qbics-MolStar 在线 Viewer](http://molstar.szbl.ac.cn/viewer/)
- 💻 [Qbics-MolStar 下载页](http://molstar.szbl.ac.cn/download)
- 📚 [Qbics-MolStar 文档站](http://molstar.szbl.ac.cn/docs/)
