---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 21:56:01
---
# 图片懒加载

> 当一个页面中的图片资源很多的时候，为了加载时有好的体验，优先加载出现在可视区域的图片，随着网页往下滚动，逐渐加载其它的图片资源，这就是所谓的懒加载。

## 方案一

```javascript
// 创建 IntersectionObserver 实例
const observer = new IntersectionObserver((entries, observer) => {
  // 遍历观察的元素
  entries.forEach(entry => {
    // 如果元素可见
    if (entry.isIntersecting) {
      // 加载图片
      const img = entry.target;
      const src = img.getAttribute('data-src');
      img.setAttribute('src', src);

      // 停止观察该元素
      observer.unobserve(img);
    }
  });
});

// 获取所有需要懒加载的图片元素
const lazyImages = document.querySelectorAll('.lazy-img');

// 观察每个图片元素
lazyImages.forEach(image => {
  observer.observe(image);
});
```

## 方案二

```javascript
//获取全部img标签
const images = document.getElementsByTagName("img");
function lazyImages() {
    for (let i of images) {
        //判断当前图片是否在可视区内
        if (i.offsetTop <= window.innerHeight + window.scrollY) {
            //获取自定义data-src属性的值
            const trueSrc = i.getAttribute("data-src");
            //把值赋值给图片的src属性
            i.setAttribute("src", trueSrc);
        }
    }
}
window.addEventListener("scroll", (e) => {
    //当发生滚动事件时调用lazyImages事件
    lazyImages();
});
//没发生滚动事件时也要先执行一次
lazyImages();
```

## 方案三

```javascript
function lazyImages() {
    for (let i of images) {
        if (i.getBoundingClientRect().top < window.innerHeight) {
            let trueSrc = i.getAttribute("data-src");
            i.setAttribute("src", trueSrc);
        }
    }
}
window.addEventListener("scroll", (e) => {
    lazyImages();
});
lazyImages();
```
