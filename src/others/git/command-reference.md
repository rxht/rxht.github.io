---
title: "Git 命令速查表"
Date: 2025-08-22 10:03:40
LastEditTime: 2025-08-22 10:03:56
description: Git 命令速查表
tags:
  - git
  - command
---


# Git 命令速查表

文章来源：
[Git Mastery Handbook 🚀  Git 精通手册 🚀](https://github.com/TickHaiJun/GitHub-Collaboration-Guide)

## 全局设置

### 配置用户信息

```bash
# 设置全局用户名，用于标识提交作者
$ git config --global user.name "Your Name"
```

```bash
# 设置全局邮箱地址，与用户名一起标识提交作者
$ git config --global user.email "your.email@example.com"
```

```bash
# 查看所有Git配置信息
$ git config --list
```

```bash
# 设置默认分支名为main（替代传统的master）
$ git config --global init.defaultBranch main
```

```bash
# 设置VS Code为默认编辑器（--wait参数会等待编辑器关闭）
$ git config --global core.editor "code --wait"
```

```bash
# 启用Git输出的颜色显示，提高可读性
$ git config --global color.ui auto
```

### 配置别名

```bash
# 创建status命令的简短别名st
$ git config --global alias.st status
```

```bash
# 创建checkout命令的简短别名co
$ git config --global alias.co checkout
```

```bash
# 创建branch命令的简短别名br
$ git config --global alias.br branch
```

```bash
# 创建commit命令的简短别名ci
$ git config --global alias.ci commit
```

```bash
# 创建取消暂存文件的别名unstage
$ git config --global alias.unstage 'reset HEAD --'
```

## 常用命令

### 仓库初始化

```bash
# 在当前目录初始化一个新的Git仓库
$ git init
```

```bash
# 克隆远程仓库到本地（默认克隆所有分支）
$ git clone <repository-url>
```

```bash
# 克隆远程仓库的指定分支到本地
$ git clone -b <branch-name> <repository-url>
```

### 文件操作

```bash
# 查看工作区和暂存区的状态（最常用命令）
$ git status
```

```bash
# 添加所有文件到暂存区（包括新文件和修改的文件）
$ git add .
```

```bash
# 添加指定文件到暂存区
$ git add <filename>
```

```bash
# 添加所有已跟踪文件的修改到暂存区（不包括新文件）
$ git add -u
```

```bash
# 进入交互式添加模式，可以选择性地暂存文件的部分更改
$ git add -i
```

### 提交操作

```bash
# 提交暂存区的更改到本地仓库，并添加提交信息
$ git commit -m "commit message"
```

```bash
# 添加所有已跟踪文件的修改并提交（相当于git add -u + git commit）
$ git commit -am "commit message"
```

```bash
# 修改最近一次提交的信息（不会创建新的提交）
$ git commit --amend -m "new commit message"
```

```bash
# 创建一个空提交（常用于触发CI/CD流程）
$ git commit --allow-empty -m "empty commit"
```

## 分支管理

### 查看分支

```bash
# 查看本地分支列表（当前分支前有*标记）
$ git branch
```

```bash
# 查看远程分支列表
$ git branch -r
```

```bash
# 查看所有分支（包括本地和远程）
$ git branch -a
```

```bash
# 查看分支详细信息（包括最新提交）
$ git branch -v
```

### 创建分支

```bash
# 基于当前分支创建新分支（不切换）
$ git branch <branch-name>
```

```bash
# 基于特定提交创建新分支
$ git branch <branch-name> <commit-hash>
```

```bash
# 创建并立即切换到新分支（传统方式）
$ git checkout -b <branch-name>
```

```bash
# 创建并切换到新分支（Git 2.23+推荐方式）
$ git switch -c <branch-name>
```

### 切换分支

```bash
# 切换到指定分支（传统方式）
$ git checkout <branch-name>
```

```bash
# 切换到指定分支（Git 2.23+推荐方式）
$ git switch <branch-name>
```

```bash
# 切换到上一个分支（类似cd -）
$ git checkout -
```

```bash
# 切换到主分支（假设主分支名为main）
$ git checkout main
```

### 合并分支

```bash
# 将指定分支合并到当前分支（默认使用快进合并）
$ git merge <branch-name>
```

```bash
# 仅允许快进合并（如果不能快进则失败）
$ git merge --ff-only <branch-name>
```

```bash
# 强制创建合并提交（即使可以快进）
$ git merge --no-ff <branch-name>
```

```bash
# 将分支的所有提交压缩为一个提交再合并
$ git merge --squash <branch-name>
```

### 删除分支

```bash
# 安全删除已合并的分支
$ git branch -d <branch-name>
```

```bash
# 强制删除分支（即使未合并）
$ git branch -D <branch-name>
```

```bash
# 删除远程分支
$ git push origin --delete <branch-name>
```


## 远程仓库操作

### 远程仓库管理

```bash
# 查看所有远程仓库及其URL
$ git remote -v
```

```bash
# 添加远程仓库并命名为origin
$ git remote add origin <repository-url>
```

```bash
# 修改远程仓库URL
$ git remote set-url origin <new-repository-url>
```

```bash
# 将远程仓库origin重命名为upstream
$ git remote rename origin upstream
```

```bash
# 删除名为origin的远程仓库
$ git remote remove origin
```

### 推送操作

```bash
# 将本地分支推送到远程仓库
$ git push origin <branch-name>
```

```bash
# 首次推送主分支并设置上游跟踪
$ git push -u origin main
```

```bash
# 推送所有本地分支到远程仓库
$ git push --all origin
```

```bash
# 推送所有标签到远程仓库
$ git push --tags origin
```

```bash
# 强制推送（会覆盖远程历史，谨慎使用）
$ git push --force origin <branch-name>
```

### 拉取操作

```bash
# 拉取并合并当前分支的远程更改
$ git pull
```

```bash
# 拉取指定远程分支并合并到当前分支
$ git pull origin <branch-name>
```

```bash
# 获取远程仓库最新状态但不合并
$ git fetch
```

```bash
# 获取所有远程仓库的最新状态
$ git fetch --all
```

```bash
# 拉取远程更改并使用变基而非合并
$ git pull --rebase
```

## 撤销与回退

### 撤销暂存区

```bash
# 将文件从暂存区移回工作区（不丢失修改）
$ git reset HEAD <filename>
```

```bash
# 将所有文件从暂存区移回工作区
$ git reset HEAD
```

```bash
# 新版本Git中撤销暂存的方式
$ git restore --staged <filename>
```

### 撤销工作区

```bash
# 丢弃工作区中对文件的修改（不可恢复）
$ git checkout -- <filename>
```

```bash
# 丢弃工作区中所有修改（谨慎使用）
$ git checkout -- .
```

```bash
# 新版本Git中撤销工作区修改的方式
$ git restore <filename>
```

### 回退提交

```bash
# 撤销最近提交，修改保留在暂存区
$ git reset --soft HEAD~1
```

```bash
# 撤销最近提交，修改保留在工作区（默认行为）
$ git reset --mixed HEAD~1
```

```bash
# 彻底撤销最近提交，丢弃所有修改（谨慎使用）
$ git reset --hard HEAD~1
```

```bash
# 回退到指定提交，丢弃之后的所有修改
$ git reset --hard <commit-hash>
```

### 创建反向提交

```bash
# 创建新提交来撤销指定提交的更改
$ git revert <commit-hash>
```

```bash
# 撤销合并提交（-m 1表示保留主分支线）
$ git revert -m 1 <merge-commit-hash>
```

```bash
# 撤销一个范围内的多个提交
$ git revert <commit-hash1>..<commit-hash2>
```

### 暂存修改

```bash
# 暂存当前工作目录和暂存区的修改
$ git stash
```

```bash
# 暂存包括未跟踪文件在内的所有修改
$ git stash -u
```

```bash
# 暂存修改并添加描述信息
$ git stash save "work in progress"
```

```bash
# 查看所有暂存的修改列表
$ git stash list
```

```bash
# 恢复最近一次暂存的修改并从列表中删除
$ git stash pop
```

```bash
# 恢复指定的暂存修改（不删除）
$ git stash apply stash@{0}
```

```bash
# 删除指定的暂存修改
$ git stash drop stash@{0}
```

```bash
# 清空所有暂存的修改
$ git stash clear
```

## 日志与对比

### 查看提交历史

```bash
# 查看当前分支的提交历史
$ git log
```

```bash
# 简洁模式查看提交历史（只显示提交哈希和消息）
$ git log --oneline
```

```bash
# 图形化显示分支合并历史
$ git log --graph --oneline
```

```bash
# 图形化显示所有分支的提交历史
$ git log --graph --all --oneline
```

```bash
# 查看指定文件的提交历史
$ git log -- <filename>
```

```bash
# 查看指定作者的提交
$ git log --author="Author Name"
```

```bash
# 查看指定时间范围内的提交
$ git log --since="2024-01-01" --until="2024-12-31"
```

### 查看提交详情

```bash
# 查看指定提交的详细信息和更改内容
$ git show <commit-hash>
```

```bash
# 查看最近一次提交的详细信息
$ git show HEAD
```

```bash
# 只查看提交的统计信息，不显示具体差异
$ git show --stat <commit-hash>
```

### 对比差异

```bash
# 查看工作区与暂存区的差异
$ git diff
```

```bash
# 查看暂存区与上次提交的差异
$ git diff --cached
```

```bash
# 查看工作区与上次提交的差异
$ git diff HEAD
```

```bash
# 对比两个提交之间的差异
$ git diff <commit-hash1> <commit-hash2>
```

```bash
# 对比两个分支之间的差异
$ git diff <branch1> <branch2>
```

```bash
# 查看指定文件的差异
$ git diff <filename>
```

```bash
# 以单词为单位显示差异（而非行）
$ git diff --word-diff
```

### 查找和定位

```bash
# 查找提交信息中包含关键字的提交
$ git log --grep="keyword"
```

```bash
# 在代码中搜索指定内容
$ git grep "search-term"
```

```bash
# 查看文件的每一行是谁修改的
$ git blame <filename>
```

```bash
$ git bisect start
$ git bisect bad <bad-commit>
$ git bisect good <good-commit>
# 使用二分查找定位引入问题的提交
```

## 完整工作流程

### 1. 项目初始化

```bash
# 创建项目目录并进入
mkdir my-project
cd my-project
```

```bash
# 初始化Git仓库
$ git init
```

```bash
# 配置用户信息（如果未全局配置）
$ git config user.name "Your Name"
$ git config user.email "your.email@example.com"
```

```bash
# 创建.gitignore文件排除不需要版本控制的文件
echo "node_modules/" > .gitignore
echo "*.log" >> .gitignore
echo ".env" >> .gitignore
```

### 2. 首次提交

```bash
# 创建初始项目文件
echo "# My Project" > README.md
echo "console.log('Hello World');" > index.js
```

```bash
# 添加所有文件到暂存区
$ git add .
```

```bash
# 进行首次提交
$ git commit -m "Initial commit: Add README and basic setup"
```

```bash
# 检查仓库状态
$ git status
```

### 3. 连接远程仓库

```bash
# 添加远程仓库（先在GitHub/GitLab等平台创建）
$ git remote add origin https://github.com/username/my-project.git
```

```bash
# 推送代码到远程仓库并设置上游跟踪
$ git push -u origin main
```

```bash
# 验证远程连接
$ git remote -v
```

### 4. 功能开发流程

```bash
# 基于当前分支创建功能分支
$ git checkout -b feature/user-authentication

# 开发功能...编辑文件，添加新功能
```

```bash
# 查看修改状态
$ git status
```

```bash
# 添加特定文件到暂存区
$ git add src/auth.js src/login.js
```

```bash
# 提交修改（多行提交信息）
$ git commit -m "Add user authentication system\n\n- Implement login functionality\n- Add password validation\n- Create user session management"
```

```bash
# 推送功能分支到远程
$ git push origin feature/user-authentication
```

### 5. 更新和同步

```bash
# 切换回主分支
$ git checkout main
```

```bash
# 拉取主分支最新代码
$ git pull origin main
```

```bash
# 切换回功能分支
$ git checkout feature/user-authentication
```

```bash
# 将主分支的最新修改变基到功能分支
$ git rebase main

# 如果有冲突，解决冲突后继续
```

```bash
# 安全强制推送更新后的功能分支
$ git add <conflicted-files>
$ git rebase --continue
$ git push --force-with-lease origin feature/user-authentication
```

### 6. 代码审查和合并准备

```bash
# 交互式变基，压缩或修改最近3个提交
$ git rebase -i HEAD~3

# 在交互界面中选择squash或fixup来合并提交
```

```bash
# 推送整理后的提交历史
$ git push --force-with-lease origin feature/user-authentication

# 在GitHub/GitLab等平台创建Pull Request/Merge Request
```

### 7. 合并与冲突处理

**方式一：通过命令行合并**

```bash
# 如果有合并冲突
$ git checkout main
$ git pull origin main
$ git merge feature/user-authentication
```

```bash
# 1. 查看冲突文件
$ git status

# 2. 手动编辑冲突文件，解决冲突标记
```

```bash
$ git add <resolved-files>
$ git commit -m "Resolve merge conflicts in user authentication"
```

**方式二：使用变基合并（保持线性历史）**

```bash
$ git checkout main
$ git pull origin main
$ git checkout feature/user-authentication
$ git rebase main
$ git checkout main
$ git merge feature/user-authentication
```

### 8. 推送与清理

```bash
# 推送合并后的主分支到远程
$ git push origin main
```

```bash
# 删除本地功能分支
$ git branch -d feature/user-authentication
```

```bash
# 删除远程功能分支
$ git push origin --delete feature/user-authentication
```

```bash
# 清理本地已不存在的远程分支引用
$ git remote prune origin
```

```bash
# 创建并推送版本标签（可选）
$ git tag -a v1.0.0 -m "Release version 1.0.0"
$ git push origin v1.0.0
```

### 9. 持续开发循环

```bash
# 开始新功能开发，重复步骤4-8
$ git checkout main
$ git pull origin main
$ git checkout -b feature/payment-system
```

### 10. 紧急修复流程

```bash
# 基于main分支创建热修复分支
$ git checkout main
$ git pull origin main
$ git checkout -b hotfix/security-patch

# 进行紧急修复...编辑代码
```

```bash
# 快速提交和推送热修复
$ git add .
$ git commit -m "Security patch: Fix authentication vulnerability"
$ git push origin hotfix/security-patch
```

```bash
# 快速合并到main（跳过正常审查流程）
$ git checkout main
$ git merge hotfix/security-patch
$ git push origin main
```

```bash
# 同时合并到开发分支（如果存在）
$ git checkout develop
$ git merge hotfix/security-patch
$ git push origin develop
```

```bash
# 清理热修复分支
$ git branch -d hotfix/security-patch
$ git push origin --delete hotfix/security-patch
```

```bash
# 创建紧急版本标签
$ git tag -a v1.0.1 -m "Emergency security patch"
$ git push origin v1.0.1
```
