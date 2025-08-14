import { MarkdownOptions } from "vitepress";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";

const markdown: MarkdownOptions = {
  math: true,
  lineNumbers: true, // 可以在代码块中添加 :line-numbers / :no-line-numbers 标记来覆盖在配置中的设置。
  container: {
    tipLabel: "提示",
    warningLabel: "警告",
    dangerLabel: "危险",
    infoLabel: "信息",
    detailsLabel: "详细信息",
  },
  image: {
    // 默认禁用；设置为 true 可为所有图片启用懒加载。
    lazyLoading: true,
  },
  config(md) {
    md.use(groupIconMdPlugin);
  },
};
export { markdown };