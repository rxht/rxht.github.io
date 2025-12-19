---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 21:57:25
---
# Docker 日志管理

::: tip
Docker 日志仅在删除并重新创建 Docker 容器时才会重置。仅停止和启动容器不会重置日志。
:::

## 检查 Docker 日志大小

Docker 日志通常保存在主机上的以下位置（如果您没有显式更改 Docker 的默认数据目录）：

```sh
/var/lib/docker/containers/<container-id>/<container-id>-json.log
```

每个 Docker 容器在“/var/lib/docker/containers/”下都有其目录。在每个容器的目录中，您将找到一个以“-json.log”结尾的文件，其中包含该特定容器的日志。

这些文件默认采用 JSON 格式构建，并捕获容器的标准输出 (stdout) 和标准错误 (stderr) 流。

要查看所有 Docker 容器日志的大小（从大到小排序），可以使用以下 find 命令：

```sh
find /var/lib/docker/containers/ -name "*json.log" | xargs du -h | sort -hr
```

## 通过 ID 查找 Docker 的容器名称

```sh
docker inspect --format='{{.Name}}' <container_id>
```

::: warning
如果要检查所找到的容器名称与日志 ID 是否一致，可以使用以下 inspect 命令:

```sh
docker inspect <container_name>
```

:::

用以下命令仅获取日志文件路径信息
```sh
docker inspect --format='{{.LogPath}}' <container_name>
```

## 清理日志文件

如果要清除单个日志文件内容，可以使用 truncate 命令：

```sh
truncate -s 0 <log_path>
```


如果要清除所有的日志文件内容：

```sh
truncate -s 0 /var/lib/docker/containers/*/*-json.log
```

## 限制 Docker 的日志文件大小

当设置完文件大小的限制后，当日志文件大小达到这个阈值后会重新新建一个日志文件并重新命名，例如-json.log.1

如果要全局设置所有的 Docker 容器日志文件大小限制，可以更新 Docker 的守护进程配置文件来实现，如果配置配置文件不存在的话则需要重新创建一个新的配置文件。
配置文件通常位于 `/etc/docker/daemon.json`

<b>设置属性</b>

```json [daemon.json]
{
  "log-driver": "json-file", // 日志驱动程序设置为“json-file”
  "log-opts": {
    "max-size": "10m", // 单个 Docker 日志文件的最大允许大小设置为 10 MB
    "max-file": "3" // 允许归档最多 3 个版本的文件
  }
}
```

更新完配置文件后需要重启 Docker 服务

```sh
sudo systemctl restart docker
```

:::tip
当前的配置只会影响到后面新建的容器，如果容器原本已经创建完成的话则无法生效，需要删除后重新创建才能使配置生效。
:::

## 删除容器
```sh
docker rm -f <container_id_or_name>
```

也可以跳转到有 `docker-compose.yml` 的文件夹中，执行如下命令，它会停止并删除文件中定义的所有资源。然后，重新运行部署：

```sh
docker compose down

docker compose up -d
```

## 重新查看配置是否生效

```sh
docker inspect <container_name>
```

管理Docker日志大小对于维持高效且可持续的服务器环境至关重要。
