# GIT 



## 常见问题

### .gitignore 配置文件不生效

> 原因是因为在git忽略目录中，新建的文件在git中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore中已经声明了忽略路径也是不起作用的，需要先删除缓存，然后再提交。

```shell:no-line-numbers
$ git rm -r --cached .
$ git add .
$ git commit -m 'update .gitignore'
$ git push
```