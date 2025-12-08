---
Date: 2025-12-08 09:56:17
LastEditTime: 2025-12-08 10:33:10
---

# NVIDIA GPU 常用命令

## 基础命令

> nvidia-smi简称NVSMI，提供监控GPU使用情况和更改GPU状态的功能，是一个跨平台工具，该工具是N卡驱动附带的，只要安装好驱动后就可以使用它。

```bash
$ nvidia-smi
Mon Dec  8 09:55:41 2025
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 462.31       Driver Version: 462.31       CUDA Version: 11.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name            TCC/WDDM | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  GeForce GTX 166... WDDM  | 00000000:01:00.0  On |                  N/A |
| 22%   40C    P8    18W / 125W |   1871MiB /  6144MiB |      2%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
```

常用指标说明：
  - Fan： 风扇转速（0%--100%），N/A表示没有风扇
  - Temp： GPU温度（GPU温度过高会导致GPU频率下降）
  - Perf： 性能状态，从P0（最大性能）到P12（最小性能）
  - Pwr： GPU功耗
  - Persistence-M： 持续模式的状态（持续模式耗能大，但在新的GPU应用启动时花费时间更少）
  - Bus-Id： GPU总线，`domain:bus:device.function`
  - Disp.A： Display Active，表示GPU的显示是否初始化
  - Memory-Usage：显存使用率Volatile 
  - GPU-Util：GPU使用率
  - ECC： 是否开启错误检查和纠正技术
    - 0/DISABLED
    - 1/ENABLED
  - Compute M.： 计算模式
    - 0/DEFAULT
    - 1/EXCLUSIVE_PROCESS
    - 2/PROHIBITED

## 查看GPU详细信息

```bash [查看所有GPU]
$ nvidia-smi -q

==============NVSMI LOG==============

Timestamp                                 : Mon Dec  8 10:02:50 2025
Driver Version                            : 462.31
CUDA Version                              : 11.2

Attached GPUs                             : 1
GPU 00000000:01:00.0
    Product Name                          : GeForce GTX 1660 SUPER
    Product Brand                         : GeForce
    Display Mode                          : Enabled
    Display Active                        : Enabled
    Persistence Mode                      : N/A
    MIG Mode
        Current                           : N/A
        Pending                           : N/A
    Accounting Mode                       : Disabled
    Accounting Mode Buffer Size           : 4000
    Driver Model
        Current                           : WDDM
        Pending                           : WDDM
    Serial Number                         : N/A
    GPU UUID                              : GPU-5ee404d7-383f-44c4-b4f3-98a43cda3f0c
    Minor Number                          : N/A
    VBIOS Version                         : 90.16.4D.00.44
    MultiGPU Board                        : No
    Board ID                              : 0x100
    GPU Part Number                       : N/A
    Inforom Version
        Image Version                     : G001.0000.02.04
        OEM Object                        : 1.1
        ECC Object                        : N/A
        Power Management Object           : N/A
    GPU Operation Mode
        Current                           : N/A
        Pending                           : N/A
    GPU Virtualization Mode
        Virtualization Mode               : None
        Host VGPU Mode                    : N/A
    IBMNPU
        Relaxed Ordering Mode             : N/A
    PCI
        Bus                               : 0x01
        Device                            : 0x00
        Domain                            : 0x0000
        Device Id                         : 0x21C410DE
        Bus Id                            : 00000000:01:00.0
        Sub System Id                     : 0x37971462
        GPU Link Info
            PCIe Generation
                Max                       : 3
                Current                   : 1
            Link Width
                Max                       : 16x
                Current                   : 16x
        Bridge Chip
            Type                          : N/A
            Firmware                      : N/A
        Replays Since Reset               : 0
        Replay Number Rollovers           : 0
        Tx Throughput                     : 9000 KB/s
        Rx Throughput                     : 12000 KB/s
    Fan Speed                             : 22 %
    Performance State                     : P8
    Clocks Throttle Reasons
        Idle                              : Active
        Applications Clocks Setting       : Not Active
        SW Power Cap                      : Not Active
        HW Slowdown                       : Not Active
            HW Thermal Slowdown           : Not Active
            HW Power Brake Slowdown       : Not Active
        Sync Boost                        : Not Active
        SW Thermal Slowdown               : Not Active
        Display Clock Setting             : Not Active
    FB Memory Usage
        Total                             : 6144 MiB
        Used                              : 1955 MiB
        Free                              : 4189 MiB
    BAR1 Memory Usage
        Total                             : 256 MiB
        Used                              : 229 MiB
        Free                              : 27 MiB
    Compute Mode                          : Default
    Utilization
        Gpu                               : 2 %
        Memory                            : 7 %
        Encoder                           : 0 %
        Decoder                           : 0 %
    Encoder Stats
        Active Sessions                   : 0
        Average FPS                       : 0
        Average Latency                   : 0
    FBC Stats
        Active Sessions                   : 0
        Average FPS                       : 0
        Average Latency                   : 0
    Ecc Mode
        Current                           : N/A
        Pending                           : N/A
    ECC Errors
        Volatile
            SRAM Correctable              : N/A
            SRAM Uncorrectable            : N/A
            DRAM Correctable              : N/A
            DRAM Uncorrectable            : N/A
        Aggregate
            SRAM Correctable              : N/A
            SRAM Uncorrectable            : N/A
            DRAM Correctable              : N/A
            DRAM Uncorrectable            : N/A
    Retired Pages
        Single Bit ECC                    : N/A
        Double Bit ECC                    : N/A
        Pending Page Blacklist            : N/A
    Remapped Rows                         : N/A
    Temperature
        GPU Current Temp                  : 39 C
        GPU Shutdown Temp                 : 96 C
        GPU Slowdown Temp                 : 93 C
        GPU Max Operating Temp            : 91 C
        GPU Target Temperature            : 83 C
        Memory Current Temp               : N/A
        Memory Max Operating Temp         : N/A
    Power Readings
        Power Management                  : Supported
        Power Draw                        : 19.34 W
        Power Limit                       : 125.00 W
        Default Power Limit               : 125.00 W
        Enforced Power Limit              : 125.00 W
        Min Power Limit                   : 70.00 W
        Max Power Limit                   : 125.00 W
    Clocks
        Graphics                          : 300 MHz
        SM                                : 300 MHz
        Memory                            : 405 MHz
        Video                             : 540 MHz
    Applications Clocks
        Graphics                          : N/A
        Memory                            : N/A
    Default Applications Clocks
        Graphics                          : N/A
        Memory                            : N/A
    Max Clocks
        Graphics                          : 2100 MHz
        SM                                : 2100 MHz
        Memory                            : 7001 MHz
        Video                             : 1950 MHz
    Max Customer Boost Clocks
        Graphics                          : N/A
    Clock Policy
        Auto Boost                        : N/A
        Auto Boost Default                : N/A
    Processes
        GPU instance ID                   : N/A
        Compute instance ID               : N/A
        Process ID                        : 924
            Type                          : C+G
            Name                          : Insufficient Permissions
            Used GPU Memory               : Not available in WDDM driver model
        GPU instance ID                   : N/A
        Compute instance ID               : N/A
        Process ID                        : 12068
            Type                          : C+G
            Name                          : C:\Windows\explorer.exe
            Used GPU Memory               : Not available in WDDM driver model
        GPU instance ID                   : N/A
        Compute instance ID               : N/A
        Process ID                        : 12320
            Type                          : C+G
            Name                          : C:\Windows\SystemApps\MicrosoftWindows.Client.CBS_cw5n1h2txyewy\SearchHost.exe
            Used GPU Memory               : Not available in WDDM driver model
```

```bash [查看第一块卡的详情]
$ nvidia-smi -q -i 0

==============NVSMI LOG==============

Timestamp                                 : Mon Dec  8 10:06:48 2025
Driver Version                            : 462.31
CUDA Version                              : 11.2

Attached GPUs                             : 1
GPU 00000000:01:00.0
    Product Name                          : GeForce GTX 1660 SUPER
    Product Brand                         : GeForce
    Display Mode                          : Enabled
    Display Active                        : Enabled
    Persistence Mode                      : N/A
    MIG Mode
        Current                           : N/A
        Pending                           : N/A
    Accounting Mode                       : Disabled
    Accounting Mode Buffer Size           : 4000
    Driver Model
        Current                           : WDDM
        Pending                           : WDDM
    Serial Number                         : N/A
    GPU UUID                              : GPU-5ee404d7-383f-44c4-b4f3-98a43cda3f0c
    Minor Number                          : N/A
    VBIOS Version                         : 90.16.4D.00.44
    MultiGPU Board                        : No
    Board ID                              : 0x100
    GPU Part Number                       : N/A
    Inforom Version
        Image Version                     : G001.0000.02.04
        OEM Object                        : 1.1
        ECC Object                        : N/A
        Power Management Object           : N/A
    GPU Operation Mode
        Current                           : N/A
        Pending                           : N/A
    GPU Virtualization Mode
        Virtualization Mode               : None
        Host VGPU Mode                    : N/A
    IBMNPU
        Relaxed Ordering Mode             : N/A
    PCI
        Bus                               : 0x01
        Device                            : 0x00
        Domain                            : 0x0000
        Device Id                         : 0x21C410DE
        Bus Id                            : 00000000:01:00.0
        Sub System Id                     : 0x37971462
        GPU Link Info
            PCIe Generation
                Max                       : 3
                Current                   : 1
            Link Width
                Max                       : 16x
                Current                   : 16x
        Bridge Chip
            Type                          : N/A
            Firmware                      : N/A
        Replays Since Reset               : 0
        Replay Number Rollovers           : 0
        Tx Throughput                     : 11000 KB/s
        Rx Throughput                     : 4000 KB/s
    Fan Speed                             : 22 %
    Performance State                     : P8
    Clocks Throttle Reasons
        Idle                              : Active
        Applications Clocks Setting       : Not Active
        SW Power Cap                      : Not Active
        HW Slowdown                       : Not Active
            HW Thermal Slowdown           : Not Active
            HW Power Brake Slowdown       : Not Active
        Sync Boost                        : Not Active
        SW Thermal Slowdown               : Not Active
        Display Clock Setting             : Not Active
    FB Memory Usage
        Total                             : 6144 MiB
        Used                              : 1968 MiB
        Free                              : 4176 MiB
    BAR1 Memory Usage
        Total                             : 256 MiB
        Used                              : 229 MiB
        Free                              : 27 MiB
    Compute Mode                          : Default
    Utilization
        Gpu                               : 1 %
        Memory                            : 7 %
        Encoder                           : 0 %
        Decoder                           : 0 %
    Encoder Stats
        Active Sessions                   : 0
        Average FPS                       : 0
        Average Latency                   : 0
    FBC Stats
        Active Sessions                   : 0
        Average FPS                       : 0
        Average Latency                   : 0
    Ecc Mode
        Current                           : N/A
        Pending                           : N/A
    ECC Errors
        Volatile
            SRAM Correctable              : N/A
            SRAM Uncorrectable            : N/A
            DRAM Correctable              : N/A
            DRAM Uncorrectable            : N/A
        Aggregate
            SRAM Correctable              : N/A
            SRAM Uncorrectable            : N/A
            DRAM Correctable              : N/A
            DRAM Uncorrectable            : N/A
    Retired Pages
        Single Bit ECC                    : N/A
        Double Bit ECC                    : N/A
        Pending Page Blacklist            : N/A
    Remapped Rows                         : N/A
    Temperature
        GPU Current Temp                  : 39 C
        GPU Shutdown Temp                 : 96 C
        GPU Slowdown Temp                 : 93 C
        GPU Max Operating Temp            : 91 C
        GPU Target Temperature            : 83 C
        Memory Current Temp               : N/A
        Memory Max Operating Temp         : N/A
    Power Readings
        Power Management                  : Supported
        Power Draw                        : 19.38 W
        Power Limit                       : 125.00 W
        Default Power Limit               : 125.00 W
        Enforced Power Limit              : 125.00 W
        Min Power Limit                   : 70.00 W
        Max Power Limit                   : 125.00 W
    Clocks
        Graphics                          : 300 MHz
        SM                                : 300 MHz
        Memory                            : 405 MHz
        Video                             : 540 MHz
    Applications Clocks
        Graphics                          : N/A
        Memory                            : N/A
    Default Applications Clocks
        Graphics                          : N/A
        Memory                            : N/A
    Max Clocks
        Graphics                          : 2100 MHz
        SM                                : 2100 MHz
        Memory                            : 7001 MHz
        Video                             : 1950 MHz
    Max Customer Boost Clocks
        Graphics                          : N/A
    Clock Policy
        Auto Boost                        : N/A
        Auto Boost Default                : N/A
    Processes
        GPU instance ID                   : N/A
        Compute instance ID               : N/A
        Process ID                        : 924
            Type                          : C+G
            Name                          : Insufficient Permissions
            Used GPU Memory               : Not available in WDDM driver model
****
```

```bash [将查询的信息输出到具体的文件中]
$ nvidia-smi –q –f xxx # xxx为具体文件名
```

```bash [查询的信息以xml的形式输出]
$ nvidia-smi –q –x
```

```bash [查询指定显示GPU卡的某些信息]
$ nvidia-smi -q -i –d xxx # xxx的取值可以为：MEMORY, UTILIZATION, ECC, TEMPERATURE, POWER,CLOCK, COMPUTE, PIDS, PERFORMANCE, SUPPORTED_CLOCKS, PAGE_RETIREMENT,ACCOUNTING
# 示例：查看第一块卡的ECC详情
$ $ nvidia-smi -i 0 -q -d ECC 
```

```bash [指定时间来不断查询GPU信息]
$ nvidia-smi –q –l xxx # xxx 的单位为S（秒）
```

```bash [指定输出具体属性参数]
$ nvidia-smi --query-gpu=gpu_name,gpu_bus_id,vbios_version --format=csv # 使用--query-gpu 来指定所要查询的属性，使用--format来指定输出格式
```

```bash [使用管道来过滤指定属性参数]
$ nvidia-smi -q|egrep -i "seria|uuid"
```

```bash [列出所有的GPU]
$ nvidia-smi -L
GPU 0: GeForce GTX 1660 SUPER (UUID: GPU-5ee404d7-383f-44c4-b4f3-98a43cda3f0c)
```

## 设备修改设置

持久模式：0/DISABLED,1/ENABLED
```bash
$ nvidia-smi –pm 0/1            
```

切换ECC支持：0/DISABLED, 1/ENABLED:
```bash
$ nvidia-smi –e 0/1
```

重置ECC错误计数：0/VOLATILE, 1/AGGREGATE:
```bash
$ nvidia-smi –p 0/1
```

设置计算应用模式：0/DEFAULT,1/EXCLUSIVE_PROCESS,2/PROHIBITED:
```bash
$ nvidia-smi –c
```

GPU复位:
```bash
$ nvidia-smi –r
```

设置GPU虚拟化模:
```bash
$ nvidia-smi –vm
```

设置GPU运行的工作频率。e.g. nvidia-smi –ac2000,800:
```bash
$ nvidia-smi –ac xxx,xxx
```

设置GPU运行的工作频率。e.g. nvidia-smi –ac2000,800:
```bash
$ nvidia-smi –rac
```

切换-ac和-rac的权限要求，0/UNRESTRICTED, 1/RESTRICTED:
```bash
$ nvidia-smi –acp 0/1
```

指定最大电源管理限制（瓦特）:
```bash
$ nvidia-smi –pl
```

启用或禁用计数模式，0/DISABLED,1/ENABLED:
```bash
$ nvidia-smi –am 0/1
```

清除缓冲区中的所有已记录PID，0/DISABLED,1/ENABLED:
```bash
$ nvidia-smi –caa  
```

## 监控数据

**设备监控**

GPU统计信息以一行的滚动格式显示，要监控的指标可以基于终端窗口的宽度进行调整，默认监控所有GPU:

**参数说明：**
- pwr：功耗
- temp：温度
- sm：流处理器
- mem：显存
- enc：编码资源
- dec：解码资源
- mclk：显存频率
- pclk：处理器频率

```bash
$ nvidia-smi dmon
# gpu   pwr gtemp mtemp    sm   mem   enc   dec  mclk  pclk
# Idx     W     C     C     %     %     %     %   MHz   MHz
    0    19    38     -     6     8     0     0   405   300
    0    19    38     -     3     7     0     0   405   300
    0    19    38     -     2     7     0     0   405   300
    0    19    38     -     2     7     0     0   405   300
    0    19    38     -     2     7     0     0   405   300
```

```bash [指定间隔刷新时间]
$ nvidia-smi dmon –d xxx # xxx 为时间单位为S（秒）
```

```bash [指定输出次数]
$ nvidia-smi dmon -c xxx # xxx 为次数
```

```bash [指定监控的指标]
$ nvidia-smi dmon –s xxx # xxx 对应的指标如下： 可以同时指定多个指标例如：$nvidia-smi dmon -s pucvm
# p：电源使用情况和温度（pwr：功耗，temp：温度）
# u：GPU使用率（sm：流处理器，mem：显存，enc：编码资源，dec：解码资源）
# c：GPU处理器和GPU内存时钟频率（mclk：显存频率，pclk：处理器频率）
# v：电源和热力异常
# m：FB内存和Bar1内存
# e：ECC错误和PCIe重显错误个数
# t：PCIe读写带宽
```

```bash [输出到具体的文件]
$ nvidia-smi dmon –f xxx
```

## 进程监控

> GPU进程统计信息以一行的滚动格式显示，此工具列出了GPU所有进程的统计信息。要监控的指标可以基于终端窗口的宽度进行调整。在Windows平台上有可能无法使用。
```bash
$ nvidia-smi pmon
# gpu         pid   type     sm    mem    enc    dec    jpg    ofa    command             
# Idx           #    C/G      %      %      %      %      %      %    name             
    0     945408     C      0      0      -      -      -
```

指定GPU：
```bash
$ nvidia-smi pmon –i xxx
```

指定刷新时间（默认为1秒，最大为10秒）：
```bash
$ nvidia-smi pmon –d xxx
```

显示指定数目的统计信息并退出：
```bash
$ nvidia-smi pmon –c xxx
```

指定显示哪些监控指标（默认为u）：
```bash 
$ nvidia-smi pmon –s xxx
```
**参数说明：**
- u：GPU使用率
- m：FB内存使用情况

将查询的信息输出到具体的文件中：

```bash
$ nvidia-smi pmon –f xxx
```