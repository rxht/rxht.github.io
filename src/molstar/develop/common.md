---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-08-16 11:53:21
description: Molstar 常用方法
tags:
  - MolStar
---

# 常用方法

## 日志打印

> 插件底部中心的内置控制台显示日志条目

::: code-group

```typescript [info]
plugin.log.info("This info will appear in the Mol* console");
```

```typescript [warn]
plugin.log.warn("This warn will appear in the Mol* console");
```

```typescript [message]
plugin.log.message("This message will appear in the Mol* console");
```

```typescript [error]
plugin.log.error("This error will appear in the Mol* console");
```

:::

## 显示 toast 消息

> Toast 消息将出现在插件的右下角，并在消失之前停留有限的时间。

```typescript
import { PluginCommands } from "molstar/lib/mol-plugin/commands";

PluginCommands.Toast.Show(plugin, {
  title: "Custom Message",
  message: "A custom toast message that will disappear after 2 seconds.",
  key: "toast-custom",
  timeoutMs: 2000,
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

```typescript [interactivity.ts 设置高亮]
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

## 查询

```typescript
import { Script } from "molstar/lib/mol-script/script";
import { StructureSelection } from "molstar/lib/mol-model/structure/query";

const data =
  plugin.managers.structure.hierarchy.current.structures[0]?.cell.obj?.data;
if (!data) return;

const selection = Script.getStructureSelection(
  (Q) =>
    Q.struct.generator.atomGroups({
      "chain-test": Q.core.rel.eq(["B", Q.ammp("label_asym_id")]),
    }),
  data
);
const loci = StructureSelection.toLociWithSourceUnits(selection);
```

## 设置基础属性

```typescript
import { ColorNames } from "molstar/lib/mol-util/color/names";
import { PluginCommands } from "molstar/lib/mol-plugin/commands";

const renderer = plugin.canvas3d!.props.renderer;
PluginCommands.Canvas3D.SetSettings(plugin, {
  settings: {
    renderer: {
      ...renderer,
      backgroundColor: ColorNames.red /* or: 0xff0000 as Color */,
    },
  },
});
```
