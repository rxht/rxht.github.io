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
