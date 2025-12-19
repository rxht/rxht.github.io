---
Date: 2025-08-22 10:01:43
LastEditTime: 2025-08-22 10:19:47
description: Git 超详细中文速查表
tags:
  - git
---

# Git 超详细中文速查表

> 每行指令都给出「目的 + 场景 + 注意事项 + 示例」四要素，复制即可用。

## 全局设置
只需在新电脑或重装系统后跑一次，后续所有仓库自动继承。

```bash
# 1. 告诉 Git 你是谁（提交记录里会显示）
$ git config --global user.name  "张三"
$ git config --global user.email "zhangsan@example.com"

# 2. 避免每次创建仓库都手动切分支名
$ git config --global init.defaultBranch main

# 3. 让 diff / log 输出带颜色，终端阅读更舒适
$ git config --global color.ui auto

# 4. 把 VS Code 设为默认编辑器（commit 信息、rebase 时会自动打开）
$ git config --global core.editor "code --wait"

# 5. 给高频命令起外号，少敲 50 % 键盘
$ git config --global alias.st  status
$ git config --global alias.co  checkout
$ git config --global alias.br  branch
$ git config --global alias.ci  commit
$ git config --global alias.unstage 'reset HEAD --'

# 6. 检查是否写对
$ git config --list | grep user
```

## 日常高频指令
> 90 % 的开发时间都在这 10 条里循环。

**仓库从零开始**

```bash
# 场景：本地新建项目
mkdir my-app && cd my-app
$ git init                # 生成 .git 目录
echo "# My App" > README.md
$ git add README.md       # 把文件放进「暂存区」
$ git commit -m "first commit"
```

**克隆已有仓库**

```bash
# 场景：接手老项目或开源库
$ git clone https://github.com/user/repo.git    # 默认拉 main/master
$ git clone -b dev https://github.com/user/repo.git   # 直接拉 dev 分支
```

**每日「三板斧」**

```bash
$ git status              # 先看一眼发生了什么
$ git add .               # 把所有改动一次性送进暂存区
$ git commit -m "feat: 用户登录接口"   # 写清楚做了什么
```

**跳过 add 的快捷方式**

```bash
# 场景：只改已跟踪文件，且确定全部要提交
$ git commit -am "fix: 修复首页样式"
# 注意：新建文件不会被 -a 捕获，仍需 git add <newfile>
```

## 分支管理

> 核心思想：每个任务一条分支，互不干扰。

**查看 & 创建**

```bash
$ git branch              # 仅本地
$ git branch -a           # 本地 + 远程一起列
$ git checkout -b feature/pay   # 创建并立即切换；等于 git branch feature/pay + git checkout feature/pay
$ git switch -c hotfix/404      # Git 2.23+ 推荐的新写法
```

**合并的三种姿势**

```bash
# 1) 快进（无分叉历史）
$ git checkout main
$ git merge feature/pay --ff-only

# 2) 保留分叉（生成一次 merge commit）
$ git merge feature/pay --no-ff -m "merge: 接入支付宝支付"

# 3) 压缩成一个干净 commit
$ git merge feature/pay --squash
$ git commit -m "feat: 一次性引入支付功能"
```

**删除分支**

```bash
$ git branch -d feature/pay          # 安全删除：已合并才给删
$ git branch -D feature/pay          # 强制删除：丢了代码别哭
$ git push origin --delete feature/pay   # 把远程也清掉
```

## 远程仓库

> 本地仓库和 GitHub/GitLab 之间的「推拉」艺术。

**第一次上传**

```bash
$ git remote add origin https://github.com/user/repo.git   # origin 是远程仓库昵称
$ git push -u origin main   # -u 建立本地 main 与远程 main 的追踪关系，以后直接 git push
```

**日常同步**

```bash
$ git fetch               # 把远程更新拉到本地索引，不自动合并
$ git pull                # = git fetch + git merge，快速同步同事代码
$ git pull --rebase       # 把本地提交「放」到远程最新节点之后，历史更线性
```

**强制推送的底线**

```bash
$ git push --force-with-lease   # 比 --force 安全：若远程被别人更新则拒绝
# 仅当确定只有自己一个人在改，才考虑强推
```

## 撤销与回退

> 救命指令，越早掌握越少背锅。

| 场景              | 指令                                | 结果               |
| --------------- | --------------------------------- | ---------------- |
| 改完发现 add 错文件    | `git restore --staged secret.key` | 文件从暂存区回到工作区      |
| 改完想全部重来         | `git restore .`                   | 工作区所有修改被丢弃（危险）   |
| 刚 commit 发现写错注释 | `git commit --amend -m "正确注释"`    | 修改最近一次提交         |
| 想彻底删掉最近一次提交     | `git reset --hard HEAD~1`         | 代码+记录一起蒸发（危险×2）  |
| 回退到很久以前         | `git reset --hard a1b2c3d`        | 回到指定哈希（危险×3）     |
| 线上回滚（公共分支）      | `git revert <commit>`             | 生成一次「反向提交」，历史不丢失 |


**暂存工作现场**

```bash
$ git stash save "WIP: 支付页面样式一半"
$ git stash list             # 查看所有 stash
$ git stash pop              # 恢复并删除最近一次
$ git stash apply stash@{2}  # 只恢复不删除
```

## 日志与对比

> 把 Git 当成「时间机器」使用。

**阅读历史**

```bash
$ git log --oneline --graph --all   # 极简 ASCII 分支图
$ git log --since="2 weeks ago" --author="张三" src/   # 仅看张三最近两周对 src 的提交
```

**看某次提交改了啥**

```bash
$ git show 5f3a2b1                  # 展示 diff + 提交信息
$ git show 5f3a2b1 --name-only      # 只想看改了哪些文件
```

**比较差异**

```bash
$ git diff                          # 工作区 vs 暂存区
$ git diff --cached                 # 暂存区 vs HEAD
$ git diff HEAD                     # 工作区 vs HEAD
$ git diff main dev                 # 两分支对比
$ git diff a1b2c3d..e4f5g6h        # 两提交区间
```

**快速定位问题**

```bash
$ git blame index.js | grep 42      # 第 42 行是谁写的
$ git bisect start                  # 二分查找第一次出 bug 的提交
$ git bisect good v1.0
$ git bisect bad HEAD
# 每次编译测试后输入 git bisect good/bad，Git 自动跳到下一个待测节点
```

## 完整工作流程示例

> 以「开发登录功能」为主线，从 0 到上线一步不漏。

**1) 接到需求**

```bash
$ git checkout main
$ git pull origin main                # 保证本地 main 最新
$ git checkout -b feature/login       # 创建功能分支
```

**2) 日常迭代**

```bash
# 写代码……
$ git add src/api/login.js
$ git commit -m "feat: 新增手机号验证码登录"

# 继续写……
$ git commit -am "fix: 验证码倒计时逻辑"
```

**3) 推送到远程备份 & 创建 PR**

```bash
$ git push -u origin feature/login    # 第一次推送带 -u
# 打开 GitHub → New Pull Request
```

**4) 解决冲突（如有）**

```bash
$ git checkout main
$ git pull origin main                # 主分支已更新
$ git checkout feature/login
$ git rebase main                     # 把 feature/login 的提交“垫”到 main 最新节点
# 编辑器解决冲突 → git add . → git rebase --continue
$ git push --force-with-lease         # rebase 后需强推
```

**5) 合并到主分支**

```bash
# 在 GitHub 点 Merge 按钮或通过命令：
$ git checkout main
$ git merge --no-ff feature/login -m "merge: 完成登录功能"
$ git push origin main
$ git branch -d feature/login         # 本地清理
$ git push origin --delete feature/login   # 远程清理
```

**6) 打版本标签**

```bash
$ git tag -a v1.2.0 -m "release: 支持手机号登录"
$ git push origin v1.2.0
```

## 进阶技巧

**一键清理已合并分支**

```bash
$ git bclean   # 别名生效后，删除本地已合并的废弃分支
```

**把二进制大文件迁出 Git**

```bash
# 若仓库曾因 *.psd、*.zip 变得巨大，可用 Git LFS 或 filter-repo 清洗
$ git lfs track "*.psd"
$ git add .gitattributes
```