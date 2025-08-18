---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-08-18 21:18:27
---

# SSH

## SSH 密钥生成

执行命令 `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"` 生成 SSH 密钥

## SSH 上传公钥到服务器

执行命令 `ssh-copy-id username@remote.com`，将所生成的 SSH 公钥上传到服务器

## SSH 文件传递

ssh 的文件传递命令为 `scp` （Secure Copy Protocol），基本命令格式与示例如下

- `-r` 参数表示递归地复制整个文件夹
- `username` 是远程服务器的用户名
- `remote.com` 是远程服务器的地址（可以是 IP 地址 / 域名）
- `/path/to/local/file` 和 `/path/to/remote/file` 分别表示本地和远程文件/文件夹的路径

::: code-group

```bash:no-line-numbers [上传文件]
$ scp 本地文件路径 用户名@远程服务器IP地址:远程文件路径

$ scp /path/to/local/file.txt username@remote.com:/path/to/remote/directory/
```

```bash:no-line-numbers [下载文件]
$ scp 用户名@远程服务器IP地址:远程文件路径 本地文件路径

$ scp username@remote.com:/path/to/remote/file.txt /path/to/local/directory/
```

```bash:no-line-numbers [上传文件夹]
$ scp -r 本地文件夹路径 用户名@远程服务器IP地址:远程文件夹路径

$ scp -r /path/to/local/folder username@remote.com:/path/to/remote/directory/
```

```bash:no-line-numbers [下载文件夹]
$ scp -r 用户名@远程服务器IP地址:远程文件夹路径 本地文件夹路径

$ scp -r username@remote.com:/path/to/remote/folder /path/to/local/directory/
```

:::

## SSH 免密远程登录

1. 取得本地公钥

```bash:no-line-numbers
$ ls ~/.ssh # 查看本地是否存在 id_rsa.pub 文件
$ ssh-keygen -t rsa # 如果不存在可使用 ssh-keygen 进行生成
```

2. 上传到服务器

```bash:no-line-numbers
$ scp ~/.ssh/id_rsa.pub root@$host:~/ # $host换成目标服务器的 域名 或 IP

# 例如：
$ scp ~/.ssh/id_rsa.pub root@localhost:~/
$ scp ~/.ssh/id_rsa.pub root@127.0.0.1:~/
```

3. 添加服务器信任

```bash:no-line-numbers
$ ssh -p 22 root@$host "ls -al"  # 检查服务器上 root用户 是否存在 .ssh 目录
$ ssh -p 22 root@$host "ssh-keygen -t rsa" # 不存在则进行创建

$ ssh -p 22 root@$host "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys" # 将上传的 id_rsa. 添加信任
```

4. 重启服务器的 SSH

```bash:no-line-numbers
ssh -p 22 root@$host "service sshd restart"
```

完成上述步骤后就可以使用命令 `ssh root@$host` 进行免密登录
