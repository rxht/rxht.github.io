---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-08-01 23:24:11
---

# docker 文档

![logo](./assets/logo.svg)

## 安装

1. 前置执行

```bash:no-line-numbers
  sudo apt update
  sudo apt upgrade -y
```

> [!TIP] 提示
> 如果已安装过 docker 请先卸载原本已经安装的 docker
>
> ```bash:no-line-numbers
> $ sudo apt-get remove docker docker-engine docker.io containerd runc
> ```

2. 安装 docker 的前置依赖

```bash:no-line-numbers
$  sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common lsb-release
```

3. 添加 Docker 官方 GPG 密钥：
   使用 curl 命令添加 Docker 的 GPG 密钥，确保软件包的合法性。

```bash:no-line-numbers
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

4. 设置 Docker APT 存储库：
   添加 Docker 的 APT 存储库到系统的源列表中。这里推荐使用阿里云镜像加速下载。

```bash:no-line-numbers
$ echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5. 更新 APT 包索引：
   再次更新软件包索引，以包含 Docker 存储库中的新包。

```bash:no-line-numbers
$ sudo apt-get update
```

6. 安装 Docker Engine 和 Docker Compose：
   使用以下命令安装 Docker CE（社区版）和 Docker Compose 插件。

```bash:no-line-numbers
$ sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

7. 启动 Docker 服务：
   安装完成后，启动 Docker 服务并设置为开机自启。

```bash:no-line-numbers
$ sudo systemctl start docker
$ sudo systemctl enable docker
```

## 验证

通过运行 `docker --version` 和 `docker-compose --version` 命令验证 Docker 和 Docker Compose 是否安装成功。如果显示版本信息，则表示安装成功。

```bash:no-line-numbers
$ docker --version
$ docker-compose --version
```

![docker-version](./assets/docker-version.webp)

![docker-compose-version](./assets/docker-compose-version.webp)
