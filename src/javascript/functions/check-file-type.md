---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 21:54:09
---
# 文件格式校验（文件二进制内容校验）

> [第三方库 file-type](https://github.com/sindresorhus/file-type)

常见文件的二进制标识
1. JPEG/JPG - 文件头标识 (2 bytes): ff, d8 文件结束标识 (2 bytes): ff, d9
2. TGA - 未压缩的前 5 字节 00 00 02 00 00 - RLE 压缩的前 5 字节 00 00 10 00 00
3. PNG - 文件头标识 (8 bytes) 89 50 4E 47 0D 0A 1A 0A   
4. GIF - 文件头标识 (6 bytes) 47 49 46 38 39(37) 61
5. BMP - 文件头标识 (2 bytes) 42 4D B M
6. PCX - 文件头标识 (1 bytes) 0A
7. TIFF - 文件头标识 (2 bytes) 4D 4D 或 49 49
8. ICO - 文件头标识 (8 bytes) 00 00 01 00 01 00 20 20
9. CUR - 文件头标识 (8 bytes) 00 00 02 00 01 00 20 20
10. IFF - 文件头标识 (4 bytes) 46 4F 52 4D
11. ANI - 文件头标识 (4 bytes) 52 49 46 46


```vue
<template>
	<div>
		<input type="file" id="inputFile" @change="handleChange" />
	</div>
</template>

<script>
	export default {
		name: "HelloWorld",
		methods: {
			check(headers) {
				return (buffers, options = { offset: 0 }) =>
					headers.every((header, index) => header === buffers[options.offset + index]);
			},
			async handleChange(event) {
				const file = event.target.files[0];
				// 以PNG为例，只需要获取前8个字节，即可识别其类型
				const buffers = await this.readBuffer(file, 0, 8);
				const uint8Array = new Uint8Array(buffers);
				const isPNG = this.check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
				// 上传test.png后，打印结果为true
				console.log(isPNG(uint8Array))

			},
			readBuffer(file, start = 0, end = 2) {
				// 获取文件的二进制数据，因为我们只需要校验前几个字节即可，所以并不需要获取整个文件的数据
				return new Promise((resolve, reject) => {
					const reader = new FileReader();

					reader.onload = () => {
						resolve(reader.result);
					};

					reader.onerror = reject;

					reader.readAsArrayBuffer(file.slice(start, end));
				});
			}
		}
	};
</script>
```
