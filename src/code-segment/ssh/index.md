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
