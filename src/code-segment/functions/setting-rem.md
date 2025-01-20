# 设置 rem

::: details 防止 ios 中微信字体变大后布局错乱【点我查看代码】
```css
body {
    -webkit-text-size-adjust: 100% !important; 
}
```
:::

```javascript
(function (doc, win) {
  const docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 37.5 * (clientWidth / 375) + 'px';

      // 安卓微信中字体调大后适配
      if(!doc.body) return;
      const d = doc.createElement('div');
      d.style.cssText="width:10rem;height:0;overflow: hidden;position:absolute;z-index:-1;visibility: hidden;";
      doc.body.appendChild(d);
      const dw =  d.offsetWidth;// 1rem的实际展示px值
      doc.body.removeChild(d);
      const fz = 10 * ( 37.5 * (clientWidth / 375)); //正常计算出来的rem基准值 , 可自行修改为rem计算好的值
      const realRem = fz;
      if(dw !== fz){//不相等 则被缩放了
        realRem = Math.pow(fz , 2) / dw / 10 ;
        docEl.style.fontSize = realRem + 'px';
      }
    };
  recalc()
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```