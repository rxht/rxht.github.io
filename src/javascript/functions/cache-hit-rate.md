---
Date: 2025-03-18 22:10:44
LastEditTime: 2026-08-11 15:33:24
description: 缓存命中率指标
tags: 
    - 缓存命中率指标
    - 缓存命中率
---

# 缓存命中率指标

```javascript
// 上报数据到 Grafana
function report(name, label) {
// ...
}

// 检查资源加载是否命中缓存
function checkResourceCacheHit() {
    // 获取页面加载性能信息
    const perfEntries = performance.getEntriesByType('resource');

    for (const entry of perfEntries) {
        // 判断资源的加载时间是否小于50毫秒
        // 50ms 来自于经验总结，可以根据实际情况调整
        let hitCache = entry.duration < 50;
        report('cacheHiteRate', hitCache);
    }
}

setTimeout(() => {
    checkResourceCacheHit();
}, 3000);
```
