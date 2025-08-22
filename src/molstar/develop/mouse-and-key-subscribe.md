---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-08-22 17:39:52
description: 在 Qbics-MolStar 中订阅并处理鼠标点击、移动及键盘快捷键事件，实现自定义交互逻辑与快捷键绑定。
head:
  - - meta
    - name: keywords
      content: molstar 鼠标事件, 键盘事件, 事件订阅, 开发示例
tags:
  - MolStar
  - MouseAndKeySubscribe
  - 开发示例
---

# 鼠标与键盘事件监听

```typescript
// 鼠标点击事件的监听方式
// this.plugin.behaviors.interaction.click.subscribe(() => { });
this.subscribe(this.plugin.behaviors.interaction.click, this.interactionClick);

// 键盘事件的监听方式
// this.plugin.behaviors.interaction.key.subscribe(() => { });
this.subscribe(this.plugin.behaviors.interaction.key, this.interactionKey);
```

## 事件回调函数

```typescript
// 鼠标点击回调事件
const interactionClick = async (event: InteractivityManager.ClickEvent) => {
  const { button, modifiers, page } = event;

  // 鼠标左键
  if (
    Binding.match(
      Binding(
        [Binding.Trigger(ButtonsType.Flag.Primary, ModifiersKeys.create({}))],
        "edit",
        "Press ${triggers}"
      ),
      button,
      modifiers
    )
  ) {
    console.log("鼠标左键");
  }

  // 鼠标右键
  if (
    Binding.match(
      Binding(
        [Binding.Trigger(ButtonsType.Flag.Secondary, ModifiersKeys.create({}))],
        "edit",
        "Press ${triggers}"
      ),
      button,
      modifiers
    )
  ) {
    console.log("鼠标右键");
  }
};

// 键盘回调事件
const interactionKey = async (event: KeyInput) => {
  const { code, key, modifiers } = event;
  // Ctrl+z
  if (
    Binding.matchKey(
      Binding(
        [Binding.TriggerKey("z", ModifiersKeys.create({ control: true }))],
        "undo",
        "Press ${triggers}"
      ),
      code,
      modifiers,
      key
    )
  ) {
    console.log("Ctrl+z");
  }

  // Ctrl+y
  if (
    Binding.matchKey(
      Binding(
        [Binding.TriggerKey("y", ModifiersKeys.create({ control: true }))],
        "redo",
        "Press ${triggers}"
      ),
      code,
      modifiers,
      key
    )
  ) {
    console.log("Ctrl+y");
  }

  // Ctrl+Delete
  if (
    Binding.matchKey(
      Binding(
        [Binding.TriggerKey("Delete", ModifiersKeys.create({ control: true }))],
        "Clear All",
        "Press ${triggers}"
      ),
      code,
      modifiers,
      key
    )
  ) {
    console.log("Ctrl+Delete");
  }
};
```

## 事件取消监听

```typescript
// 开启监听
const clickSub = this.plugin.behaviors.interaction.click.subscribe(() => {});

// 取消监听
clickSub.unsubscribe();

// 开启监听
const keySub = this.plugin.behaviors.interaction.key.subscribe(() => {});

// 取消监听
keySub.unsubscribe();
```
