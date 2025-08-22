---
Date: 2025-08-15 21:52:30
LastEditTime: 2025-08-22 17:32:55
description: 使用 Qbics-MolStar 加载并播放分子动力学轨迹（XYZ、DCD、XTC 等），分步讲解加载轨迹文件、同步拓扑、播放控制与导出动画的完整流程。
head:
  - - meta
    - name: keywords
      content: molstar 轨迹可视化, 分子动力学轨迹, xyz dcd xtc 播放, 轨迹动画导出, Qbics-MolStar 教程
tags:
  - MolStar
  - Trajectory
  - Animation
  - xyz
---

# 1.可视化轨迹并导出动画

## 以.xyz 文件为例查看轨迹并导出动画

1. 通过教程 1 的两种方法（拖拽 / 选择文件）使 .xyz 文件在 Qbics-MolStar 界面显示渲染。

![trajectory](./assets/trajectory.webp)

2. 请注意，可查看轨迹的前提是当前您所选取的 .xyz 文件存在多帧信息。

3. 此处，我们开启 **Dynamic Bonds** 按钮，以动态观察键连的变化。

![trajectory-dynamic-bond](./assets/trajectory-dynamic-bond.webp)

4. 点击图形界面左上角 Select Animation 按钮，选择不同的轨迹或场景动画演示方式。在此处，我们选择系统默认的 **Animate Trajectory** 方法（分子模拟轨迹）

![trajectory-animation](./assets/trajectory-animation.webp)

5. 点击 Start 按钮，渲染轨迹动画。

![trajectory-animation-play](./assets/trajectory-animation-play.webp)

5. 动画播放效果如下：

![trajectory-animation-play](./assets/trajectory-animation-play.gif)

6. 点击 Qbics-MolStar 界面右下角 Export Animation 按钮实现轨迹导出功能（此处与 Select Animation 按钮下的选择情况一致）。

![trajectory-animation-export](./assets/trajectory-animation-export.webp)

7. 点击 **Render** 按钮，使 Qbics-Molstar 进行轨迹处理。（若提示 Rendering successful 后，您希望更换当前的处理结果，可以点击下方的 Clear 做清除处理。）

![trajectory-animation-export-render](./assets/trajectory-animation-export-render.webp)

8. 存在 4 种文件类型可以导出：**MP4**，**AVI**，**GIF**，**MKV**。
   ![trajectory-animation-export-file-type](./assets/trajectory-animation-export-file-type.webp)

9. 确定希望导出的文件类型后，点击 Save Animation 导出结果。
   ![trajectory-animation-save](./assets/trajectory-animation-save.webp)

10. 此处作为示例，为您展示 **GIF** 的输出结果。

    - GIF 文件：

![trajectory-animation-result](./assets/trajectory-animation-result.gif)

## 以 .gro + .xtc 文件为例查看轨迹并导出动画

---

1. 在 Load Files - Model 部分选择 .gro 文件作为体系的初始结构信息（选择文件的操作步骤详见教程 1）

![trajectory-load-model](./assets/trajectory-load-model.webp)

2. 在 Load Files - Coordinates 部分选择 .xtc 文件获取模拟过程中的轨迹坐标信息（选择文件的操作步骤详见教程 1）

![trajectory-load-coordinates](./assets/trajectory-load-coordinates.webp)

3. 点击 Apply 去命令 Qbics-MolStar 渲染轨迹

![trajectory-load-apply](./assets/trajectory-load-apply.webp)

4. 渲染结果如下：

![trajectory-gro-xtc-show](./assets/trajectory-gro-xtc-show.webp)

5. 重复本篇教程的上一示例中，关于导出动画的操作流程。

![trajectory-gro-xtc-animation-export-render](./assets/trajectory-gro-xtc-animation-export-render.webp)

## 以蛋白质为例导出动画

1. 在此处我们以 **3KB0** 蛋白质为例。

2. 首先，我们在 PDB Id 位置键入 **3KB0**， 并点击 Apply 获取蛋白质文件。

![download-3KB0](./assets/download-3KB0.webp)

3. 渲染结果如下：

![download-3KB0-show](./assets/download-3KB0-show.webp)

4. 针对蛋白质体系，我们在 **Animation** 选项中选择 **Camera Spin**（旋转相机视角）来进行动画演示

![animation-camera-spin](./assets/animation-camera-spin.webp)

5. 在 **Export Animation** 部分，更改默认 **Animate Trajectory** 为 **Camera Spin**。

![export-animation-camera-spin](./assets/export-animation-camera-spin.webp)

6. 点击 **Render** 按钮，使 **Qbics-Molstar** 实现轨迹渲染

![export-animation-camera-spin-render](./assets/export-animation-camera-spin-render.webp)

7. 根据需要选择对应的文件格式

![export-animation-camera-spin-file-type](./assets/export-animation-camera-spin-file-type.webp)
