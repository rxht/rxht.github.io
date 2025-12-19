---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 21:55:45
---
# 切换浏览器选项卡时更改favicon

```javascript
const favicon = document.querySelector('link[rel="icon"]')
document.addEventListener("visibilitychange", () => {
    const hidden = document.hidden
    favicon.setAttribute(
        "href", 
        `/favicon${hidden ? "-hidden" : ""}.ico`
    )
})
```

效果如下：

![favicon-change](./assets/favicon-change.gif)
