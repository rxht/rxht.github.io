---
Date: 2025-08-07 09:34:00
LastEditTime: 2025-08-07 09:45:49
---

# 更改 Focus representation 的 扩展半径

**背景说明：**

Focus representation 是指在结构可视化中，当用户选中某个结构元素（如原子、残基、链等）时，会在可视化界面中显示一个突出的表示，以便用户能够更清晰地看到选中的元素。
默认情况下，Focus representation 会扩展一定的半径，以确保选中的元素能够在可视化界面中被突出显示。
但在某些情况下，用户可能希望调整 Focus representation 的扩展半径，以满足特定的可视化需求。

``` typescript [src/mol-plugin/behavior/dynamic/selection/structure-focus-representation.ts]
export const StructureFocusRepresentation = PluginBehavior.create({
    name: 'create-structure-focus-representation',
    display: { name: 'Structure Focus Representation' },
    category: 'interaction',
    ctor: StructureFocusRepresentationBehavior,
    params: (_, plugin) => StructureFocusRepresentationParams(plugin)
});
```

## 方案1：在初始化Behavior时传递参数

```typescript [molstar/src/mol-plugin/spec.ts]
  behaviors: [
    // ...
    PluginSpec.Behavior(StructureFocusRepresentation, { expandRadius: 8 }), // 这里设置扩展半径为8，具体的参数可以根据具体情况进行调整
  ]
```

## 方案2：在运行时动态修改参数

```typescript [molstar/src/mol-plugin/spec.ts]
  this.plugin.state.updateBehavior(StructureFocusRepresentation, p => {
        p.expandRadius = 8; // 这里设置扩展半径为8，具体的参数可以根据具体情况进行调整
    });
```

