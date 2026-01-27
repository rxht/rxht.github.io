---
Date: 2026-01-27 14:31:45
LastEditTime: 2026-01-27 14:55:21
description: 表面线框是指在模型表面绘制的线框，用于可视化模型的结构。
head:
  - - meta
    - name: keywords
      content: molstar 用例, 显示表面线框, 教学演示案例
tags:
  - MolStar
  - wireframe
  - surface
---

# wireframe 线框

> 表面线框是指在模型表面绘制的线框，用于可视化模型的结构。

最终效果如下：

![result.webp](assets/result.webp)


## 操作步骤

1. 打开一个文件或下载结构文件，例如 `1tqn.pdb`

2. 新增 **Ligand Components**， 在 **Assembly** 上进行鼠标右键，选择 `Add Component`。

![context-menu.webp](assets/context-menu.webp)

选择参数如下：

![add-component.webp](assets/add-component.webp)

效果如下：

![surface-mesh-result.webp](assets/surface-mesh-result.webp)

3. 修改 **Ligand Components** 的显示方式为 `Surface Wireframe`

![surface-context-menu.webp](assets/surface-context-menu.webp)

在 **Update Decorator** 弹窗中，点击 **Type** 的扩展按钮，修改 **Color Theme** 的颜色为 `Element Symbol`。具体如下：

![3d-representation-params.webp](assets/3d-representation-params.webp)

打开 **Advanced Options** 扩展

![advanced-options.webp](assets/advanced-options.webp)

修改 **Wireframe** 的参数如下：

![wireframe-options.webp](assets/wireframe-options.webp)

根据如上步骤操作，即可得到最终效果。


