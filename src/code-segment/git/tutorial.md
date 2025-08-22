---
Date: 2025-05-23 13:07:39
LastEditTime: 2025-08-22 10:07:08
description: 给完全没用过 Git 的同学写的。每一步都告诉你「为什么要这么做」，复制粘贴即可用。
tags:
  - git
  - tutorial
---

# Git 小白零基础入门教程

> 给完全没用过 Git 的同学写的。
> 每一步都告诉你「为什么要这么做」，复制粘贴即可用。


## 课前准备
1. 安装 Git

- Windows：到 git-scm.com 下载，一路 Next。
- macOS：终端执行 brew install git（或装 Xcode Command Line Tools）。
- Linux：sudo apt install git。

2. 配置自己的名字和邮箱（只用做一次）

```bash
$ git config --global user.name  "你的中文名或英文名"
$ git config --global user.email "你的邮箱@qq.com"
```
这两行信息会写进每一次提交记录里，别人就知道是谁改的。

## 什么是 Git？

- 仓库（repository）：一个隐藏文件夹 .git，记录所有历史。
- 工作区：你电脑里能看到的普通文件夹。
- 暂存区（stage）：临时货架，把要提交的改动先放上去。
- 版本（commit）：给当前所有文件拍一张「快照」，并永久保存。

## 从零开始建仓库

假设你想把「我的日记」文件夹变成 Git 仓库：
```bash
cd ~/Desktop/我的日记          # 进入文件夹
git init                     # 生成 .git 隐藏文件夹
echo "今天天气真好" > day1.txt # 新建一个文件
git status                   # 红色：文件在工作区，还没放进暂存区
git add day1.txt             # 放进暂存区（绿色）
git commit -m "第1天日记"     # 拍快照，-m 后面是备注
```

现在你已经有 第1个版本 了！

## 修改、撤销、查看历史

| 小白常问              | 命令                                  | 说明                 |
| ----------------- | ----------------------------------- | ------------------ |
| 我又写了一篇日记，怎么提交？    | `git add .` → `git commit -m "第2天"` | `.` 表示所有改动         |
| 写错了，想撤回工作区修改      | `git restore day1.txt`              | 文件回到上一次 commit 的样子 |
| 已经 `add` 了，想撤回暂存区 | `git restore --staged day1.txt`     | 文件从绿色变回红色          |
| 想看看以前版本           | `git log --oneline`                 | 一行一个版本，前面是缩写 ID    |
| 穿越回旧版本            | `git reset --hard 版本ID`             | **危险！** 会丢失之后的修改   |

## 分支（branch）—— 平行宇宙

- 为什么需要？ 你在写「第7天日记」时，同学让你帮忙改「第3天」的错别字。直接改会把未完成的第7天也一起提交。
- 解决：新建一条时间线（分支），改完再合并回来。

```bash
git branch            # 只有 *main（或 master）
git switch -c fix-day3  # 创建并进入新分支 fix-day3
# 现在你在平行宇宙，随便改 day3.txt
git add day3.txt
git commit -m "修复错别字"
git switch main       # 回到主宇宙
git merge fix-day3    # 把 fix-day3 的改动合并到 main
git branch -d fix-day3 # 删除用完的分支
```

##  远程仓库（GitHub / Gitee / GitLab等）

> 把本地仓库备份到云端，还能和别人协作。

第一次上传
1. 去 github.com 注册账号。
2. 点右上角 + → New repository → 取名 my-diary → 不要勾选 README。
3. 复制仓库地址，如 https://github.com/你的用户名/my-diary.git。

```bash
git remote add origin 刚才复制的地址   # origin 是远程仓库小名
git push -u origin main                # 把本地 main 分支推上去
# 以后会提示输入 GitHub 账号密码，或用 SSH 免密
```

日常同步
```bash
git push               # 把本地最新快照推送到 GitHub
git pull               # 把同事的新快照拉到本地并合并
```

## 第一次协作流程

1. 同学 A 克隆仓库

```bash
git clone https://github.com/你的用户名/my-diary.git
cd my-diary
```

2. 同学 A 建分支写「番外篇」

```bash
git switch -c extra
echo "番外：春游" > day_extra.txt
git add .
git commit -m "添加番外"
git push -u origin extra   # 把分支推到 GitHub
```

3. 你 在 GitHub 网页看到 Pull Request → 点 Merge → 线上合并。

4. 你 把合并后的代码拉回本地
```bash
git switch main
git pull
```

##  最常见错误与急救

| 报错                            | 原因        | 解决                              |
| ----------------------------- | --------- | ------------------------------- |
| `fatal: not a git repository` | 没在仓库里     | `cd` 到正确文件夹或 `git init`         |
| `Please tell me who you are`  | 没配置名字邮箱   | 见「0️⃣ 课前准备」                     |
| `failed to push some refs`    | 远程有更新     | 先 `git pull`，再 `git push`       |
| 误删文件                          | 还没 commit | `git restore 文件名`               |
| 误删文件                          | 已 commit  | `git restore --source=HEAD 文件名` |
