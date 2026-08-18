---
Date: 2026-08-11 17:40:11
LastEditTime: 2026-08-18 16:17:56
description: Ubuntu 22.04 单机部署 Slurm 工作负载管理器，并配置任务完成/失败的邮件通知
tags:
  - slurm
  - install
  - Ubuntu
  - mail
---

# Slurm

Slurm（Simple Linux Utility for Resource Management）是一个开源的分布式资源管理和作业调度软件，用于超级计算机和大中小型计算节点集群的管理，具有高度的扩展性和容错性。Slurm调度系统使用简单、功能强大、应用广泛，是HPC调度领域事实上的标准。

Slurm 利用分区(partition)对 CPU、内存、网络等资源进行分类，以便将不同需求的任务运行到不同规格的计算节点上。用户需利用 Slurm 命令将该任务及所需资源请求等提交到特定的分区中，等任务申请的资源得到满足后，任务才开始运行。任务运行受分区、账户、服务质量 (QOS)等限制。

本文记录在 **Ubuntu 22.04** 单台机器上部署 Slurm（slurm-wlm），并配置任务邮件通知的完整流程，适用于个人工作站或单机测试环境。

## 环境准备

- 操作系统：Ubuntu 22.04
- 权限：具备 `sudo` 的账户（下文服务以 `root` 运行）
- 主机名：记下令 `hostname` 命令输出的主机名，下文统一用占位符 `master` 表示，请将其**全部替换**为你的实际主机名

> Slurm 要求控制节点（slurmctld）与计算节点（slurmd）的主机名可解析。单机部署时两者为同一台机器，因此 `ControlMachine` 与 `NodeName` 需使用同一个主机名。

## 一、安装 Slurm

```bash
sudo apt update
sudo apt install slurm-wlm slurm-wlm-doc -y
```

安装过程中若弹出配置向导（如邮件组件或内核相关提示），一路回车采用默认即可。

验证安装版本：

```bash
slurm --version
# 输出版本号，如 slurm-wlm 21.08.x（随 Ubuntu 仓库变化）
```

## 二、配置 slurm.conf

配置文件位于 `/etc/slurm-llnl/slurm.conf`（若不存在请新建）：

```bash
sudo vi /etc/slurm-llnl/slurm.conf
```

参考配置如下（说明已统一改为 `#` 注释，请按需替换 `master` 与 CPU 参数）：

```ini
ClusterName=cool
ControlMachine=[user]

MailProg=/usr/bin/s-nail
SlurmUser=root
SlurmctldPort=6817
SlurmdPort=6818
AuthType=auth/munge
StateSaveLocation=/var/spool/slurmctld
SlurmdSpoolDir=/var/spool/slurmd
SwitchType=switch/none
MpiDefault=none
SlurmctldPidFile=/var/run/slurmctld.pid
SlurmdPidFile=/var/run/slurmd.pid
ProctrackType=proctrack/pgid
ReturnToService=0

# TIMERS
SlurmctldTimeout=300
SlurmdTimeout=300
InactiveLimit=0
MinJobAge=300
KillWait=30
Waittime=0

# SCHEDULING
SchedulerType=sched/backfill

# LOGGING
SlurmctldDebug=info
SlurmctldLogFile=/var/log/slurm-llnl/slurmctld.log
SlurmdDebug=info
SlurmdLogFile=/var/log/slurm-llnl/slurmd.log
JobCompType=jobcomp/none

# COMPUTE NODES
PartitionName=[user] Nodes=[user] Default=NO MaxTime=INFINITE State=UP
NodeName=[user] Sockets=[Sockets] CoresPerSocket=[cpus] ThreadsPerCore=[tpc] State=UNKNOWN
```

### 关键参数说明

| 参数 | 含义 |
| --- | --- |
| `ControlMachine` | 控制节点主机名，必须与 `hostname` 输出一致 |
| `MailProg` | 邮件发送程序路径，须指向后文安装的 `s-nail` |
| `PartitionName` | 分区名，提交任务时用 `-p` 指定；`Default=NO` 时需显式指定 `-p master` |
| `NodeName` | 计算节点定义；`Sockets`=物理 CPU 数，`CoresPerSocket`=每 CPU 核数，`ThreadsPerCore`=每核线程数（开启超线程为 `2`，否则为 `1`） |
| `State=UNKNOWN` | 节点初始状态，slurmd 启动后会自动转为 `idle` |

### 获取参数值

用于填写 `Sockets` / `CoresPerSocket`：

```bash
# Sockets
cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l

# CoresPerSocket
cat /proc/cpuinfo| grep "cpu cores"| uniq
```

用于填写 `ThreadsPerCore` ：

```bash
#!/bin/bash
cpunum=`cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l`
echo "CPU 个数: $cpunum";
cpuhx=`cat /proc/cpuinfo | grep "cores" | uniq | awk -F":" '{print $2}'`
echo "CPU 核心数：$cpuhx" ; 
cpuxc=`cat /proc/cpuinfo | grep "processor" | wc -l`
echo "CPU 线程数：$cpuxc" ;
  
if [[ `expr $cpunum\*$[cpuhx*2] ` -eq $cpuxc ]];
then
    echo "2"
else
    echo "1"
fi
```


> 超线程判断：若逻辑处理器总数（`CPU(s)`）等于 `Socket(s) × Core(s) per socket × 2`，即已开启超线程，设 `ThreadsPerCore=2`；否则设 `ThreadsPerCore=1`。

## 三、启动 Slurm

```bash
sudo systemctl enable slurmctld --now
sudo systemctl enable slurmd --now
```

查看节点状态：

```bash
sinfo
```

![sinfo](./assets/sinfo.png)

若节点 `STATE` 不是 `idle`（例如 `drained` / `down`），手动恢复：

```bash
sudo scontrol update NodeName=master State=RESUME
```

:::danger
若节点状态始终异常，参考排查文档：<https://github.com/aws/aws-parallelcluster/issues/2467>
:::

## 四、配置邮件通知

Ubuntu 18.04 之后推荐使用 `s-nail`（而非 `mailx` / `mailutils`）作为邮件发送程序，与上文 `MailProg` 对应。

安装：

```bash
sudo apt install s-nail -y
```

编辑 `/etc/s-nail.rc`，在末尾追加（以 QQ 邮箱为例）：

```ini
set from="你的邮箱@qq.com"
set smtp="smtps://smtp.qq.com:465"
set smtp-auth-user="你的邮箱@qq.com"
set smtp-auth-password="邮箱授权码"
set smtp-auth=login
```

:::tip
QQ 邮箱授权码获取：<https://service.mail.qq.com/cgi-bin/help?subtype=1&id=28&no=1001256>
:::

发送测试邮件，确认可正常投递：

```bash
echo "邮件内容" | s-nail -s "邮件主题" 你的邮箱@qq.com
```

确认收到后，重启控制服务使 `MailProg` 配置生效：

```bash
sudo systemctl restart slurmctld
```

## 五、测试 sbatch 任务

创建测试脚本 `test.slurm`：

```bash
vi test.slurm
```

```bash
#!/bin/bash
#SBATCH -J dog
#SBATCH -p master
#SBATCH -N 1
#SBATCH -n 1
#SBATCH --mail-user=你的qq邮箱@qq.com
#SBATCH --mail-type=ALL

sleep 5
whoami
```

提交任务并观察是否收到邮件：

```bash
sbatch test.slurm
```

> 说明：`-p master` 对应 `PartitionName=master`；因该分区 `Default=NO`，必须显式指定 `-p`。`--mail-type=ALL` 会在任务开始、结束、失败时均发送邮件。


## 六、常用命令

| 命令 | 功能介绍 | 常用命令例子 |
| --- | --- | --- |
| sinfo | 显示分区和节点的状态 |	`sinfo` |
| squeue | 显示作业状态 |	`squeue` |
| srun | 用于交互式作业提交 |	`srun -n 2 -p p1-c1-2 hostname` |
| sbbatch	| 用于批处理作业提交 |	`sbatch -n 2 job.sh` |
| salalloc	| 用于分配模式作业提交 |	`salloc -p p1-c1-2` |
| scancel	| 用于取消已提交的作业 |	`scancel JOBID` |
| scontrol	| 用于查看和修改slurm配置和状态，包括查询节点信息或正在运行的作业信息 |	`scontrol show job JOBID` |

## 文章来源

- [我心永恒小站：Ubuntu 20.04 安装 Slurm](https://wxyh.notion.site/Ubuntu20-04-slurm-28f03eec6bd04428a059ab47103d0756)

- [SCNet Slurm 文档](https://www.scnet.cn/help/docs/mainsite/hpc/cmd/slurm/)
