# 常见系统命令

## 查看系统信息

### 操作系统版本

::: code-group

```bash:no-line-numbers [linux]
$ uname -a
$ lsb_release -a
```

```bash:no-line-numbers [win]
$ winver
$ msinfo32
```

:::

### 内核版本

::: code-group

```bash:no-line-numbers [linux]
$ uname -r
```

```bash:no-line-numbers [win]
$ winver
$ VER
```

:::

### 系统架构

::: code-group

```bash:no-line-numbers [linux]
$ uname -m
```

```bash:no-line-numbers [win]
$ systeminfo
```

:::


## 查看硬件信息

### CPU

::: code-group

```bash:no-line-numbers [linux]
$ lscpu
$ cat /proc/cpuinfo
```

```bash:no-line-numbers [linux]
$ wmic cpu
$ wmic cpu list brief
```

:::

### 内存

::: code-group

```bash:no-line-numbers [linux]
$ free -h
$ cat /proc/meminfo
```

```bash:no-line-numbers [win]
$ wmic memorychip # 内存详细信息
$ wmic memorychip list brief # 内存条数
$ wmic memcache list brief # 缓存内存
```

:::

### 硬盘

::: code-group

```bash:no-line-numbers [linux]
$ lsblk
$ df -h
```

```bash:no-line-numbers [win]
$ wmic diskdrive # 磁盘详细信息
$ wmic logicaldisk # 盘符格式大小以及剩余空间
```

:::

### PCI

::: code-group

```bash:no-line-numbers [linux]
$ lspci
```

:::

## 查看硬件信息

### IP 地址和网络接口

::: code-group

```bash:no-line-numbers [linux]
$ ip a
$ ifconfig
```

```bash:no-line-numbers [win]
$ ipconfig
$ wmic nic list brief # 网卡详细信息
```

:::

### 路由表

::: code-group

```bash:no-line-numbers [linux]
$ ip route
$ route -n
```

:::

### 网络连接

::: code-group

```bash:no-line-numbers [linux]
$ netstat -tuln
$ ss -tuln
```

:::

## 查看服务和守护进程

### 所有服务

::: code-group

```bash:no-line-numbers [linux]
$ systemctl list-units --type=service
```

:::

### 指定服务

::: code-group

```bash:no-line-numbers [linux]
$ systemctl status service_name
```

:::



## 查看系统负载和进程

### 系统负载

::: code-group

```bash:no-line-numbers [linux]
$ top
$ htop
```

:::

### 进程

::: code-group

```bash:no-line-numbers [linux]
$ ps aux
```

:::

## 查看磁盘使用情况

### 磁盘分区

::: code-group

```bash:no-line-numbers [linux]
$ fdisk -l
```

:::

### 磁盘分区

::: code-group

```bash:no-line-numbers [linux]
$ df -h
```

:::

## 查看用户和组

### 所有用户

```bash:no-line-numbers
$ cat /etc/passwd
```

### 所有组

```bash:no-line-numbers
$ cat /etc/group
```