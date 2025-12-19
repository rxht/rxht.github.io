---
Date: 2025-03-21 20:52:22
LastEditTime: 2025-03-27 21:57:41
---
# Widows 子系统 Ubuntu (WSL2) 安装 NVIDIA-SMI

## 前置条件

使用命令 `wsl -v` 查看 `wsl` 版本，如果不是 `wsl2` 版本的话，需要使用如下命令切换到 `wsl2` 版本。

```bash:no-line-numbers
$ wsl --set-default-version 2
```

如果执行命令 `wsl -v` 的结果如下 2.* 版本的话，则无需再次进行版本切换。

```text:no-line-numbers
WSL 版本： 2.4.11.0
```

## 安装 NVIDIA-SMI

进入所对应的子系统版本的执行窗口，使用如下命令安装 `nvidia-smi`。
```bash
$ wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-wsl-ubuntu.pin

$ sudo mv cuda-wsl-ubuntu.pin /etc/apt/preferences.d/cuda-repository-pin-600

$ wget https://developer.download.nvidia.com/compute/cuda/12.8.1/local_installers/cuda-repo-wsl-ubuntu-12-8-local_12.8.1-1_amd64.deb

$ sudo dpkg -i cuda-repo-wsl-ubuntu-12-8-local_12.8.1-1_amd64.deb

$ sudo cp /var/cuda-repo-wsl-ubuntu-12-8-local/cuda-*-keyring.gpg /usr/share/keyrings/

$ sudo apt-get update

$ sudo apt-get -y install cuda-toolkit-12-8
```

> [!TIP] 提示
> 可以访问[官网](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local)查看所对应的执行脚本

## 验证

执行命令 `nvidia-smi`，如果能看到如下输出，说明安装成功。

```text:no-line-numbers
Fri Mar 21 20:47:10 2025
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 565.65                 Driver Version: 566.07         CUDA Version: 12.7     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 3060 ...    On  |   00000000:01:00.0  On |                  N/A |
| N/A   53C    P8             14W /  112W |     432MiB /   6144MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|  No running processes found                                                             |
+-----------------------------------------------------------------------------------------+
```
