import { useClipboard } from "@vueuse/core";
import { toast } from "vue-sonner";

export function hookClipboard(base: string) {
  const { isSupported, text, copied, copy: useCopy } = useClipboard();
  const copy = (text: string) =>
    useCopy(text)
      .then(() => toast.success(`${base}拷贝成功：${text}`))
      .catch(() => toast.success(`${base}拷贝失败：${text}`));
  const notSupportedText = `<span class="text-red-400">Your browser does not support Clipboard API</span>`;
  return { isSupported, notSupportedText, text, copied, copy };
}
