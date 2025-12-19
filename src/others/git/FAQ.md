---
Date: 2025-08-22 10:03:40
LastEditTime: 2025-08-22 10:03:56
description: Git 常见问题
tags:
  - git
  - FAQ
---

# 常见问题

## .gitignore 配置文件不生效

> 原因是因为在 git 忽略目录中，新建的文件在 git 中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore 中已经声明了忽略路径也是不起作用的，需要先删除缓存，然后再提交。

```shell:no-line-numbers
$ git rm -r --cached .
$ git add .
$ git commit -m 'update .gitignore'
$ git push
```


## github.com port 22 Connection timed out

> 在执行 `git clone` 或者 `git pull/push` 时出现 GitHub 22 端口超时。

```bash
PS E:\RXH\xxxx\xxxx> git pull
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

**解决方案：**

1. 先在 git 的 bin 文件夹下 执行如下命令，如果出现 **successfully** 则可以继续执行以下步骤。

```bash
$ ssh -T -p 443 git@ssh.github.com
# Hi rxht! You've successfully authenticated, but GitHub does not provide shell access.
```

2. 在个人用户文件夹下的 `C:\Users\RXHT\.ssh\` 新建文件 `config`，并输入如下内容。

```txt [.ssh/config]
Host github.com
  Hostname ssh.github.com
  Port 443
```

3. 在 git 的 bin 文件夹下 执行如下命令，如果出现 **successfully** 则表示配置有效。

```bash
$ ssh -T git@ssh.github.com
# Hi rxht! You've successfully authenticated, but GitHub does not provide shell access.
```

4. 执行命令 `git clone` 克隆一次项目即可验证。
