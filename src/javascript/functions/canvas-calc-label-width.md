---
Date: 2025-03-18 22:10:44
LastEditTime: 2026-08-11 15:33:36
description: 计算 Canvas 中文字渲染宽度
tags: 
    - 计算 Canvas 中文字渲染宽度
    - Canvas 文字渲染
    - 文字渲染宽度
    - 文字渲染性能
---

# 计算 Canvas 中文字渲染宽度

```javascript
function getLabelWidthCanvas(arr, defaultFont) {
  // 创建一个全局canvas元素
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
  function getPageFont() {
    // 获取<html>元素的样式
    const htmlStyles = window.getComputedStyle(document.documentElement);

    // 获取font-family属性值
    const fontFamily = htmlStyles.getPropertyValue('font-family');

    return fontFamily;
  }
  const font = defaultFont || `12px ${getPageFont()}`;
  let maxWidth = 0;
  if (arr.length > 0) {
    arr.forEach(str => {
      const width = getStringPixelWidth(str, font);
      maxWidth = Math.max(width, maxWidth);
    });
  }
  return maxWidth;
  function getStringPixelWidth(text: string, font: string) {
    // 设置字体样式
    context.font = font;
    // 使用measureText方法获取文本宽度
    const metrics = context.measureText(text);
    // 返回文本宽度，即像素长度
    return metrics.width;
  }
}
```
