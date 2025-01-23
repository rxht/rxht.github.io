# 常见使用函数

## 日志打印

> 插件底部中心的内置控制台显示日志条目。日志级别包括： info 、 warn 和 error 


::: code-group

```typescript [info]
plugin.log.info('This info will appear in the Mol* console');
```
```typescript [warn]
plugin.log.warn('This warn will appear in the Mol* console');
```

```typescript [message]
plugin.log.message('This message will appear in the Mol* console');
```

```typescript [error]
plugin.log.error('This error will appear in the Mol* console');
```

:::


## 显示 toast 消息

> Toast 消息将出现在插件的右下角，并在消失之前停留有限的时间。

```typescript
import { PluginCommands } from 'molstar/lib/mol-plugin/commands';

PluginCommands.Toast.Show(plugin, {
    title: 'Custom Message',
    message: 'A custom toast message that will disappear after 2 seconds.',
    key: 'toast-custom',
    timeoutMs: 2000
});
```


## 相机聚焦

```typescript
plugin.managers.camera.focusLoci(loci);
```

重置聚焦

```typescript
plugin.managers.camera.reset();
```

## Structure 聚焦

```typescript
plugin.managers.structure.focus.setFromLoci(loci);
```

聚焦扩展

```typescript
plugin.managers.structure.focus.addFromLoci(loci);
```

重置聚焦

```typescript
plugin.managers.structure.focus.clear();
```


## 高亮

```typescript  [interactivity.ts 设置高亮]
plugin.managers.interactivity.lociHighlights.highlightOnly({ loci });
```


```typescript [interactivity.ts 检查是否高亮]
plugin.managers.interactivity.lociHighlights.isHighlighted({ loci });
```

```typescript [interactivity.ts 唯一高亮]
plugin.managers.interactivity.lociHighlights.highlightOnly({ loci });
```


```typescript [interactivity.ts 清除高亮]
plugin.managers.interactivity.clearHighlights();
```