---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-08-22 17:38:17
description: 在 Qbics-MolStar 中实现“单原子点击选择”功能的完整开发示例，涵盖事件监听、状态更新与 UI 联动。
head:
  - - meta
    - name: keywords
      content: molstar 单原子选择, 点击选择原子, 开发示例, 事件监听
tags:
  - MolStar
  - AtomsSingleChoice
  - 开发示例
---

# 设置原子只能单选

设置场景中用户使用鼠标左键只能选中一个原子，不允许用户多选！

效果如下：

![Atoms Single-choice](./assets/atoms-single-choice.webp)

## 1：场景只支持单选原子的情况

```typescript{3,5,9}
const SPEC = {
    behaviors: [
        PluginSpec.Behavior(PluginBehaviors.Representation.HighlightLoci, { preferAtoms: true }), // 原子优先，即不选中键连
        PluginSpec.Behavior(PluginBehaviors.Representation.SelectLoci, {
            preferAtoms: true, // 原子优先，即不选中键连
            bindings: {
                clickSelect: Binding.Empty,
                clickToggleExtend: Binding.Empty,
                clickSelectOnly: Binding([Trigger(B.Flag.Primary, M.create())], 'SelectOnly', 'SelectOnly element using ${triggers}'), // 配置仅支持单选
                clickToggle: Binding.Empty,
                clickDeselect: Binding.Empty,
                clickDeselectAllOnEmpty: Binding.Empty,
            }
        }),
    ]
};

// 场景初始化
const spec: PluginSpec = Object.assign({ behaviors: [] }, SPEC, props.spec);
this.plugin = new PluginContext(spec);
```

## 2. 在官方默认的案例中设置单选

1. 首先设置为选中模式

```typescript:no-line-numbers
this.plugin.selectionMode = true;
```

2. 更新 PluginBehaviors 参数

```typescript{7}
const state = this.plugin.state.behaviors;
const update = state.build();
const highlightLoci = state.select(StateSelection.Generators.ofTransformer(PluginBehaviors.Representation.HighlightLoci));
const selectLoci = state.select(StateSelection.Generators.ofTransformer(PluginBehaviors.Representation.SelectLoci));
const selections = [...highlightLoci, ...selectLoci];
for (const selection of selections) {
    update.to(selection).update({ ...selection.params?.values, preferAtoms: true });
}
PluginCommands.State.Update(this.plugin, { state, tree: update, options: { doNotLogTiming: true } });
```

2. 更新 interactivity 层级为 element

```typescript
this.plugin.managers.interactivity.setProps({ granularity: "element" });
```
