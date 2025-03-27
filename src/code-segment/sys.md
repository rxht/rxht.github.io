---
Date: 2025-03-21 19:47:49
LastEditTime: 2025-03-27 21:57:00
---
# 常见系统命令

## 查看系统信息

### 操作系统版本

::: code-group

```bash:no-line-numbers [linux]
$ uname -a # 查看内核/OS/CPU信息
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
$ uname -r # 查看内核版本
```

```bash:no-line-numbers [win]
$ winver
$ VER
```

:::

### 系统架构

::: code-group

```bash:no-line-numbers [linux]
$ uname -m # 查看系统架构
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
# netstat [选项]
# -a 或 --all：显示所有连接和监听端口。
# -t 或 --tcp：显示 TCP 连接。
# -u 或 --udp：显示 UDP 连接。
# -n 或 --numeric：以数字形式显示地址和端口号（不解析主机名和服务名）。
# -l 或 --listening：显示监听中的端口。
# -p 或 --program：显示与连接相关的进程 ID 和程序名称。
# -r 或 --route：显示路由表。
# -s 或 --statistics：显示网络接口的统计信息。
# -c 或 --continuous：持续输出网络状态（类似于实时监控）。
$ netstat -tuln

$ ss -tuln
```

```bash:no-line-numbers [win]
# netstat [选项] 
# -a 显示所有socket，包括正在监听的。 
# -c 每隔1秒就重新显示一遍，直到用户中断它。 
# -i 显示所有网络接口的信息，格式同“ifconfig -e”。 
# -n 以网络IP地址代替名称，显示出网络连接情形。 
# -r 显示核心路由表，格式同“route -e”。 
# -t 显示TCP协议的连接情况。 
# -u 显示UDP协议的连接情况。 
# -v 显示正在进行的工作。 
# -A 显示任何关联的协议控制块的地址。主要用于调试 
# -a 显示所有套接字的状态。在一般情况下不显示与服务器进程相关联的套接字 
# -i 显示自动配置接口的状态。那些在系统初始引导后配置的接口状态不在输出之列 
# -m 打印网络存储器的使用情况 
# -n 打印实际地址，而不是对地址的解释或者显示主机，网络名之类的符号 
# -r 打印路由选择表 
# -f address -family对于给出名字的地址簇打印统计数字和控制块信息。到目前为止，唯一支持的地址簇是inet 
# -I interface 只打印给出名字的接口状态 
# -p protocol-name 只打印给出名字的协议的统计数字和协议控制块信息 
# -s 打印每个协议的统计数字 
# -t 在输出显示中用时间信息代替队列长度信息。 
$ netstat  -nao # 查看系统端口使用情况
$ netstat  -nao | findstr "8080" # 查看指定端口占用情况
```

:::

## 查看服务和守护进程

### 所有服务

::: code-group

```bash:no-line-numbers [linux]
$ systemctl list-units --type=service
```

```bash:no-line-numbers [win]
$ sc query # 显示所有服务的状态，包括它们的名称、显示名称、服务状态和启动类型
$ sc query state=all # 显示所有服务的详细状态信息
$ net start # 显示所有当前正在运行的服务
$ wmic service list brief # 显示所有服务的简略列表
```

:::

### 指定服务

::: code-group

```bash:no-line-numbers [linux]
$ systemctl status service_name
```

```bash:no-line-numbers [win]
$ sc query service_name # 显示指定服务的状态
```

:::



## 查看系统负载和进程

### 系统负载

::: code-group

```bash:no-line-numbers [linux]
$ top
$ htop
```

```bash:no-line-numbers [win]
$ wmic cpu get loadpercentage # 显示 CPU 的当前使用率，以百分比表示。例如，如果 CPU 使用率为 16%，输出将显示：16
```

:::

### 进程

::: code-group

```bash:no-line-numbers [linux]
$ ps aux
```

```bash:no-line-numbers [win]
$ netstat -ano # 查看所有网络端口进程
$ tasklist # 查看所有进程
$ netstat -ano | findstr "8080" # 查看指定网络端口的程序
```

:::

## 查看磁盘使用情况

### 磁盘分区

::: code-group

```bash:no-line-numbers [linux]
$ fdisk -l
```

```bash:no-line-numbers [win]
$ diskpart # 步骤一：先进入硬盘查看模式
$ list disk # 步骤二： 查看系统挂载的磁盘
```

:::

### 磁盘使用情况

::: code-group

```bash:no-line-numbers [linux]
$ df -h
```

```bash:no-line-numbers [win]
$ wmic diskdrive # 查看磁盘剩余空间
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

## 关机/重启/注销
```bash:no-line-numbers
$ shutdown -h now # 立即关机
$ shutdown -r now # 立即重启
$ shutdown -h 10 # 10分钟后关机
$ shutdown -h 11:00	# 11:00关机
$ shutdown -r 10 # 10分钟后重启
$ shutdown -r 11:00 # 定时重启
$ shutdown -c # 取消关机/重启
$ logout # 注销当前用户
$ reboot # 重启
$ poweroff # 关机
```
