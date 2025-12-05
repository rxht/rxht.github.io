---
Date: 2025-12-05 09:43:08
LastEditTime: 2025-12-05 10:42:07
description: 该文档的核心价值是在 Vue3 开发中通过 TypeScript 实现全链路类型约束，覆盖了从基础组件到进阶通信的常见场景，提升代码的可维护性与类型安全性。
tags:
  - vue
  - typescript
---

# Typescript

## 基础组件类型

### 组件定义

使用 `defineComponent` 创建类型安全的组件：

```ts [index.vue]
import { definecomponent } from 'vue'
//推荐使用 definecomponent 获得完整的类型推断
export default definecomponent({
  setup() {
    // 自动推断出返回对象的类型
    return {
      message: 'Hello Vue3'
    }
  }
})
```

### Props 类型声明

使用 `PropType` 处理复杂类型：

```ts [index.vue]
import { defineComponent, PropType } from 'vue'

interface User {
  id: number
  name: string
  age?: number
}

export default defineComponent({
  props: {
    // 基础类型
    title: {
      type: String,
      required: true
    },
    // 复杂对象类型
    userInfo: {
      type: Object as PropType<User>,
      required: true
    },
    // 数组类型
    tags: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup(props) {
    // 自动推断出 props.title 为 string
    console.log(props.title.toUpperCase())

    // 正确访问 User 类型的属性
    console.log(props.userInfo.name)
  }
})
```


## 组合式 API 类型

### Ref 类型

```ts [index.vue]
import { ref, Ref, computed } from 'vue'

// 补充代码中依赖的 User 接口
interface User {
  id: number
  name: string
  age?: number
}

// 显式指定 Ref 类型（推荐）
const count: Ref<number> = ref(0)

// 通过泛型初始化推断
const user = ref<User>({
  id: 1,
  name: 'Alice'
})

// 自动推断为 Ref<number>
const double = computed(() => count.value * 2)
```

### Reactive 类型

```ts [index.vue]
import { reactive } from 'vue'

interface FormState {
  username: string
  password: string
  remember: boolean
}

// 使用接口定义 reactive 类型
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: false
})
```

## 组合式函数类型

### 自定义 Hook

```ts [index.vue]
import { ref, onMounted, Ref } from 'vue'

// 定义返回值类型
interface UseFetchResult<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  onMounted(async () => {
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
```

## 组件通信类型

### 自定义事件

```ts [Child.vue]
<script setup lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    // 验证 submit 事件
    submit: (payload: { email: string; password: string }) => {
      return payload.email.includes('@') && payload.password.length >= 6
    }
  },
  setup(props, { emit }) {
    const handleSubmit = () => {
      emit('submit', {
        email: 'user@example.com',
        password: 'secret'
      })
    }

    return { handleSubmit }
  }
})
</script>
```

```ts [Parent.vue]
<template>
  <Child @submit="handleSubmit" />
</template>

<script setup lang="ts">
const handleSubmit = (payload: { email: string; password: string }) => {
  console.log('Received:', payload)
}
</script>
```

### 模板引用类型

```ts [index.vue]
import { ref, onMounted, InstanceType } from 'vue'
// 假设 ChildComponent 是已定义的子组件
import ChildComponent from './ChildComponent.vue'

// 引用 DOM 元素
const inputRef = ref<HTMLInputElement | null>(null)

// 引用子组件实例
const childComponent = ref<InstanceType<typeof ChildComponent> | null>(null)

onMounted(() => {
  // 调用 DOM 元素的 focus 方法
  inputRef.value?.focus()
  // 调用子组件实例的自定义方法
  childComponent.value?.someMethod()
})
```

## 进阶类型技巧

### 全局属性扩展

```ts [index.ts]
import { createApp } from 'vue'
import App from './App.vue' // 补充App组件导入

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      currency(value: number): string
    }
  }
}

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency(value: number) {
    return `$${value.toFixed(2)}`
  }
}

app.mount('#app') // 补充应用挂载逻辑
```

### 类型化 Provide/Inject

```ts [index.ts]
import { inject, provide, InjectionKey } from 'vue'

interface UserContext {
  id: number
  name: string
}

// 定义注入标识（用Symbol保证唯一性，结合InjectionKey实现类型安全）
const symbol = Symbol() as InjectionKey<UserContext>

// 父组件：提供状态
provide(symbol, {
  id: 1,
  name: 'Alice'
})

// 子组件：注入状态
const user = inject(symbol) // 类型自动推断为 UserContext | undefined
```

**总结：**

在 Vue3 开发中通过 TypeScript 实现全链路类型约束，覆盖了从基础组件到进阶通信的常见场景，提升代码的可维护性与类型安全性。