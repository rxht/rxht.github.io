import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { MarkdownOptions } from "vitepress";

/**
 * markdown-it 插件：自动为本地图片注入 width/height 属性，消除 CLS（布局偏移）。
 *
 * 原理：在 image token 渲染时，通过 env.realPath（当前 md 文件的绝对路径）
 * 解析图片相对路径，读取图片文件头获得实际像素尺寸，注入宽高属性。
 * 浏览器据此预留占位空间，避免图片加载后撑开页面导致的布局跳动。
 *
 * 类型说明：md 参数类型从 VitePress 的 MarkdownOptions["config"] 精确推导，
 * 与 md.use() 期望的 PluginSimple 签名严格一致，无需引入 markdown-it 类型
 * （项目内 markdown-it@15 与 VitePress 内置 @types/markdown-it@14 类型冲突）。
 */

// 从 VitePress 官方 MarkdownOptions.config 推导 markdown-it 实例类型，
// 该类型正是 md.use() 期望的 PluginSimple 参数类型。
type MarkdownItInstance = Parameters<NonNullable<MarkdownOptions["config"]>>[0];
function getImageSize(filePath: string): { width: number; height: number; } | null {
    try {
        if (!existsSync(filePath)) return null;
        const buf = readFileSync(filePath);
        if (buf.length < 24) return null;

        // PNG: 8 字节签名后，IHDR 的宽高位于偏移 16/20 处（大端）
        if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
            const width = buf.readUInt32BE(16);
            const height = buf.readUInt32BE(20);
            return { width, height };
        }

        // GIF: 偏移 6 起 2 字节宽 + 2 字节高（小端）
        if (buf.subarray(0, 3).toString("ascii") === "GIF") {
            const width = buf.readUInt16LE(6);
            const height = buf.readUInt16LE(8);
            return { width, height };
        }

        // JPEG: 遍历段，找到 SOF 标记
        if (buf[0] === 0xff && buf[1] === 0xd8) {
            let offset = 2;
            while (offset < buf.length) {
                if (buf[offset] !== 0xff) break;
                const marker = buf[offset + 1];
                // SOF0-SOF15 中除 DHT/DAC/JPG 外的段都含尺寸
                if (
                    (marker >= 0xc0 && marker <= 0xcf) &&
                    marker !== 0xc4 &&
                    marker !== 0xc8 &&
                    marker !== 0xcc
                ) {
                    const height = buf.readUInt16BE(offset + 5);
                    const width = buf.readUInt16BE(offset + 7);
                    return { width, height };
                }
                const segLen = buf.readUInt16BE(offset + 2);
                offset += 2 + segLen;
            }
            return null;
        }

        // WebP: 检查 RIFF....WEBP，分 VP8 / VP8L / VP8X 三种
        if (
            buf.subarray(0, 4).toString("ascii") === "RIFF" &&
            buf.subarray(8, 12).toString("ascii") === "WEBP"
        ) {
            const chunk = buf.subarray(12, 16).toString("ascii");
            if (chunk === "VP8X") {
                // VP8X: 宽高在偏移 24 起，各 3 字节小端 + 1
                const width = 1 + buf.readUIntLE(24, 3);
                const height = 1 + buf.readUIntLE(27, 3);
                return { width, height };
            }
            if (chunk === "VP8L") {
                // VP8L: 偏移 21 起 14 位宽 + 14 位高
                const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
                const width = 1 + (((b1 & 0x3f) << 8) | b0);
                const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
                return { width, height };
            }
            if (chunk === "VP8 ") {
                // VP8: 偏移 26 起 2 字节宽 + 2 字节高（小端），取低 14 位
                const width = buf.readUInt16LE(26) & 0x3fff;
                const height = buf.readUInt16LE(28) & 0x3fff;
                return { width, height };
            }
            return null;
        }

        return null;
    } catch {
        return null;
    }
}

/**
 * markdown-it 插件：自动为本地图片注入 width/height 属性，消除 CLS（布局偏移）。
 *
 * 原理：在 image token 渲染时，通过 env.realPath（当前 md 文件的绝对路径）
 * 解析图片相对路径，读取图片文件头获得实际像素尺寸，注入宽高属性。
 * 浏览器据此预留占位空间，避免图片加载后撑开页面导致的布局跳动。
 */
export function imageSizePlugin(md: MarkdownItInstance): void {
    const defaultImageRenderer =
        md.renderer.rules.image ||
        ((tokens, idx, options, _env, self) =>
            self.renderToken(tokens, idx, options));

    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src")?.toString() || "";

        // 仅处理本地相对路径图片，跳过 http(s)、data:、绝对路径
        if (!src || /^(https?:|data:|\/)/.test(src)) {
            return defaultImageRenderer(tokens, idx, options, env, self);
        }

        const realPath = (env as { realPath?: string })?.realPath;
        if (!realPath) {
            return defaultImageRenderer(tokens, idx, options, env, self);
        }

        // 去掉 src 中可能的查询参数
        const cleanSrc = src.split(/[?#]/)[0];
        const absPath = resolve(dirname(realPath), cleanSrc);
        const size = getImageSize(absPath);

        if (size && size.width > 0 && size.height > 0) {
            token.attrSet("width", String(size.width));
            token.attrSet("height", String(size.height));
        }

        return defaultImageRenderer(tokens, idx, options, env, self);
    };
}

export default imageSizePlugin;
