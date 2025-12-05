---
Date: 2025-12-05 09:43:39
LastEditTime: 2025-12-05 10:43:07
title: useTemplateRef
description: 该文档聚焦 Vue 3.5 新增的 useTemplateRef 特性，对比新旧版本模板引用的使用方式，核心解决传统模板引用的痛点
tags:
  - vue
  - vue3.5
  - 新特性
  - useTemplateRef
---

# useTemplateRef: Vue3.5 版本新特性


## 模板引用

在之前的版本中，我们需要如下方法来使用模板引用。

```ts [index.vue]
<template>
  <input ref="username" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 变量名必须与模板中的 ref 值保持完全一致
const username = ref<HTMLInputElement | null>(null)

onMounted(() => {
  // 类型安全完全依赖可选链操作符
  username.value?.focus()
})
</script>
```

**存在的问题：**
  - **同步成本高：** 模板中的 ref 名称修改后，必须手动更新脚本中的变量名。
  - **类型安全弱：** 如果不显式指定 `<HTMLInputElement | null>` 类型，默认为 any，失去类型检查。


在新版本中我们可以使用如下方法。

```ts [index.vue]
<template>
  <input ref="username" />
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'

// 变量名可以自由定义，不再受模板约束
const inputEl = useTemplateRef('username')

onMounted(() => {
  inputEl.value?.focus() // 完整的类型提示和智能补全
})
</script>
```

**优点如下：**
  - 模板中的 `ref="username"` 定义保持不变
  - 脚本中可以自由命名变量（如 `inputEl`、`el`、`foo` 等）
  - IDE 能够准确识别元素类型为 `HTMLInputElement`


## 动态列表中的模板引用

```ts [index.vue]
<template>
  <div v-for="(item, i) in list" :key="i">
    <input :ref="`input-${i}`" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 官方文档明确不推荐在 <script setup> 中使用动态 ref
// 开发者需要寻找替代方案
</script>
```

**存在的问题：**
  - 官方文档明确不推荐在 `<script setup>` 中使用动态 `ref`
  - 开发者需要寻找替代方案
  - 需要手动维护 `Map<string, Element>` 结构，在渲染函数中赋值管理

在新版本中我们可以使用如下方法。

```ts [index.vue]
<template>
  <div v-for="(item, index) in items" :key="index">
    <input :ref="`input-${index}`" />
    <button @click="focus(index)">聚焦</button>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'

const focus = (index: number) => {
  const el = useTemplateRef<HTMLInputElement>(`input-${index}`)
  el.value?.focus()
}
</script>
```

**优点如下：**
  - 通过 `useTemplateRef` 直接按名称获取，即使处理上万条数据也游刃有余

## hook 使用

```ts [hooks/useFocus.ts]
import { useTemplateRef, nextTick } from 'vue'

export function useFocus(refKey: string) {
  const target = useTemplateRef<HTMLInputElement>(refKey)

  const focus = () => nextTick(() => target.value?.focus())

  return { focus }
}
```

在组件中使用：

```ts [index.vue]
<template>
  <input ref="email" />
  <button @click="focus">聚焦邮箱输入框</button>
</template>

<script setup lang="ts">
import { useFocus } from '@/hooks/useFocus'

const { focus } = useFocus('email')
</script>
```

**总结：**

```ts [index.d.ts]
function useTemplateRef<T = Element>(key: string): Readonly<Ref<T | null>>
```
- 泛型 T：指定元素类型，默认 Element，支持精准类型约束；
- 参数 key：模板中定义的 ref 名称（静态 / 动态均可）；
- 返回值：只读的 Ref 对象，值为对应 DOM 元素或 null，保证类型安全。

Vue 3.5 在编译阶段会将模板中的静态 ref 收集到专门的引用队列中。`useTemplateRef(key)` 本质上是从这个预先生成的队列中读取对应的虚拟节点引用，这个过程不会触发额外的依赖收集，性能表现接近原生操作。