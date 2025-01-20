# 禁止实例访问原型链、构造函数

禁止实例通过__proto__访问原型链和构造函数，不影响原型链调用

```javascript
function freezeProto(obj) {
  if (!Object.isExtensible(obj)) return
  Object.defineProperty(obj, '__proto__', {
    enumerable: false, // 控制属性是否可以枚举，默认值是false
    // writable: false, //控制属性是否可以被修改，默认值是false, 此属性个get/set属性冲突
    configurable: false, //控制属性是否可以被删除，默认值是false
    get: function () {
      return undefined
    },
    set: function () {
      throw new Error('__proto__ can not be written.')
    }
  })
}
```