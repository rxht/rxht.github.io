---
Date: 2025-03-22 06:30:34
LastEditTime: 2025-03-27 21:57:46
---
# Widows 移动子系统 Ubuntu (WSL2) 位置（非系统盘）

## 前置条件

查看当前子系统的执行情况，如果当前处于执行状态的话则需要先停止。

```sh:no-line-numbers 3
C:\Users\xxx>wsl -l -v
  NAME              STATE           VERSION
* Ubuntu-24.04      Running         2
```

关闭当前的子系统
```sh:no-line-numbers
C:\Users\xxx>wsl --shutdown Ubuntu-24.04
```

## 导出子系统镜像

此过程可能会比较慢，需要耐心等待。

```sh:no-line-numbers
C:\Users\xxx>wsl --export Ubuntu-24.04 E:\Ubuntu\Ubuntu-24.04.tar
正在导出，这可能需要几分钟时间。 (19971 MB)

操作成功完成。
```

导出结束后就可以在指定的目录下看到导出的镜像文件。

## 注销原本的子系统

```sh:no-line-numbers
C:\Users\xxx>wsl --unregister Ubuntu-24.04
正在注销。
操作成功完成。
```

注销完子系统后可以查看当前的子系统列表，应该就看不到 `Ubuntu-24.04` 了。

```sh:no-line-numbers
C:\Users\xxx>wsl -l -v
  NAME            STATE           VERSION
```

## 导入子系统镜像

此过程可能会比较慢，需要耐心等待。当进度条执行到 100% 后会提示`操作成功完成。`

```sh:no-line-numbers
C:\Users\xxx>wsl --import Ubuntu-24.04 E:\Ubuntu\Ubuntu-24.04 E:\Ubuntu\Ubuntu-24.04.tar
操作成功完成。
```

导入完成后就会出现子系统所对应的 `ext4.vhdx` 文件。

```sh:no-line-numbers 8
E:\Ubuntu>dir
 驱动器 E 中的卷是 用户
 卷的序列号是 D29D-E05E

 E:\Ubuntu 的目录

2025/03/22  06:49    <DIR>          .
2025/03/22  06:49    <DIR>          Ubuntu-24.04
2025/03/22  06:45    20,941,629,440 Ubuntu-24.04.tar
               1 个文件 20,941,629,440 字节
               2 个目录  9,621,164,032 可用字节
```

进入 `Ubuntu-24.04` 目录下，会发现有一个 `ext4.vhdx` 文件，这就是子系统的镜像文件。

```sh:no-line-numbers 11
E:\Ubuntu>cd Ubuntu-24.04

E:\Ubuntu\Ubuntu-24.04>dir
 驱动器 E 中的卷是 用户
 卷的序列号是 D29D-E05E

 E:\Ubuntu\Ubuntu-24.04 的目录

2025/03/22  06:49    <DIR>          .
2025/03/22  06:49    <DIR>          ..
2025/03/22  06:52    21,270,364,160 ext4.vhdx
               1 个文件 21,270,364,160 字节
               2 个目录  9,621,164,032 可用字节
```

再次查看子系统列表，就会发现 `Ubuntu-24.04` 子系统已经注册成功了。

```sh:no-line-numbers 3
C:\Users\xxx>wsl -l -v
  NAME              STATE           VERSION
* Ubuntu-24.04      Stopped         2
```

迁移完成后打开文件路径 `C:\Users\xxx\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu24.04LTS_79rhkp1fndgsc`，原本的子系统镜像文件没有了，这样就腾出了一部分C盘的空间。

