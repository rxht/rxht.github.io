---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-08-22 17:39:25
description: Molstar 选中指定的原子序号
description: 示例代码演示如何在 Qbics-MolStar 中按 ElementIndex 批量筛选并高亮原子，含脚本调用与结果回调。
head:
  - - meta
    - name: keywords
      content: molstar 元素选择, ElementIndex, 原子筛选, 开发示例
tags:
  - MolStar
  - ElementIndex
  - 开发示例
---

# 选中指定的原子序号

最终效果：
![selectAtom](./assets/select-atom-of-index.webp)

```typescript
/**
 * @function 选中所指定的原子序号
 */
function atomSelectionOfIndex(index: ElementIndex) {
  const atom = StructureSelectionQuery(
    "Atom",
    MolScriptBuilder.struct.modifier.union([
      MolScriptBuilder.struct.generator.atomGroups({
        "atom-test": MolScriptBuilder.core.rel.eq([
          MolScriptBuilder.acp("sourceIndex"),
          index,
        ]),
      }),
    ]),
    { category: StructureSelectionCategory.Atom }
  );
  plugin.managers.structure.selection.fromSelectionQuery("add", atom);
}
```
