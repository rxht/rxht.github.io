# 设置 dpi

> 安卓 2.3 的检测感觉已经不需要了，所以可以直接将 meta 标签写在页面里

```javascript
(function () {
  const width = parseInt(window.screen.width)
  const designWidth = 450
  const scale = width / designWidth
  const userAgent = navigator.userAgent.toLowerCase()
  const metaHead = '<meta name="viewport" content="width=' + designWidth + ','
  if (/android (\d+\.\d+)/.test(userAgent)) {
    if (parseFloat(RegExp.$1) > 2.3) metaHead += 'minimum-scale=' + scale + ',maximum-scale=' + scale + ','
  } else {
    metaHead += 'user-scalable=no,';
  }
  metaHead += 'target-densitydpi=device-dpi">';
  document.write(metaHead);
})()
```