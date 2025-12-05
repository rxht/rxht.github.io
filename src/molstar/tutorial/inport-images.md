---
Date: 2025-10-30 09:43:34
LastEditTime: 2025-10-30 09:55:44
title: 4_从图片直接导入分子
description: 聚焦 AI 驱动的图片分子导入功能，详细讲解从图片（如含依拉雷诺分子的图片）裁剪、访问在线平台（https://molstar.szbl.ac.cn/viewer）、拖拽识别分子，到导出分子结构的完整流程，说明功能仅在线可用的关键注意事项，助力科研人员、药物研发者快速将图片分子转化为可分析的数字模型，提升分子处理效率。
head:
  - - meta
    - name: keywords
      content: molstar AI 分子识别，molstar 依拉雷诺分子导入，molstar 在线分子识别，molstar SMILES 代码生成，molstar 分子结构下载，molstar 图片分子转化，molstar molstar.szbl.ac.cn使用
tags:
  - molStar
  - AI
  - SMILES
---

# 从图片直接导入分子

利用人工智能模型，Qbics-MolStar可以直接从图片识别出分子，转化为 **SMILES** 代码，并计算坐标。

假设你用手机拍摄了这么一张图片：

![import-image.webp](./assets/import-image.webp)

这张图片中包含一个分子。我们现在想把它在Qbics-MolStar中可视化出来。这张图片有很多其他元素，让我们把无用元素减裁掉，只保留分子。

![import-image-base.webp](./assets/import-image-base.webp)

现在开始识别。注意：图片分子识别功能不能在本地使用，只能在线使用。

请打开：https://molstar.szbl.ac.cn/viewer 网站，然后把图片拖入浏览器内：

![import-image-drag-file.webp](./assets/import-image-drag-file.webp)

稍等几秒，分子就被成功识别出来，对比如下：

![import-image-result.webp](./assets/import-image-result.webp)

之后，可以在 “磁盘” 面板中用 **Export Models** 下载结构。