---
Date: 2025-08-14 09:27:40
LastEditTime: 2026-08-11 15:30:23
description: Node 学习记录
tags: 
    - node
    - 学习记录
    - 学习笔记
    - 运行原理
---



# Node
 node 是一个基于 chrome v8 引擎的 javascript 运行环境。它可以在浏览器中运行 javascript 代码。

## node 中的 javascript
 node 中的 javascript 是一种解释型语言，它可以直接在 node 中运行。
 
### node 中的 javascript 运行原理
 node 中的 javascript 运行原理是：node 会将 javascript 代码解析成 AST 抽象语法树，然后将 AST 抽象语法树编译成字节码，最后 node 会将字节码解释成机器码并执行。
