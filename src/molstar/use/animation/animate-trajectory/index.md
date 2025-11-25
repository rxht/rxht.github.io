---
Date: 2025-11-20 17:36:55
LastEditTime: 2025-11-25 11:20:31
description: 本文详细介绍 Qbics-MolStar 软件查看.xyz 文件分子轨迹并导出动画的完整步骤，涵盖多帧.xyz 文件加载、Dynamic Bonds 动态键连开启、Animate Trajectory 模式选择及动画渲染导出，助力科研人员直观观察原子运动与键连变化，适用于分子动力学模拟数据可视化场景。
head:
  - - meta
    - name: keywords
      content: .xyz 文件轨迹查看,Qbics-MolStar 教程,分子动画导出,多帧 xyz 可视化,Dynamic Bonds 动态键连,分子动力学模拟,原子轨迹渲染,MolStar 动画导出步骤
tags:
  - MolStar
  - Animate
  - Trajectory
  - Animate Trajectory
---

# Animate Trajectory

## 以.xyz 文件为例查看轨迹动画

1. 在 Qbics-MolStar 界面打开或拖入 .xyz 文件 显示渲染。

![trajectory](../../../tutorial/assets/trajectory.webp)

2. 请注意，可查看轨迹的前提是当前您所选取的 .xyz 文件存在多帧信息。

3. 此处，我们开启 **Dynamic Bonds** 按钮，以动态观察键连的变化。

![trajectory-dynamic-bond](../../../tutorial/assets/trajectory-dynamic-bond.webp)

4. 点击图形界面左上角 Select Animation 按钮，选择不同的轨迹或场景动画演示方式。在此处，我们选择系统默认的 **Animate Trajectory** 方法（分子模拟轨迹）

![trajectory-animation](../../../tutorial/assets/trajectory-animation.webp)

5. 点击 Start 按钮，渲染轨迹动画。

![trajectory-animation-play](../../../tutorial/assets/trajectory-animation-play.webp)

5. 动画播放效果如下：

![trajectory-animation-play](../../../tutorial/assets/trajectory-animation-play.gif)
