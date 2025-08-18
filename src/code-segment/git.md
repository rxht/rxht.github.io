---
Date: 2025-05-23 13:07:39
LastEditTime: 2025-08-16 23:46:14
description: Git 是一个强大的版本控制系统，但在使用过程中可能会遇到一些常见问题。
tags:
  - git
---

# GIT 常见问题

## 未跟踪的文件（Untracked Files）

> 当你看到 `git status` 显示有未跟踪的文件时，这些文件尚未被 Git 管理。

```shell:no-line-numbers
$ git add <file> // 或者 git add .
```

## 冲突（Conflicts）

> 当你尝试合并分支或拉取代码时，可能会遇到冲突，也就是出现代码（<<<<<<<、=======、>>>>>>>）。

需要先手动编辑冲突文件以解决冲突，然后在执行 `git add <file>` 将文件添加到暂存区（用于标记冲突已解决）。

## 回退到之前的提交

> 你需要回退到之前的某个提交。

```shell:no-line-numbers
$ git log # 查看提交历史
$ git reset --hard <commit-hash>  # 回退到特定提交
```

## 推送时被拒绝

> 当你尝试推送代码时，可能会被拒绝，因为远程仓库有更新。

```shell:no-line-numbers
$ git pull  # 拉取最新的更改

# 当拉取到最新的更改后发现有冲突的话需要先解决冲突，再执行推送

$ git push  # 再次推送
```

## 删除远程分支

```shell:no-line-numbers
$ git push origin --delete <branch-name>
```

## 合并分支

```shell:no-line-numbers
$ git merge <source-branch>
```

## 撤销最后一次提交

> 你需要撤销最后一次提交，但保留更改。

```shell:no-line-numbers
$ git reset HEAD~ --soft  # 撤销最后一次提交
$ git reset HEAD~ --hard  # 撤销最后一次提交并丢弃更改
```

## 远程仓库信息

```shell:no-line-numbers
$ git remote -v # 查看远程仓库信息
$ git remote add <name> <url> # 添加新的远程仓库
$ git remote set-url <name> <new-url> # 更新远程仓库信息
```

## 分支列表

```shell:no-line-numbers
$ git branch -a #  查看分支列表
$ git branch <branch-name> # 创建新分支
$ git checkout <branch-name> # 切换到新分支
$ git branch -d <branch-name> # 删除本地分支
```

## .gitignore 配置文件不生效

> 原因是因为在 git 忽略目录中，新建的文件在 git 中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore 中已经声明了忽略路径也是不起作用的，需要先删除缓存，然后再提交。

```shell:no-line-numbers
$ git rm -r --cached .
$ git add .
$ git commit -m 'update .gitignore'
$ git push
```
