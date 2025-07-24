---
Date: 2025-07-24 17:34:45
LastEditTime: 2025-07-24 19:06:22
---

# 特殊字符

<script lang="ts" setup>
const splitEmoji = s => [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s)].map(x => x.segment);

// 数字序号
const serial_number = [
  '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳',
  '⓵⓶⓷⓸⓹⓺⓻⓼⓽⓾',
  '⓿❶❷❸❹❺❻❼❽❾❿⓫⓬⓭⓮⓯⓰⓱⓲⓳⓴',
  '㊀㊁㊂㊃㊄㊅㊆㊇㊈㊉',
  '㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩',
  '⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇',
  '⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛',
  '〇一二三四五六七八九十百千万亿零壹贰叁肆伍陆柒捌玖拾佰仟萬億',
  '0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟',
  'ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ'
].flatMap(splitEmoji)

// 上标下标
const superscript_subscript = [
  'ⁿⁱ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼₊₋₌⁽⁾₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₒₓₔ'
].flatMap(splitEmoji)

// 表情符号
const emoji = [
  '😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙋🙌🙍🙎🙏'
].flatMap(splitEmoji)
</script>


## 数字序号

<Symbols :symbols="serial_number" />


## 上标下标

<Symbols :symbols="superscript_subscript" />

## 表情符号

<Symbols :symbols="emoji" />
