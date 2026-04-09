---
Date: 2025-03-18 22:10:44
LastEditTime: 2026-04-09 10:27:18
description: 在 Qbics-MolStar 中自动播放动画。
head:
  - - meta
    - name: keywords
      content: molstar 自动播放动画, 开发示例
tags:
  - MolStar
  - AutoAnimation
  - 开发示例
---

# 自动播放动画

代码示例：启动molstar后自动播放动画，动画速度为1。动画名称为spin，参数为 { speed: 1 }。

```typescript [auto-animation]
plugin.canvas3d?.setProps({ trackball: { animate: { name: 'spin', params: { speed: 1 } } } });

// or

const spec: PluginUISpec = {
  // ...
  canvas3d: {
    ...defaultSpec.canvas3d,
    trackball: {
        ...defaultSpec.canvas3d?.trackball,
        animate: { name: 'spin', params: { speed: 1 } }
    }
  },
} 
```