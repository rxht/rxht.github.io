---
Date: 2025-07-15 09:52:00
LastEditTime: 2025-08-22 17:36:06
description: 在 Qbics-MolStar 中快速切换分子的不同表示方式（Cartoon、Ball-and-Stick、Surface 等），并自定义颜色与透明度。
head:
  - - meta
    - name: keywords
      content: molstar 表示方式, switchRepresentation, Cartoon Ball-and-Stick, 分子样式切换
tags:
  - MolStar
  - Representation
  - 操作示例
---

# 切换当前的 Representation

例如用户所打开的结构显示结果如下图所示，但是需要显示为 `棍棒模型/球棍模型` 时，可以如下的步骤实现切换。

![Representation defalut](./assets/switchRepresentation_default.webp)

鼠标移动到如下图所示的 `Cartoon`，然后点击鼠标右键，选择 `Update Decorator` 菜单，然后会有一个 `Update Decorator` 的弹窗出现。

:::tip
打开文件后，默认的 Representation 不一定为 `Cartoon`，用户需根据实际的情况进行调整。
:::

![menu](./assets/switchRepresentation_menu.webp)

![modal](./assets/switchRepresentation_modal.webp)

## 切换 Representation 的表现形式

点击 `Update Decorator` 弹窗内的 `3D Representation` 功能下的 `Type` 选项， 不是点击后面的三个点。

> 参数后面的三个点表示为扩展参数，有些高级功能可能需要使用到其中的参数，一般情况下可以忽略。

![select](./assets/switchRepresentation_type_select.webp)

当选择完对应的表现形式后会自动更新主界面中的显示效果，如下图所示。

![type](./assets/switchRepresentation_type_result.webp)

## 切换 Color 的表现形式

点击 `Update Decorator` 弹窗内的 `3D Representation` 功能下的 `Color Theme` 选项， 不是点击后面的三个点。

> 参数后面的三个点表示为扩展参数，有些高级功能可能需要使用到其中的参数，一般情况下可以忽略。

![select](./assets/switchRepresentation_color_select.webp)

当选择完对应的表现形式后会自动更新主界面中的显示效果，如下图所示。

![type](./assets/switchRepresentation_color_result.webp)

## 切换 Size 的表现形式

点击 `Update Decorator` 弹窗内的 `3D Representation` 功能下的 `Size Theme` 选项， 不是点击后面的三个点。

> 参数后面的三个点表示为扩展参数，有些高级功能可能需要使用到其中的参数，一般情况下可以忽略。

![select](./assets/switchRepresentation_size_select.webp)

当选择完对应的表现形式后会自动更新主界面中的显示效果，如下图所示。

![type](./assets/switchRepresentation_size_result.webp)
