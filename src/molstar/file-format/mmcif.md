---
Date: 2026-08-19 17:38:35
LastEditTime: 2026-08-19 17:52:02
Description: 介绍 MolStar 可直接读取的 mmCIF 文件格式：标题、原子坐标、键连信息及字段含义，附 1TQN 示例与读取顺序说明。
tags:
  - MolStar
  - mmcif
  - PDBx
---

# mmCIF

## 什么是 mmCIF？

**mmCIF**（macromolecular Crystallographic Information File）是一种基于文本的自描述数据格式，专为宏观分子结构数据设计。它由国际晶体学联合会（IUCr）在 1990 年代初期开发的 **CIF**（Crystallographic Information File）格式扩展而来。

### 核心特点一览

| 特性 | 传统 PDB | PDBx/mmCIF |
|---|---|---|
| 格式类型 | 固定列宽（80 列/行） | 自描述键值对 + 表格 |
| 原子数上限 | 99,999 | **无限制** |
| 链数上限 | 62 | **无限制** |
| 可扩展性 | 已冻结 | 持续演进 |
| 数据关系 | 隐式、靠位置推断 | 显式、带元数据约束 |
| 字符编码 | ASCII | ASCII |
| 特殊字符占位 | 空格填充 | `?`（缺失）/ `.`（不适用） |

### 名称辨析

- **CIF**：小分子晶体学信息文件（core CIF）
- **mmCIF**：扩展到宏观分子（蛋白质、核酸）的 CIF 字典
- **PDBx**：PDB 交换格式，mmCIF 字典的 PDB 适配层
- **PDBx/mmCIF**：wwPDB 使用的完整格式名称，当前版本为 **V5**

---

## 文件结构：四大核心概念

mmCIF 文件建立在 STAR（Self-defining Text Archive and Retrieval）语法之上，整个文件由以下四个层次构成：

```
数据块（Data Block）
├── 数据项（Data Item）— 键值对
├── 数据表格（Loop_）— 多行数据
└── 保存帧（Save Frame）— 仅用于字典定义
```

### 数据块（Data Block）

每个 mmCIF 文件由一个或多个 **数据块** 组成，以 `data_` 开头：

```cif
data_4HHB
```

- `data_` 后面的文本是数据块标识符（通常为 PDB ID）
- 一个数据块描述一个结构条目
- 数据块在遇到下一个 `data_` 或文件结束时终止
- 一个文件可包含多个数据块（多结构）

### 数据项（Data Item）

所有数据项以 **下划线 `_`** 开头，格式为 **`_类别名.属性名`**：

```cif
_cell.length_a    63.150
_cell.length_b    83.590
_cell.angle_alpha 90.00
_citation.year    1984
_entry.id         4HHB
```

- **类别名**（category）：如 `cell`、`citation`、`entry`
- **属性名**（attribute）：如 `length_a`、`year`、`id`
- 组合 `_category.attribute` 称为 **mmCIF token**
- 类别名和属性名 **不区分大小写**

### 键值对 vs 表格

mmCIF 提供两种数据呈现方式：

**键值对风格**（Key-Value）：每个数据项后紧跟一个值

```cif
_cell.entry_id   4HHB
_cell.length_a   63.150
_cell.length_b   83.590
_cell.length_c   53.800
_cell.angle_alpha 90.00
_cell.angle_beta  99.34
_cell.angle_gamma 90.00
_cell.Z_PDB       4
```

**表格风格**（Tabular / Loop）：使用 `loop_` 指令定义多行数据表

```cif
loop_
_atom_site.group_PDB
_atom_site.id
_atom_site.type_symbol
_atom_site.label_atom_id
_atom_site.label_comp_id
_atom_site.label_asym_id
_atom_site.label_seq_id
_atom_site.Cartn_x
_atom_site.Cartn_y
_atom_site.Cartn_z
_atom_site.occupancy
_atom_site.B_iso_or_equiv
ATOM 1 N  N  VAL A 1 6.204  16.869 4.854 1.00 49.05
ATOM 2 C  CA VAL A 1 6.913  17.759 4.607 1.00 43.14
ATOM 3 C  C  VAL A 1 8.504  17.378 4.797 1.00 24.80
ATOM 4 O  O  VAL A 1 8.805  17.011 5.943 1.00 37.68
```

`loop_` 后面的数据项名对应表格的 **列**，后续每行数据对应一条 **记录**。

### 注释与特殊字符

| 符号 | 用途 | 示例 |
|---|---|---|
| `#` | 注释行 / 分类分隔符 | `# cell parameters` |
| `?` | 值缺失（unknown） | `_entity_src_gen.pdbx_host_org_tissue ?` |
| `.` | 值不适用（not applicable） | `_struct_ref.biol_id .` |
| `'...'` | 单引号包裹含空格的字符串 | `'Fermi, G.'` |
| `"..."` | 双引号包裹含空格的字符串 | `"Pantoate-activating enzyme"` |
| `;...;` | 分号包裹多行文本 | 见下方示例 |

**多行文本**用首尾分号（必须位于行首）包裹：

```cif
_entity_poly.pdbx_seq_one_letter_code
;VLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSH
GSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKL
LSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR
;
```

---

## 数据类型系统

mmCIF 字典定义了丰富的数据类型，确保数据的规范性和机器可验证性：

| 类型代码 | 原始类型 | 说明 | 示例 |
|---|---|---|---|
| `code` | char | 单字代码（区分大小写） | `primary` |
| `ucode` | uchar | 单字代码（不区分大小写） | `HEM` |
| `int` | numb | 整数 | `-42`、`2024` |
| `float` | numb | 浮点数 | `63.150`、`1.5e-3` |
| `line` | char | 单行文本 | `X-PLOR 3.1` |
| `text` | char | 多行文本 | 序列、备注 |
| `name` | uchar | mmCIF 名称格式 | `_atom_site.id` |
| `idname` | uchar | 标识符名称 | `citation_author` |
| `any` | char | 任意值 | 通配类型 |
| `yyyy-mm-dd` | char | 标准日期格式 | `2024-06-15` |
| `uchar3` | uchar | 3 字符代码 | `HEM` |
| `symop` | char | 对称操作 | `1_555`、`4_657` |

---

## 核心数据类别详解

一个完整的 mmCIF 文件包含数十个数据类别（category），下面按功能分组介绍最重要的部分。

### 文件头与审计信息

```cif
data_4HHB

_audit_conform.dict_name    mmcif_pdbx.dic
_audit_conform.dict_version 5.367
_audit_conform.dict_location http://mmcif.pdb.org/dictionaries/ascii/mmcif_pdbx.dic

_entry.id 4HHB
```

| 数据项 | 含义 |
|---|---|
| `_audit_conform.dict_name` | 使用的字典名称 |
| `_audit_conform.dict_version` | 字典版本号 |
| `_entry.id` | 结构条目标识符 |

### 实验信息（EXPTL）

```cif
loop_
_exptl.entry_id
_exptl.method
_exptl.crystals_number
4HHB X-RAY DIFFRACTION ?
```

常见实验方法值：`X-RAY DIFFRACTION`、`SOLUTION NMR`、`ELECTRON MICROSCOPY`、`NEUTRON DIFFRACTION`、`SOLUTION SCATTERING`。

### 晶体学参数（CELL & SYMMETRY）

```cif
_cell.entry_id    4HHB
_cell.length_a    63.150
_cell.length_b    83.590
_cell.length_c    53.800
_cell.angle_alpha 90.00
_cell.angle_beta  99.34
_cell.angle_gamma 90.00
_cell.Z_PDB       4

_symmetry.space_group_name_H-M   'C 1 2 1'
_symmetry.Int_Tables_number      5
```

| 数据项 | 含义 |
|---|---|
| `_cell.length_a/b/c` | 晶胞边长（Å） |
| `_cell.angle_alpha/beta/gamma` | 晶胞夹角（°） |
| `_cell.Z_PDB` | 不对称单元中的分子数 |
| `_symmetry.space_group_name_H-M` | 空间群（Hermann-Mauguin 符号） |
| `_symmetry.Int_Tables_number` | 国际表编号 |

### 实体定义（ENTITY）

**实体（Entity）** 是 mmCIF 中一个极其重要的概念——它代表结构中 **化学上独立** 的分子种类。同一实体的多个拷贝（如血红蛋白的两条 α 链）只定义一个实体。

```cif
loop_
_entity.id
_entity.type
_entity.src_method
_entity.pdbx_description
_entity.formula_weight
_entity.pdbx_number_of_molecules
1 polymer     man 'HEMOGLOBIN (DEOXY) (ALPHA CHAIN)' 15150.353 2
2 polymer     man 'HEMOGLOBIN (DEOXY) (BETA CHAIN)'  15890.198 2
3 non-polymer syn 'PROTOPORPHYRIN IX CONTAINING FE'   616.487 4
4 non-polymer syn 'PHOSPHATE ION'                       94.971 2
5 water       nat water                                  18.015 221
```

实体类型包括：`polymer`（聚合物）、`non-polymer`（非聚合物/配体）、`water`（水）。

### 聚合物序列（ENTITY_POLY & ENTITY_POLY_SEQ）

```cif
_entity_poly.entity_id        1
_entity_poly.type             'polypeptide(L)'
_entity_poly.nstd_linkage     no
_entity_poly.nstd_monomer     no

loop_
_entity_poly_seq.entity_id
_entity_poly_seq.num
_entity_poly_seq.mon_id
_entity_poly_seq.hetero
1 1 ALA n
1 2 MET n
1 3 ALA n
1 4 ILE n
1 5 PRO n
# ... 省略后续残基
```

### 化学组分字典（CHEM_COMP）

每个氨基酸、核苷酸、配体都有详细的化学定义：

```cif
_chem_comp.id          HEM
_chem_comp.name        "PROTOPORPHYRIN IX CONTAINING FE"
_chem_comp.type        NON-POLYMER
_chem_comp.formula     "C34 H32 Fe N4 O4"
_chem_comp.formula_weight 616.487
_chem_comp.three_letter_code HEM
_chem_comp.pdbx_formal_charge 0
```

### 原子坐标（ATOM_SITE）—— 文件的核心

`_atom_site` 类别通常是 mmCIF 文件中 **最大** 的部分，存储每个原子的完整信息：

```cif
loop_
_atom_site.group_PDB
_atom_site.id
_atom_site.type_symbol
_atom_site.label_atom_id
_atom_site.label_alt_id
_atom_site.label_comp_id
_atom_site.label_asym_id
_atom_site.label_entity_id
_atom_site.label_seq_id
_atom_site.pdbx_PDB_ins_code
_atom_site.Cartn_x
_atom_site.Cartn_y
_atom_site.Cartn_z
_atom_site.occupancy
_atom_site.B_iso_or_equiv
_atom_site.pdbx_formal_charge
_atom_site.auth_seq_id
_atom_site.auth_comp_id
_atom_site.auth_asym_id
_atom_site.auth_atom_id
_atom_site.pdbx_PDB_model_num
ATOM 1 N  N . VAL A 1 1 ? 6.204  16.869 4.854 1.00 49.05 ? 1 VAL A N 1
ATOM 2 C  CA . VAL A 1 1 ? 6.913  17.759 4.607 1.00 43.14 ? 1 VAL A CA 1
ATOM 3 C  C  . VAL A 1 1 ? 8.504  17.378 4.797 1.00 24.80 ? 1 VAL A C 1
```

**关键字段对照表**（mmCIF ↔ PDB 概念）：

| mmCIF 字段 | PDB 对应 | 含义 |
|---|---|---|
| `_atom_site.group_PDB` | ATOM/HETATM | 记录类型 |
| `_atom_site.id` | serial | 原子编号 |
| `_atom_site.type_symbol` | element | 元素符号 |
| `_atom_site.label_atom_id` | atom name | 原子名 |
| `_atom_site.label_comp_id` | resName | 残基名（3字母） |
| `_atom_site.label_asym_id` | chainID | 链/不对称单元 ID |
| `_atom_site.label_seq_id` | resSeq | 残基序号 |
| `_atom_site.Cartn_x/y/z` | x/y/z | 笛卡尔坐标（Å） |
| `_atom_site.occupancy` | occupancy | 占有率 |
| `_atom_site.B_iso_or_equiv` | B-factor | 各向同性温度因子 |
| `_atom_site.pdbx_PDB_model_num` | model | 模型编号 |

#### `label_*` vs `auth_*` 的区别

这是 mmCIF 新手最容易困惑的地方：

| 前缀 | 含义 | 示例 |
|---|---|---|
| `label_*` | wwPDB 规范化后的标识 | `label_asym_id A` |
| `auth_*` | 作者提交时的原始标识 | `auth_asym_id H` |

例如，数据库内部将链标记为 `A`，但作者原始链名可能是 `H`。两套标识并存，确保数据溯源完整性。

### 各向异性温度因子（ATOM_SITE_ANISOTROP）

对于需要各向异性 B 因子精修的原子：

```cif
loop_
_atom_site_anisotrop.id
_atom_site_anisotrop.U[1][1]
_atom_site_anisotrop.U[1][2]
_atom_site_anisotrop.U[1][3]
_atom_site_anisotrop.U[2][2]
_atom_site_anisotrop.U[2][3]
_atom_site_anisotrop.U[3][3]
1 0.0123 0.0015 0.0008 0.0156 0.0021 0.0189
```

### 二级结构（STRUCT_CONF & STRUCT_SHEET_RANGE）

```cif
loop_
_struct_conf.id
_struct_conf.conf_type_id
_struct_conf.beg_label_asym_id
_struct_conf.beg_label_seq_id
_struct_conf.end_label_asym_id
_struct_conf.end_label_seq_id
HELX_P1 HELX_R_A  A 5   A 18
HELX_P2 HELX_R_B  A 20  A 35
```

### 结构连接（STRUCT_CONN）

描述链间/链内二硫键、盐桥、氢键等：

```cif
loop_
_struct_conn.id
_struct_conn.conn_type_id
_struct_conn.ptnr1_label_asym_id
_struct_conn.ptnr1_label_comp_id
_struct_conn.ptnr1_label_seq_id
_struct_conn.ptnr1_label_atom_id
_struct_conn.ptnr2_label_asym_id
_struct_conn.ptnr2_label_comp_id
_struct_conn.ptnr2_label_seq_id
_struct_conn.ptnr2_label_atom_id
_struct_conn.pdbx_dist_value
disu1 disulf A CYS 104  SG  A CYS 117  SG  2.05
```

### 精修统计（REFINE）

```cif
_refine.entry_id             4HHB
_refine.ls_d_res_high        1.74
_refine.ls_d_res_low         10.00
_refine.ls_R_factor_R_work   0.171
_refine.ls_R_factor_R_free   0.211
_refine.B_iso_mean           18.5
_refine.pdbx_ls_cross_valid_method 'THROUGHOUT'
```

### 引用文献（CITATION & CITATION_AUTHOR）

```cif
loop_
_citation.id
_citation.title
_citation.journal_abbrev
_citation.journal_volume
_citation.page_first
_citation.page_last
_citation.year
_citation.journal_id_ISSN
_citation.pdbx_database_id_PubMed
_citation.pdbx_database_id_DOI
primary 'Structure of haemoglobin' 'J. Mol. Biol.' 155 395 408 1982 ? 12345678 10.1016/...

loop_
_citation_author.citation_id
_citation_author.name
_citation_author.ordinal
primary 'Fermi, G.'     1
primary 'Perutz, M.F.'  2
```

---

## PDB → mmCIF 数据项映射

下表列出常见 PDB 记录到 mmCIF 数据项的对应关系：

| PDB 记录 | mmCIF 数据项 |
|---|---|
| `HEADER` 分类 | `_struct_keywords.pdbx_keywords` |
| `HEADER` PDB ID | `_entry.id` |
| `TITLE` | `_struct.title` |
| `EXPDTA` | `_exptl.method` |
| `AUTHOR` | `_audit_author.name` |
| `KEYWDS` | `_struct_keywords.text` |
| `CRYST1` | `_cell.*` + `_symmetry.*` |
| `ATOM/HETATM` | `_atom_site.*` |
| `ANISOU` | `_atom_site_anisotrop.*` |
| `HELIX` | `_struct_conf`（类型为 HELX） |
| `SHEET` | `_struct_sheet_range` |
| `SSBOND` | `_struct_conn`（类型为 disulf） |
| `LINK` | `_struct_conn`（类型为 covale） |
| `SEQRES` | `_entity_poly_seq.*` |
| `MODRES` | `_pdbx_struct_mod_residue.*` |
| `HETNAM` | `_chem_comp.name` |
| `FORMUL` | `_chem_comp.formula` |
| `REMARK 3` (R值等) | `_refine.*` |
| `REMARK 200` (衍射数据) | `_diffrn.*` + `_reflns.*` |
| `REMARK 280` (结晶条件) | `_exptl_crystal_grow.*` |
| `REVDAT` | `_database_PDB_rev.*` |
| `JRNL` | `_citation.*` + `_citation_author.*` |
| `CONECT` | （mmCIF 中通常不需要，由坐标推导） |

---

## PDB ID 的演进：从 4 字符到 12 字符

由于 4 字符 PDB ID（如 `1ABC`）的空间即将耗尽，wwPDB 引入了扩展 ID 格式：

- **过渡期格式**：`pdb_00009o0b`（前缀 `pdb_` + 8 位字母数字），同时保留 4 字符 ID
- **最终格式**：`pdb_10001b5f`（纯 12 字符，不再有 4 字符对应）
- **切换时间**：**2027 年 7 月 21 日**起，wwPDB 将只发放扩展 ID
- **格式影响**：仅分配扩展 ID 的结构 **只以 mmCIF 和 PDBML（XML）格式分发**，不再有 PDB 格式

mmCIF 文件中的 ID 表示：

```cif
loop_
_database_2.database_id
_database_2.database_code
_database_2.pdbx_database_accession
_database_2.pdbx_DOI
PDB    pdb_00009o0b  10.2210/pdb9o0b/pdb  WWPDB D_1000294107
```


## 字典与元数据系统（DDL2）

mmCIF 的强大之处在于它的 **自描述性**——所有数据项的行为由 **字典**（Dictionary）定义。字典使用 DDL2（Dictionary Definition Language 2）编写。

### 字典的核心功能

- **数据类型约束**：每个数据项声明其类型（int、float、code 等）
- **取值范围**：可定义最小值/最大值
- **受控词表**：枚举类型的值必须从中选择
- **父子关系**：定义跨类别的数据引用（类似外键）
- **必填/可选**：标记数据项是否必须出现

### 保存帧（Save Frame）

字典中的定义用 `save_` 帧封装：

```cif
save_CITATION
_category.description
;Data items in the CITATION category record details about the literature
 cited relevant to the contents of the data block.
;
_category.id        citation
_category.mandatory_code no

save__citation.id
_item_description.description
;The value of _citation.id must uniquely identify a record in the CITATION list.
;
loop_
_item.name
_item.category_id
_item.mandatory_code
'_citation.id'          citation yes
'_citation_author.citation_id' citation_author yes
'_citation_editor.citation_id' citation_editor yes
'_software.citation_id'        software       yes
_item_type.code code
save_
```

> **注意**：`save_` 帧只出现在字典文件中，数据文件不使用。


## 完整 mmCIF 文件结构示例

下面是一个极度简化的 mmCIF 文件骨架，展示各部分的组织顺序：

```cif
#==============================================================
data_4HHB
#==============================================================

# --- 审计与字典 conformance ---
_audit_conform.dict_name    mmcif_pdbx.dic
_audit_conform.dict_version 5.367
_entry.id                   4HHB

# --- 结构标题 ---
_struct.title 'THE STEREOCHEMISTRY OF HEMOGLOBIN'
_struct_keywords.pdbx_keywords 'OXYGEN TRANSPORT'
_struct_keywords.text         'HEMOGLOBIN, OXYGEN TRANSPORT'

# --- 实验方法 ---
loop_
_exptl.entry_id
_exptl.method
_exptl.crystals_number
4HHB X-RAY DIFFRACTION ?

# --- 晶胞参数 ---
_cell.entry_id    4HHB
_cell.length_a    63.150
_cell.length_b    83.590
_cell.length_c    53.800
_cell.angle_alpha 90.00
_cell.angle_beta  99.34
_cell.angle_gamma 90.00
_cell.Z_PDB       4

# --- 空间群 ---
_symmetry.space_group_name_H-M 'C 1 2 1'
_symmetry.Int_Tables_number     5

# --- 实体定义 ---
loop_
_entity.id
_entity.type
_entity.src_method
_entity.pdbx_description
_entity.formula_weight
1 polymer man 'HEMOGLOBIN (ALPHA CHAIN)' 15150.353
2 polymer man 'HEMOGLOBIN (BETA CHAIN)'  15890.198

# --- 化学组分 ---
_chem_comp.id      HEM
_chem_comp.name    "PROTOPORPHYRIN IX CONTAINING FE"
_chem_comp.formula "C34 H32 Fe N4 O4"

# --- 作者 ---
loop_
_audit_author.name
_audit_author.pdbx_ordinal
'Fermi, G.'     1
'Perutz, M.F.'  2

# --- 原子坐标（最庞大的部分）---
loop_
_atom_site.group_PDB
_atom_site.id
_atom_site.type_symbol
_atom_site.label_atom_id
_atom_site.label_comp_id
_atom_site.label_asym_id
_atom_site.label_seq_id
_atom_site.Cartn_x
_atom_site.Cartn_y
_atom_site.Cartn_z
_atom_site.occupancy
_atom_site.B_iso_or_equiv
ATOM 1 N  N VAL A 1 6.204  16.869 4.854 1.00 49.05
ATOM 2 C  CA VAL A 1 6.913  17.759 4.607 1.00 43.14
# ... 数千行原子记录 ...

# --- 精修信息 ---
_refine.ls_R_factor_R_work 0.171
_refine.ls_R_factor_R_free 0.211
```


## 常见陷阱与最佳实践

### 注意事项

1. **不要假设字段顺序**：mmCIF 是声明式的，字段顺序不固定，解析时应按名称查找
2. **注意 `?` 和 `.` 的区别**：`?` 表示"缺失/未知"，`.` 表示"不适用/有意省略"，两者语义不同
3. **引号规则**：含空格的值必须加引号；多行值必须用分号包裹
4. **label vs auth**：分析链/残基编号时，确认你用的是哪套标识
5. **loop_ 不可嵌套**：mmCIF 只允许一层 loop，复杂关系用父子引用表达

### 文件大小优化建议

对于包含数十万原子的大结构（如核糖体、病毒衣壳），wwPDB 推荐：

1. 将 `_audit_syntax` 信息放在文件靠前位置
2. 使用固定宽度列格式（wwPDB 标准做法）
3. 先定义被引用的数据（如 `_entity` 在 `_entity_poly_seq` 之前）
4. 推荐数据排列顺序：`chem_comp` → `chem_comp_bond` → `entity_poly_seq` → `atom_site` → `atom_site_anisotrop` → `struct_conn` → `struct_conf` → `struct_sheet_range`



## 参考资源

- **官方文档**：[mmCIF Home](https://mmcif.wwpdb.org/)
- **PDBx/mmCIF 字典（V5）**：https://mmcif.wwpdb.org/dictionaries/mmcif_pdbx_v50.dic/Index
- **入门指南**：[Beginner's Guide to PDBx/mmCIF](https://pdb101-west.rcsb.org/learn/guide-to-understanding-pdb-data/beginner's-guide-to-pdbx-mmcif)
- **用户指南**：https://mmcif.pdb.org/docs/user-guide/guide.html
- **FAQ**：https://mmcif.wwpdb.org/docs/faqs/pdbx-mmcif-faq-format.html
- **PDB ↔ mmCIF 映射表**：https://mmcif.wwpdb.org/docs/pdb_to_pdbx_correspondences.html
- **Biopython 文档**：https://biopython.org/docs/dev/Tutorial/chapter_pdb.html
- **Gemmi（高性能 CIF 解析库）**：https://gemmi.readthedocs.io/
- **IUCr CIF 规范**：https://it.iucr.org/
