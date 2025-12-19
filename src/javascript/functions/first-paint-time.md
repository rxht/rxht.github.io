---
Date: 2025-08-14 09:27:40
LastEditTime: 2025-08-14 09:32:59
---

# 测量白屏时间

> 白屏时间（First Paint Time）是一个非常重要的指标。它指的是从用户输入网址并按下回车键，到浏览器开始渲染页面内容的时间段。在这段时间内，用户看到的只是一个空白页面，因此白屏时间的长短直接影响了用户的体验。

白屏时间包括以下几个阶段：

- DNS解析：浏览器将域名解析为IP地址。

- 建立TCP连接：浏览器与服务器建立TCP连接（三次握手）。

- 发起HTTP请求：浏览器向服务器发送HTTP请求。

- 服务器响应：服务器处理请求并返回响应数据。

- 浏览器解析HTML：浏览器解析HTML文档并构建DOM树。

- 浏览器渲染页面：浏览器根据DOM树和CSSOM树生成渲染树，并开始渲染页面。

- 页面展示第一个标签：浏览器首次将页面内容渲染到屏幕上。


```html [测量白屏时间 demo]
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
<h1>Hello, World!</h1>
<script>
    const observer = new PerformanceObserver((list) => {
      // 获取所有的性能指标
      const entries = list.getEntries();
      for(const entry of entries) {
        // 'first-paint' 表示页面首次开始绘制的时间点，也就是白屏结束的时间点
        if(entry.name === 'first-paint') {
          const whiteScreenTime = entry.startTime;
          console.log(`白屏时间：${whiteScreenTime}ms`);
        }
      }
    })
    // 首次绘制  first-paint
    // 首次内容绘制  first-contentful-paint 事件
    // observe 监听性能指标
    // buffered 属性设置为 true，表示包含性能时间线缓冲区中已经记录的相关事件
    // 这样即使在创建 PerformanceObserver 之前事件已经发生，也能被捕获到
    observer.observe({ type: 'paint', buffered: true });
  </script>
</body>
</html>
```