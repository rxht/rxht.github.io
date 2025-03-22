# Docker 使用 GPU 报错

## 问题

在docker启动容器时，提示使用gpu报错，错误信息如下：
> could not select device driver "nvidia" with capabilities: [[gpu]]

## 原因

docker在运行时无法找到 `nvidia-container-toolkit` ，导致无法使用gpu。

## 解决方法

1. 安装 `nvidia-container-toolkit` 

首先更新数据源，这里使用的是中科大的镜像，命令如下：
```bash
curl -fsSL https://mirrors.ustc.edu.cn/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
&& curl -s -L https://mirrors.ustc.edu.cn/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
sed 's#deb https://nvidia.github.io#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://mirrors.ustc.edu.cn#g' | \
sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

然后安装 `nvidia-container-toolkit` ，命令如下：
```bash
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
```

验证是否安装成功，命令如下：
```bash
root@LAPTOP-DMRIA6QI:~# nvidia-container-cli  --version
cli-version: 1.17.5
lib-version: 1.17.5
build date: 2025-03-07T15:46+00:00
build revision: f23e5e55ea27b3680aef363436d4bcf7659e0bfc
build compiler: x86_64-linux-gnu-gcc-7 7.5.0
build platform: x86_64
build flags: -D_GNU_SOURCE -D_FORTIFY_SOURCE=2 -DNDEBUG -std=gnu11 -O2 -g -fdata-sections -ffunction-sections -fplan9-extensions -fstack-protector -fno-strict-aliasing -fvisibility=hidden -Wall -Wextra -Wcast-align -Wpointer-arith -Wmissing-prototypes -Wnonnull -Wwrite-strings -Wlogical-op -Wformat=2 -Wmissing-format-attribute -Winit-self -Wshadow -Wstrict-prototypes -Wunreachable-code -Wconversion -Wsign-conversion -Wno-unknown-warning-option -Wno-format-extra-args -Wno-gnu-alignof-expression -Wl,-zrelro -Wl,-znow -Wl,-zdefs -Wl,--gc-sections
```

如果出现类似如上的信息，则说明安装成功。

2. 重启docker服务，命令如下：
```bash
sudo systemctl restart docker
```

就可以尝试再次使用docker启动容器了。
