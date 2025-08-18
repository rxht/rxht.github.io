---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-08-16 11:54:14
description: Molstar 选中指定的原子序号
tags:
  - MolStar
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
