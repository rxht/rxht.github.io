# PDB

pdb是最常用的一种存储蛋白质结构的文本文件格式，但是pdb本身又是一个严格的结构化的文本文件，其对应位置的内容为：

|  列  |  数据  |  格式, 对齐  |说明
|  :-:  | :-:  |  :-:  | :-:  |
|  1-4  |  ATOM  |  字符, 左  |  Record Type 记录类型  |
|  7-11  |  serial  |  整数, 右  |  Atom serial number 原子序号.PDB文件对分子结构处理为segment, chain, residue, atom四个层次(一般并不用到chain), 因此此数位限定了一个残基中的最大原子数为为99999  |
|  13-16  |  name  |  字符, 左  |  Atom name 原子名称.原子的元素符号在13-14列中右对齐一般从14列开始写, 占四个字符的原子名称才会从13列开始写.如, 铁原子FE写在13-14列, 而碳原子C只写在14列.  |
|  17  |  altLoc  |  字符  |  Alternate location indicator 可替位置标示符  |
|  18-20  |  resName  |  字符  |  Residue name 残基名称  |
|  22  |  chainID  |  字符  |  Chain identifier 链标识符  |
|  23-26  |  resSeq  |  整数, 右  |  Residue sequence number 残基序列号  |
|  27  |  iCode  |  字符  |  Code for insertion of residues 残基插入码  |
|  28-30  |  留空  |    |    |
|  31-38  |  x  |  浮点, 右  |  Orthogonal coordinates for X in Angstroms 直角x坐标(埃)  |
|  39-46  |  y  |  浮点, 右  |  Orthogonal coordinates for Y in Angstroms 直角y坐标(埃)  |
|  47-54  |  z  |  浮点, 右  |  Orthogonal coordinates for Z in Angstroms 直角z坐标(埃)  |
|  55-60  |  occupancy  |  浮点, 右  |  Occupancy 占有率  |
|  61-66  |  tempFactor  |  浮点, 右  |  Temperature factor 温度因子  |
|  67-72  |  留空  |    |    |
|  73-76  |  segID  |  字符, 左  |  Segment identifier(optional) 可选的片段标识符，VMD会使用此数据  |
|  77-78  |  element  |  字符, 右  |  Element symbol 元素符号  |
|  79-80  |  charge  |  字符  |  Charge on the atom(optional) 可选的原子电荷，实际分子模拟中往往重新定义电荷，故此列往往不用， VMD写出的PDB文件中无此列.  |