---
Date: 2026-01-28 11:19:20
LastEditTime: 2026-01-28 13:39:30
description: Molstar RMSD 趋势功能实践教程，展示 RMSD 趋势
tags: 
  - Molstar
  - RMSD
  - rmsd-trend
---

# 显示 RMSD 趋势

## 前置条件

> - **Qbics-MolStar** 客户端支持的操作系统包括 **Windows**、**Linux** 和 **Android**。
> - **Qbics-MolStar** 客户端支持安装版本、绿色免安装版本 和 精简版本。
> - 提示: 请根据您的操作系统选择对应的版本进行下载安装。

1. 进入官网 [https://molstar.szbl.ac.cn/viewer/](https://molstar.szbl.ac.cn/viewer/)
2. 下载 **Qbics-MolStar** 客户端：[https://molstar.szbl.ac.cn/download/](https://molstar.szbl.ac.cn/download/)，安装客户端并双击打开客户端。
3. 如需教程/使用文档，请参考：
    - [Qbics-MolStar 教程](https://rxht.github.io/molstar/tutorial/)
    - [Qbics-MolStar 使用文档](https://rxht.github.io/molstar/use/)
    - [zhjun-sci Qbics-MolStar 教程](https://zhjun-sci.com/qbicsmolstar/doc/)

::: tip 提示
所有格式的轨迹文件均支持 RMSD 趋势功能，非轨迹文件不支持。
支持多文件同时展示 RMSD 趋势。
:::

## 操作步骤

1. 打开或加载轨迹文件，如下图所示：

![traj-file](./assets/traj-file.webp)

2. 在主场景中的空白位置点击鼠标右键，选择 `RMSD Trend`，得到如下结果：

![context-menu](./assets/context-menu.webp)

3. 在 `RMSD Trend` 弹窗中，展示所对应文件的 RMSD 趋势，如下结果：

![rmsd-trend](./assets/rmsd-trend.webp)

::: tip 提示
在 `RMSD Trend` 弹窗中，可以修改如下参数：
- X 轴最小值
- X 轴最大值
- Y 轴最小值
- Y 轴最大值
- 轨迹帧的起始索引
- 轨迹帧的结束索引
- 点击 **Smooth** 按钮，展示平滑后的 RMSD 趋势
:::


## RMSD 趋势功能动画如下

![result](./assets/result.gif)