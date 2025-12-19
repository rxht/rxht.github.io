---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 21:54:03
---
# Canvas 中字符串换行

给定字符串与最大可显示的宽度，如果字符串所显示的宽度超出了最大宽度则进行换行显示。

```javascript
export function canvasLabelReline (ctx, text, maxWidth) {
  function isWordBreakChar(ch) {
    const breakCharSet = new Set(['?', '-', ' ', ',', '.'])
    if (ch.charCodeAt(0) < 0x2e80) return breakCharSet.has(ch)
    return true
  }

  const lines = []
  let line = '',      // 一行字符
      word = ''       // 一个单词
  let lineWidth = 0,  // 一行宽度
      wordWidth = 0   // 单词宽度

  /**
   * @description 将一行字符串放到最终字符串数组中
   * @author rxh
   * @date 2022-12-09
   */
  function addLineToLines () {
    lines.push(line)
    line = ''
    lineWidth = 0
  }

  /**
   * @description 将一个单词添加到一行字符串中
   * @author rxh
   * @date 2022-12-09
   */
  function addWordToLine () {
    line += word
    lineWidth += wordWidth
    word = ''
    wordWidth = 0
  }

  /**
   * @description 将一个字符添加到一个单词中
   * @author rxh
   * @date 2022-12-09
   * @param {*} char 字符
   * @param {*} charWidth 字符所占宽度
   * @param {boolean} [isNewLine=false] 是否需要重新开启一个新行
   * @param {boolean} [isBefore=true] 之前还是之后
   */
  function addCartToWord (char, charWidth, isNewLine = false, isBefore = true) {
    if (isNewLine && isBefore) {
      addWordToLine()
      addLineToLines()
    }
    word += char
    wordWidth += charWidth
    if (isNewLine && !isBefore) {
      addWordToLine()
      addLineToLines()
    }
  }

  function addCharToLine (char, charWidth, inWord = false) {
    addCartToWord(char, charWidth)
    !inWord && addWordToLine()
  }

  for (let char of text) {
    const charWidth = ctx.measureText(char)
    const inWord = !isWordBreakChar(char)

    // 当前最大字符宽度小于等于最大指定宽度
    if (lineWidth + wordWidth + charWidth <= maxWidth) {
      addCharToLine(char, charWidth, inWord)
      continue
    }
    // 当前行数据不存在
    if (!lineWidth) {
      addCartToWord(char, charWidth, true, !!wordWidth)
      continue
    }

    // 将当前行数据进行保存
    addLineToLines()

    if (wordWidth + charWidth <= maxWidth) {
      addCharToLine(char, charWidth, inWord)
      continue
    }

    if (wordWidth) {
      addCartToWord(char, charWidth, true, true)
    }
    if (charWidth > maxWidth) {
      addCartToWord(char, charWidth, true, false)
    }
  }
  return lines.json('\n')
}
```
