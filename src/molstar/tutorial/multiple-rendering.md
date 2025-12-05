---
Date: 2025-10-29 17:26:51
LastEditTime: 2025-10-30 09:55:59
title: 3_选择原子、显示编号、以及多种渲染方式
description: 详细讲解分子可视化工具 Qbics-MolStar 的原子选择（支持 Vmd/Pymol/Jmol/Mol Script4 种语法）、原子编号显示（全原子 / 指定原子）及多种渲染方式（Ball & Stick/Spacefill/Cartoon 等）操作，含 PubChem 化合物（ID:2244）、PDB 蛋白质（ID:1tqn）实操案例，助力科研人员快速掌握分子结构分析核心技能，高效完成分子可视化工作。
head:
  - - meta
    - name: keywords
      content: molStar Vmd 语法使用，molStar Pymol 原子选择，molStar 1tqn 蛋白质渲染，molStar PubChem 化合物下载，molStar 组件管理，molStar Ball & Stick 渲染，molStar Spacefill 显示，molStar Label 原子编号
tags:
  - MolStar
  - Vmd
  - Pymol
  - Jmol
---

# 选择原子、显示编号、以及多种渲染方式

## 选择原子

Qbics-MolStar可以添加任意多个渲染方式，在有的软件中称为representation，在Qbics-MolStar中称为component。可以在分子中，选择一部分原子来进行渲染。

“选择原子”的方式在Qbics-MolStar中非常强大。在 **State Tree** 中点击右键，选择 **Add Component** ，你可以在 **Language** 中看到多种选择原子的方式：

- Mol Script
- Pymol
- Vmd
- Jmol

![multiple-rendering-language-select.webp](./assets/multiple-rendering-language-select.webp)

只要你会这四种软件的选择方法的任一种，就可以利用这方面的语法来选择原子。

::: tip 提示
选择原子的语法，可以参考：

  - Vmd: https://www.ks.uiuc.edu/Training/Tutorials/python/pymol/selection/
  - Pymol: https://pymol.org/2/select.html
  - Jmol: http://wiki.jmol.org/index.php/Selecting
  - Mol Script: https://pekrau.github.io/MolScript/selection.html
:::

下面展示：

1. 打开Qbics-MolStar，在 **Download Structure** 中选择 **PubChem**，输入 `2244`，点击 **Apply**，就可以从 **PubChem** 中下载`2244`号化合物的分子坐标：

![multiple-rendering-2244.webp](./assets/multiple-rendering-2244.webp)

2. 在状态中的 **All** 点击右键，选择 **Add Component** ，选择 **Vmd**，在 **Selection** 中输入 `element H`，就可以选中所有的氢原子，再在 **Representation** 中选择 **Spacefill**，点击 **Apply**，就可以把这些氢原子以 **Spacefill** 形式显示：

![multiple-rendering-add-component.webp](./assets/multiple-rendering-add-component.webp)

3. 如果想修改 Representation，可以右击 **Spacefill**，选择 **Update Decorator** 进行修改。

![multiple-rendering-update-decorator.webp](./assets/multiple-rendering-update-decorator.webp)

## 显示编号

显示出原子编号是个很方便的功能，在状态中点击右键，选择 **Add Component**，选择 **Vmd**，在 **Selection** 中输入 `all`，在 **Representation** 中选择 **Label** 点击 **Add Component**，就可以显示出原子编号：

![multiple-rendering-add-component-label.webp](./assets/multiple-rendering-add-component-label.webp)

当然，如果在 **Selection** 中输入其它选择原子的语法，就可以显示出所选原子的编号。

## 多种渲染方式

Qbics-MolStar可以添加任意多个渲染方式，下面以一个蛋白质为例。

  - 打开Qbics-MolStar，在 **Download Structure** 中选择 **PDB**，输入 `1tqn`，点击 **Apply**，就可以从 **PDB** 中下载`1tqn`号蛋白质的分子坐标：

![multiple-rendering-download-structure.webp](./assets/multiple-rendering-download-structure.webp)

  - 此时，Qbics-MolStar已经默认添加了很多合适的渲染方式。我们现在想选择残基编号为 **75-85** 的原子，使之用 **Ball and Stick** 方式显示，可以这样做：右键点击 **Assembly 1**，选择 **Add Component**，选择 **Vmd**，在 **Selection** 中输入 `resi 75 to 85`，在 **Representation** 中选择 **Ball & Stick**，点击 **Add Component**，就可以把这些原子以 **Ball and Stick** 方式显示：

![multiple-rendering-add-component-ball-stick.webp](./assets/multiple-rendering-add-component-ball-stick.webp)

  - 如果想只看这一部分，可以点击其 **Component** 上的眼睛按钮，使之不显示：

![multiple-rendering-see.webp](./assets/multiple-rendering-see.webp)

如果想删除，就可以点击垃圾桶按钮。

  - 如果想修改**Component**，可以右键点击**Component**，选择 **Update Decorator** 进行修改。点击三个点的图标，可以更加精细的修改显示方法，例如透明度等

![multiple-rendering-options.webp](./assets/multiple-rendering-options.webp)