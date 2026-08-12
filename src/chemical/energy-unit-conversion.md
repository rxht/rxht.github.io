---
Date: 2026-08-12 10:34:33
LastEditTime: 2026-08-12 10:43:41
description: 化学能量单位换算参考
tags: 
    - 化学
    - 能量单位换算
    - hartree
    - eV
    - kcal/mol
    - kJ/mol
    - javascript
    - python
---

# 化学能量单位换算参考

本文档整理了计算化学与物理化学中常用的能量单位换算关系，包括哈特里 (Hartree)、电子伏特 (eV)、千卡每摩尔 (kcal/mol) 和千焦每摩尔 (kJ/mol)。

## 1. 常用换算表

下表展示了以行为基准的换算关系：

| 原单位 | 哈特里 (Hartree/Eh) | 电子伏特 (eV) | 千卡/摩尔 (kcal/mol) | 千焦/摩尔 (kJ/mol) |
| :--- | :--- | :--- | :--- | :--- |
| **1 Hartree** | 1 | 27.211386 | 627.509 | 2625.5 |
| **1 eV** | 0.0367493 | 1 | 23.0605 | 96.485 |
| **1 kcal/mol** | 0.0015936 | 0.0433641 | 1 | 4.184 |
| **1 kJ/mol** | 0.0003800 | 0.0103643 | 0.2390 | 1 |

## 2. 核心换算系数

编程或手算时可直接调用以下关键常数：

*   **哈特里 → 电子伏特**：`1 Hartree ≈ 27.211386 eV`
*   **电子伏特 → 哈特里**：`1 eV ≈ 0.0367493 Hartree`
*   **kcal/mol → kJ/mol**：`1 kcal/mol = 4.184 kJ/mol` （定义值，精确）
*   **kJ/mol → kcal/mol**：`1 kJ/mol ≈ 0.2390 kcal/mol`

## 3. 代码实现示例

### 3.1 JavaScript / 前端计算

```javascript
// 能量单位换算常量
const ENERGY_CONSTANTS = {
  HARTREE_TO_EV: 27.211386,
  EV_TO_HARTREE: 0.0367493,
  KCAL_TO_KJ: 4.184,        // 精确定义值
  KJ_TO_KCAL: 1 / 4.184,    // 精确倒数
  HARTREE_TO_KJMOL: 2625.5,
  HARTREE_TO_KCALMOL: 627.509
};

/**
 * Hartree 转 kJ/mol
 * @param {number} energy - Hartree 单位的能量值
 * @returns {number} kJ/mol 单位的能量值
 */
function hartreeToKJmol(energy) {
  return energy * ENERGY_CONSTANTS.HARTREE_TO_KJMOL;
}

/**
 * eV 转 kcal/mol
 * @param {number} energy - eV 单位的能量值
 * @returns {number} kcal/mol 单位的能量值
 */
function evToKcalMol(energy) {
  return energy * 23.0605;
}

// 示例
console.log(`1 Hartree = ${hartreeToKJmol(1)} kJ/mol`);
console.log(`1 eV = ${evToKcalMol(1)} kcal/mol`);
```

### 3.2 Python / 科研脚本

```python
"""
量子化学能量单位换算工具
适用于 Gaussian、ORCA、VASP 等量化软件输出结果的后处理
"""

# CODATA 推荐常数（高精度）
HARTREE_TO_EV = 27.211386245988
EV_TO_HARTREE = 1 / HARTREE_TO_EV
HARTREE_TO_KJMOL = 2625.49962
HARTREE_TO_KCALMOL = 627.509474
KCAL_TO_KJ = 4.184           # 精确定义值
KJ_TO_KCAL = 1 / KCAL_TO_KJ

def hartree_to_kjmol(energy: float) -> float:
    """将 Hartree 转换为 kJ/mol"""
    return energy * HARTREE_TO_KJMOL

def hartree_to_kcalmol(energy: float) -> float:
    """将 Hartree 转换为 kcal/mol"""
    return energy * HARTREE_TO_KCALMOL

def ev_to_kjmol(energy: float) -> float:
    """将 eV 转换为 kJ/mol"""
    return energy * 96.485

def kjmol_to_kcalmol(energy: float) -> float:
    """将 kJ/mol 转换为 kcal/mol"""
    return energy * KJ_TO_KCAL

# 示例：转换 Gaussian 输出能量
scf_energy_hartree = -76.021
print(f"SCF Energy in kJ/mol: {hartree_to_kjmol(scf_energy_hartree):.2f}")
print(f"SCF Energy in kcal/mol: {hartree_to_kcalmol(scf_energy_hartree):.2f}")
```

### 3.3 通用换算函数（Python）

```python
def convert_energy(value: float, from_unit: str, to_unit: str) -> float:
    """
    通用能量单位换算函数
    
    参数:
        value: 待转换的数值
        from_unit: 原单位 ('Hartree', 'eV', 'kcal/mol', 'kJ/mol')
        to_unit: 目标单位 ('Hartree', 'eV', 'kcal/mol', 'kJ/mol')
    
    返回:
        转换后的数值
    """
    # 先统一转换到 Hartree
    to_hartree = {
        'Hartree': 1,
        'eV': 0.0367493,
        'kcal/mol': 0.0015936,
        'kJ/mol': 0.0003800
    }
    
    # 再从 Hartree 转换到目标单位
    from_hartree = {
        'Hartree': 1,
        'eV': 27.2114,
        'kcal/mol': 627.509,
        'kJ/mol': 2625.5
    }
    
    if from_unit not in to_hartree or to_unit not in from_hartree:
        raise ValueError(f"不支持的单位: {from_unit} 或 {to_unit}")
    
    value_in_hartree = value * to_hartree[from_unit]
    return value_in_hartree * from_hartree[to_unit]

# 使用示例
print(f"1 eV = {convert_energy(1, 'eV', 'kJ/mol'):.3f} kJ/mol")
print(f"1 kcal/mol = {convert_energy(1, 'kcal/mol', 'eV'):.4f} eV")
```

---

## 4. 常见应用场景

| 场景 | 常用单位 | 说明 |
| :--- | :--- | :--- |
| **量子化学计算** (Gaussian/ORCA) | Hartree | 软件默认输出单位 |
| **固体物理 / 能带计算** (VASP) | eV | 态密度、能带图常用 |
| **有机化学 / 反应热** | kcal/mol | 美国化学界习惯 |
| **物理化学 / 热力学** | kJ/mol | 国际单位制 (SI)，期刊标准 |
| **光谱学** | eV / cm⁻¹ | 激发能、电离能 |

---

## 5. 注意事项

1. **Hartree（哈特里）**：原子单位制中的能量单位，1 Hartree = 2 Rydberg = 27.2114 eV。
2. **有效数字**：表格中数值为方便查阅做了截断，高精度计算（如自由能校正）建议使用 CODATA 推荐值 `27.211386245988`。
3. **kcal/mol 的定义**：`1 cal = 4.184 J` 是精确定义值（热力学卡），不是近似值。
4. **温度换算**：若涉及 `k_B T`（热能量），室温 298.15 K 对应约 `0.592 kcal/mol` 或 `2.478 kJ/mol`。
5. **符号约定**：量化计算中总能量通常为**负值**（电子束缚态），比较能量高低时注意符号。

---

## 6. 快速速查口诀

> - **Hartree 最大**，1 Eh ≈ 27 eV ≈ 627 kcal/mol ≈ 2625 kJ/mol
> - **eV 居中**，1 eV ≈ 23 kcal/mol ≈ 96.5 kJ/mol
> - **kcal 与 kJ 差 4.184 倍**，kJ 更大
> - 从大到小：Hartree > eV > kcal/mol ≈ kJ/mol（同量级）

---
