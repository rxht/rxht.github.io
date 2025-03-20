# Docker 常用命令

## 系统服务常用命令
```bash
systemctl start docker # 启动docker
systemctl stop docker # 停止docker
systemctl restart docker # 重启docker
systemctl status docker # 查看docker状态
```

## 基础信息
```bash
docker version # 查看docker版本
docker info # 查看docker信息
docker --help # 查看docker帮助
docker system df # 查看docker磁盘使用情况
```

## 镜像相关命令
```bash
docker images # 查看本地镜像
docker rmi <image_id> # 删除本地镜像
docker pull <image_name> # 拉取镜像
docker push <image_name> # 推送镜像
docker search <image_name> # 搜索镜像
docker save <image_name> > <image_name>.tar # 保存镜像
docker load < <image_name>.tar # 加载镜像
docker tag <image_name> # 给源中镜像打标签
docker commit <container_id> # 提交当前容器为新的镜像
```

## 容器相关命令
```bash
docker ps # 查看正在运行的容器
docker ps -a # 查看所有容器
docker start <container_id> # 启动容器
docker stop <container_id> # 停止容器
docker restart <container_id> # 重启容器
docker kill <container_id> # 强制停止容器
docker rm <container_id> # 删除容器
docker rm -f <container_id> # 强制删除容器
docker exec -it <container_id> /bin/bash # 进入容器
docker run --name <container_name> -d -p <host_port>:<container_port> <image_name> # 运行容器
docker inspect <container_id> # 查看容器信息
```

## 文件夹相关命令
```bash
docker cp <container_id>:<container_path> <host_path> # 从容器复制文件到主机
docker cp <host_path> <container_id>:<container_path> # 从主机复制文件到容器
```

## 日志相关命令
```bash
docker logs <container_id> # 查看容器日志
```

## 历史相关命令
```bash
docker history <image_name> # 查看镜像历史
```