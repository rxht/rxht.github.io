---
Date: 2026-08-19 14:49:22
LastEditTime: 2026-08-19 14:59:03
description: 介绍 xml 文件格式：原子坐标、二级结构、实验信息等字段含义，附 1TQN 示例与读取顺序说明。
tags:
  - MolStar
  - xml
  - pdbml
---

# XML

**PDBML**（PDB Markup Language）是蛋白质数据库（PDB）官方推出的 **XML 标准化表示格式**，旨在让结构生物学数据更易于程序解析、数据交换和长期归档。如果你厌倦了手写 PDB 解析器，或希望在 Web 服务、数据库中高效处理结构数据，PDBML 是一个值得掌握的工具。


PDBML（PDB Markup Language）是 **PDB 条目的 XML 标准化表示**，由 **wwPDB（Worldwide PDB）** 联盟维护。它将传统 PDB 格式中的原子坐标、二级结构、实验信息等内容，统一封装为结构化的 XML 文档。

PDBML 基于 **XML Schema（XSD）** 定义，遵循 **PDBx/mmCIF 字典** 的数据命名规范，确保与 PDB 主格式的数据一致性。


## PDBML 的核心结构

一个典型的 PDBML 文件由以下主要模块组成：

```xml
<PDBx:datablock>
  <PDBx:atom_siteCategory>    <!-- 原子坐标 -->
  <PDBx:entityCategory>        <!-- 分子实体 -->
  <PDBx:structCategory>        <!-- 结构摘要 -->
  <PDBx:exptlCategory>         <!-- 实验方法 -->
  <PDBx:refineCategory>        <!-- 精修信息 -->
  <PDBx:struct_confCategory>   <!-- 二级结构 -->
</PDBx:datablock>
```

### 1. 原子坐标（atom_site）

原子坐标是 PDBML 文件中最核心的部分，记录了每个原子的三维坐标、元素类型、B 因子等信息。

```xml
<atom_site id="1">
  <Cartn_x>12.345</Cartn_x>
  <Cartn_y>23.456</Cartn_y>
  <Cartn_z>34.567</Cartn_z>
  <label_atom_id>CA</label_atom_id>
  <label_comp_id>ALA</label_comp_id>
  <label_asym_id>A</label_asym_id>
  <label_seq_id>10</label_seq_id>
  <B_iso_or_equiv>15.23</B_iso_or_equiv>
  <occupancy>1.00</occupancy>
  <type_symbol>C</type_symbol>
</atom_site>
```

**关键字段说明：**

| 字段               | 含义                           |
| ------------------ | ------------------------------ |
| `Cartn_x/y/z`      | 原子的笛卡尔坐标（Å）           |
| `label_atom_id`     | 原子名称（如 CA、N、O）         |
| `label_comp_id`     | 残基名称（如 ALA、GLY）         |
| `label_asym_id`     | 链标识符                        |
| `label_seq_id`      | 残基序列号                      |
| `B_iso_or_equiv`    | B 因子（温度因子）              |
| `occupancy`         | 占位率                          |
| `type_symbol`       | 元素符号                        |

### 2. 二级结构注释（struct_conf）

```xml
<struct_conf>
  <conf_type_id>HELX_P</conf_type_id>
  <beg_auth_seq_id>10</beg_auth_seq_id>
  <end_auth_seq_id>25</end_auth_seq_id>
  <beg_auth_asym_id>A</beg_auth_asym_id>
  <end_auth_asym_id>A</end_auth_asym_id>
</struct_conf>
```

**常见二级结构类型：**

| 类型 ID      | 含义         |
| ------------ | ------------ |
| `HELX_P`     | 螺旋（α-helix）|
| `HELX_3`     | 3-10 螺旋    |
| `HELX_5`     | π-螺旋       |
| `STRN`       | β-折叠       |
| `TURN`       | 转角         |

### 3. 实验信息（exptl）

```xml
<exptl>
  <method>X-RAY DIFFRACTION</method>
  <resolution>1.80</resolution>
  <R_free>0.195</R_free>
  <R_work>0.174</R_work>
</exptl>
```

**支持的实验方法：**

- `X-RAY DIFFRACTION` — X 射线衍射
- `SOLUTION NMR` — 核磁共振
- `ELECTRON MICROSCOPY` — 电子显微镜
- `NEUTRON DIFFRACTION` — 中子衍射
- `SOLUTION SCATTERING` — 溶液散射

### 4. 分子实体（entity）

```xml
<entity>
  <id>1</id>
  <type>polymer</type>
  <src_method>man</src_method>
  <pdbx_description>TIM barrel protein</pdbx_description>
  <formula_weight>28456.78</formula_weight>
</entity>
```

### 5. 精修信息（refine）

```xml
<refine>
  <resolution>1.80</resolution>
  <R_free>0.195</R_free>
  <R_work>0R_work>0.174</R_work>
  <mean_B_iso>18.5</mean_B_iso>
  <pdbx_refine_id>refine_1</pdbx_refine_id>
</refine>
```



## 完整示例文件结构

以下是一个简化的 PDBML 文件骨架，展示整体文档结构：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<PDBx:datablock xmlns:PDBx="http://pdbml.pdb.org/schema/pdbx-v50.xsd"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://pdbml.pdb.org/schema/pdbx-v50.xsd pdbx-v50.xsd">
  
  <!-- 数据库标识 -->
  <PDBx:database_2Category>
    <PDBx:database_2>
      <PDBx:database_id>PDB</PDBx:database_id>
      <PDBx:database_code>1TIM</PDBx:database_code>
    </PDBx:database_2>
  </PDBx:database_2Category>

  <!-- 实验方法 -->
  <PDBx:exptlCategory>
    <PDBx:exptl>
      <PDBx:method>X-RAY DIFFRACTION</PDBx:method>
      <PDBx:resolution>1.80</PDBx:resolution>
    </PDBx:exptl>
  </PDBx:exptlCategory>

  <!-- 分子实体 -->
  <PDBx:entityCategory>
    <PDBx:entity>
      <PDBx:id>1</PDBx:id>
      <PDBx:type>polymer</PDBx:type>
      <PDBx:pdbx_description>Triosephosphate isomerase</PDBx:pdbx_description>
    </PDBx:entity>
  </PDBx:entityCategory>

  <!-- 原子坐标 -->
  <PDBx:atom_siteCategory>
    <PDBx:atom_site id="1">
      <PDBx:Cartn_x>12.345</PDBx:Cartn_x>
      <PDBx:Cartn_y>23.456</PDBx:Cartn_y>
      <PDBx:Cartn_z>34.567</PDBx:Cartn_z>
      <PDBx:label_atom_id>CA</PDBx:label_atom_id>
      <PDBx:label_comp_id>ALA</PDBx:label_comp_id>
      <PDBx:label_asym_id>A</PDBx:label_asym_id>
      <PDBx:label_seq_id>10</PDBx:label_seq_id>
      <PDBx:B_iso_or_equiv>15.23</PDBx:B_iso_or_equiv>
      <PDBx:occupancy>1.00</PDBx:occupancy>
      <PDBx:type_symbol>C</PDBx:type_symbol>
    </PDBx:atom_site>
    <!-- ... 更多原子 ... -->
  </PDBx:atom_siteCategory>

  <!-- 二级结构 -->
  <PDBx:struct_confCategory>
    <PDBx:struct_conf>
      <PDBx:conf_type_id>HELX_P</PDBx:conf_type_id>
      <PDBx:beg_auth_seq_id>10</PDBx:beg_auth_seq_id>
      <PDBx:end_auth_seq_id>25</PDBx:end_auth_seq_id>
    </PDBx:struct_conf>
  </PDBx:struct_confCategory>

  <!-- 精修信息 -->
  <PDBx:refineCategory>
    <PDBx:refine>
      <PDBx:resolution>1.80</PDBx:resolution>
      <PDBx:R_free>0.195</PDBx:R_free>
      <PDBx:R_work>0.174</PDBx:R_work>
    </PDBx:refine>
  </PDBx:refineCategory>

</PDBx:datablock>
```