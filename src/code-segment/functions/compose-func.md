---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 21:55:39
---
# 组合函数

::: code-group

```javascript [同步]
const compose = (...fns) => (input) => fns.reduceRight((chain, func) => func(chain), input);

const compose = (...functions) => (input) => functions.reduceRight((chain, func) => func(chain), input);

const compose = (...functions) => (value) => {
	 return functions.reduceRight((currentValue, currentFunction) => {
		 return currentFunction(currentValue);
	 }, value);
 };
```

```javascript [异步 js]
export const composeAsync = (...fns) => (input) => fns.reduceRight((chain, func) => chain.then(func), Promise.resolve(input));
```

```typescript [异步 ts]
export const composeAsync: any = (...fns: Promise<Function>[]) => (input: any) => fns.reduceRight((chain: Promise<Function>, func: Function | Promise<Function> | any) => chain.then(func), Promise.resolve(input));
```
:::


使用说明

```javascript
const a = (value) => {
    console.log('a_' + value)
    return 'a_' + value
}
const b = (value) => {
    console.log('b_' + value)
    return 'b_' + value
}
const c = (value) => {
    console.log('c_' + value)
    return 'c_' + value
}
// 调用函数组合
pipe(c,b,a)('rxh')
// 调用函数a
a_rxh
// 调用函数b，并将a的结果传给b
b_a_rxh
// 调用函数c，并将b的结果传给c
c_b_a_rxh
// 最终输出结果
'c_b_a_rxh'
```
