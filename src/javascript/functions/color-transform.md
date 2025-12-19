---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 21:55:34
---
# 颜色转换

```javascript
const t0 = 4 / 29
const t1 = 6 / 29
const t2 = 3 * t1 * t1
const t3 = t1 * t1 * t1
const Xn = 0.96422
const Yn = 1
const Zn = 0.82521

// color: {r,g,b} ==> {h,c,l}
export function rgbToHcl (color) {
  return labToHcl(rbgToLab(color))
}

// color: {h,c,l} ==> {r,g,b}
export function hclToRgb (color) {
  return labToRgb(hclToLab(color))
}

// {r,g,b} ==> {l,a,b}
function rbgToLab (o) {
  const r = rgb2lrgb(o.r)
  const g = rgb2lrgb(o.g)
  const b = rgb2lrgb(o.b)
  const y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / 1)
  const x = r === g && g === b ? y : xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / 0.96422)
  const z = r === g && g === b ? y : xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / 0.82521)

  return {
    l: 116 * y - 16,
    a: 500 * (x - y),
    b: 200 * (y - z)
  }
}

// {l,a,b} ==> {r,g,b}
function labToRgb ({ l, a, b }) {
  let y = (l + 16) / 116
  let x = isNaN(a) ? y : y + a / 500
  let z = isNaN(b) ? y : y - b / 200

  x = Xn * lab2xyz(x)
  y = Yn * lab2xyz(y)
  z = Zn * lab2xyz(z)

  return {
    r: Math.round(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z)),
    g: Math.round(lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z)),
    b: Math.round(lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z))
  }
}

// {l,a,b} ==> {h,c,l}
function labToHcl ({ l, a, b }) {
  const h = Math.atan2(b, a) * (180 / Math.PI)

  return {
    h: h < 0 ? h + 360 : h,
    c: Math.sqrt(a * a + b * b),
    l: l
  }
}

// {h,c,l} ==> {l,a,b}
function hclToLab ({ h, c, l }) {
  const h2 = h * (Math.PI / 180)

  return {
    l,
    a: Math.cos(h2) * c,
    b: Math.sin(h2) * c
  }
}

function rgb2lrgb (x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
}

function lrgb2rgb (x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055)
}

function xyz2lab (t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0
}

function lab2xyz (t) {
  return t > t1 ? t * t * t : t2 * (t - t0)
}

function hexToRgb (hex) {
  let m = /^#([0-9a-fA-F]{3,8})$/.exec(hex)
  if (!(m && m[1] && m[1].length === 6)) return null

  m = parseInt(m[1], 16)
  return { r: m >> 16 & 0xff, g: m >> 8 & 0xff, b: m & 0xff, a: 1 }
}

function hex (value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0))
  return (value < 16 ? '0' : '') + value.toString(16)
}
function rgbToHex (o) {
  return `#${hex(o.r)}${hex(o.g)}${hex(o.b)}`)
}
```
