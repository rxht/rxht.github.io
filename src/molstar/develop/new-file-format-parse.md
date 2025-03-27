---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 21:58:53
---
# 新增所支持的解析格式

## 文件加载
```typescript
async function processData(info: FileNameInfo, data: StateObjectSelector, plugin: PluginContext, format: string, visuals: boolean) {
    const provider = format === 'auto'
        ? plugin.dataFormats.auto(info, data.cell?.obj!)
        : plugin.dataFormats.get(format);

    if (!provider) {
        plugin.log.warn(`could not find data provider for '${info.ext}'`);
        await plugin.state.data.build().delete(data).commit();
        return;
    }

    // 只要文件解析提供者在registry.ts进行注册后，使用这个方法就可以直接获取对应的解析方法了
    const parsed = await provider.parse(plugin, data);
    if (visuals) {
        await provider.visuals?.(plugin, parsed);
    }
}

/**
 * @function 加载文件进行加载
 * @param file 文件内容
 * @param plugin
 * @param format 解析格式
 * @param visuals 是否显示
 * @returns
 */
export async function processFile(file: Asset.File, plugin: PluginContext, format: string, visuals: boolean) {
    const info = getFileNameInfo(file.file?.name ?? '');
    const isBinary = plugin.dataFormats.binaryExtensions.has(info.ext);
    const { data } = await plugin.builders.data.readFile({ file, isBinary });
    await processData(info, data, plugin, format, visuals);
};

```


## 文本格式/二进制格式文件

### 将文本文件解析成格式文件对象
文件位置：src\mol-io\reader\xyz\parser.ts

这个文件主要是定义对应格式的文件对象，还有对应的解析过程，需要重点看一下Tokenizer是如何进行解析文件的。

注意⚠️：一个文件中可能存在多个Model，需要视情况而定。

```typescript
export interface XyzFile {
    readonly molecules: {
        readonly comment: string,
        readonly count: number,
        readonly x: Column<number>,
        readonly y: Column<number>,
        readonly z: Column<number>,
        readonly type_symbol: Column<string>
    }[],
}

function handleMolecule(tokenizer: Tokenizer): XyzFile['molecules'][number] {
    let count = tokenizer.position >= tokenizer.data.length - 1 ? 0 : +Tokenizer.readLine(tokenizer);
    if (isNaN(count)) count = 0;

    const comment = Tokenizer.readLine(tokenizer);

    const x = new Float64Array(count);
    const y = new Float64Array(count);
    const z = new Float64Array(count);
    const type_symbol = new Array<string>(count);

    for (let i = 0; i < count; ++i) {
        const line = Tokenizer.readLineTrim(tokenizer);
        const fields = line.split(/\s+/g);
        type_symbol[i] = fields[0];
        x[i] = +fields[1];
        y[i] = +fields[2];
        z[i] = +fields[3];
    }

    return {
        count,
        comment,
        x: Column.ofFloatArray(x),
        y: Column.ofFloatArray(y),
        z: Column.ofFloatArray(z),
        type_symbol: Column.ofStringArray(type_symbol)
    };
}

/**
 * @function 解析普通的xyz文件
 * @param data
 * @returns
 */
export function parseXyz(data: string) {
    return Task.create<Result<XyzFile>>('Parse Mol', async () => {
        const tokenizer = Tokenizer(data);

        const molecules: XyzFile['molecules'] = [];
        while (true) {
            const mol = handleMolecule(tokenizer);
            if (mol.count === 0) break;
            molecules.push(mol);
        }

        const result: XyzFile = { molecules };
        return Result.success(result);
    });
}
```


### 格式文件对象转Trajectory

文件位置：src\mol-model-formats\structure\xyz.ts

将上一步所解析的格式文件对象转换为Trajectory
```typescript
export function trajectoryFromXyz(mol: XyzFile): Task<Trajectory> {
    return Task.create('Parse XYZ', ctx => {
        const { molecules } = mol;

        let count = 0;
        for (const m of molecules) count += m.count;

        const type_symbols = new Array<string>(count);
        const id = new Int32Array(count);
        const x = new Float32Array(count);
        const y = new Float32Array(count);
        const z = new Float32Array(count);
        const model_num = new Int32Array(count);

        let offset = 0;
        for (let i = 0; i < molecules.length; i++) {
            const m = molecules[i];
            for (let j = 0; j < m.count; j++) {
                type_symbols[offset] = m.type_symbol.value(j);
                x[offset] = m.x.value(j);
                y[offset] = m.y.value(j);
                z[offset] = m.z.value(j);
                id[offset] = j;
                model_num[offset] = i;
                offset++;
            }
        }

        const MOL = Column.ofConst('MOL', count, Column.Schema.str);
        const A = Column.ofConst('A', count, Column.Schema.str);
        const seq_id = Column.ofConst(1, count, Column.Schema.int);

        const type_symbol = Column.ofStringArray(type_symbols);

        const atom_site = Table.ofPartialColumns(BasicSchema.atom_site, {
            auth_asym_id: A,
            auth_atom_id: type_symbol,
            auth_comp_id: MOL,
            auth_seq_id: seq_id,
            Cartn_x: Column.ofFloatArray(x),
            Cartn_y: Column.ofFloatArray(y),
            Cartn_z: Column.ofFloatArray(z),
            id: Column.ofIntArray(id),

            label_asym_id: A,
            label_atom_id: type_symbol,
            label_comp_id: MOL,
            label_seq_id: seq_id,
            label_entity_id: Column.ofConst('1', count, Column.Schema.str),

            occupancy: Column.ofConst(1, count, Column.Schema.float),
            type_symbol,

            pdbx_PDB_model_num: Column.ofIntArray(model_num),
        }, count);

        const entityBuilder = new EntityBuilder();
        entityBuilder.setNames([['MOL', 'Unknown Entity']]);
        entityBuilder.getEntityId('MOL', MoleculeType.Unknown, 'A');

        const componentBuilder = new ComponentBuilder(seq_id, type_symbol);
        componentBuilder.setNames([['MOL', 'Unknown Molecule']]);
        componentBuilder.add('MOL', 0);

        const basic = createBasic({
            entity: entityBuilder.getEntityTable(),
            chem_comp: componentBuilder.getChemCompTable(),
            atom_site
        });

        return createModels(basic, XyzFormat.create(mol), ctx);
    });
}
```


### 文件解析转换器（Transform）
> 说明： 用于文件从文本文件到最终的Trajectory转换，Transform也是MolStar进行数据转换的一个核心。

文件位置：src\mol-plugin-state\transforms\model.ts
```typescript
/**
 * @function 生成Model的描述和名称
 */
function trajectoryProps(trajectory: Trajectory) {
    const first = trajectory.representative;
    if (!first) return { label: 'Trajectory', description: 'Empty trajectory' };
    return { label: `${first.entry}`, description: `${trajectory.frameCount} model${trajectory.frameCount === 1 ? '' : 's'}` };
}

export { TrajectoryFromXYZ };
type TrajectoryFromXYZ = typeof TrajectoryFromXYZ
const TrajectoryFromXYZ = PluginStateTransform.BuiltIn({
    name: 'trajectory-from-xyz',
    display: { name: 'Parse XYZ', description: 'Parse XYZ string and create trajectory.' },
    from: [SO.Data.String], // 解析二进制文件此处应为 from: [SO.Data.Binary],
    to: SO.Molecule.Trajectory
})({
    apply({ a }) {
        return Task.create('Parse XYZ', async ctx => {
            const parsed = await parseXyz(a.data).runInContext(ctx);
            if (parsed.isError) throw new Error(parsed.message);
            const models = await trajectoryFromXyz(parsed.result).runInContext(ctx);
            const props = trajectoryProps(models);
            return new SO.Molecule.Trajectory(models, props);
        });
    }
});

```

### 定义格式解析提供者

```typescript
/**
 * @function 应用转换器进行文件解析，在这里的话会调用TrajectoryFromXYZ进行文件解析
 */
function directTrajectory<P extends {}>(transformer: StateTransformer<PluginStateObject.Data.String | PluginStateObject.Data.Binary, PluginStateObject.Molecule.Trajectory, P>, transformerParams?: P): TrajectoryFormatProvider['parse'] {
    return async (plugin, data, params) => {
        const state = plugin.state.data;
        const trajectory = await state.build().to(data)
            .apply(transformer, transformerParams, { tags: params?.trajectoryTags })
            .commit({ revertOnError: true });
        return { trajectory };
    };
}

/**
 * @function 这里可以配置解析完文件后是否进行显示
 */
function defaultVisuals(plugin: PluginContext, data: StateObjectRef) {
    return plugin.builders.structure.representation.applyPreset(data, 'auto');
}

export const XyzProvider: TrajectoryFormatProvider = {
    label: 'XYZ',
    description: 'XYZ',
    category: TrajectoryFormatCategory,
    stringExtensions: ['xyz'],
    isApplicable: (info, data) => {
        // 相同的文件扩展名可能存在不同的解析方法，每个解析方法都有其对应的解析提供者
        // 这个条件用于判定是否使用此文件解析方法
        return info.ext === 'xyz' && data.includes('coordinates in Angstrom');
    },
    parse: directTrajectory(StateTransforms.Model.TrajectoryFromXYZ),
    visuals: defaultVisuals
};
```

## 提供者注册
文件位置： src\mol-plugin-state\formats\trajectory.ts

每个文件格式提供者都需要在registry.ts进行注册，后面在文件解析时就可以直接获取到对应的文件解析方法了
文件位置：src\mol-plugin-state\formats\registry.ts

```typescript
/**
 * @param 轨迹格式
 */
export const BuiltInTrajectoryFormats = [
    ['xyz', XyzProvider] as const,
] as const;

export type BuiltInTrajectoryFormat = (typeof BuiltInTrajectoryFormats)[number][0]
```
