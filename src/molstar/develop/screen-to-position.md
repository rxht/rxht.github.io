---
Date: 2025-08-20 15:21:33
LastEditTime: 2025-08-20 15:31:18
description: Molstar 根据屏幕x，y坐标获取3D空间中的坐标
tags:
  - MolStar
  - identify
  - position
  - screen
---


# 获取3D空间中的坐标

在 molstar 根据屏幕x，y坐标获取3D空间中的坐标，代码如下：

```typescript [src/mol-canvas3d/canvas3d.ts]
/**
 * @function 根据屏幕x，y坐标获取3D空间中的坐标
 * @param x 屏幕坐标x
 * @param y 平面坐标y
 * @returns
 */
function identify(x: number, y: number): PickData | undefined {
    const cam = p.camera.stereo.name === 'on' ? stereoCamera : camera;
    return webgl.isContextLost ? undefined : pickHelper.identify(x, y, cam);
}
```

在此基础上根据不同的平面 'target'、 'near'、 'far' 再次进行扩展，代码如下：

```typescript [src/mol-canvas3d/canvas3d.ts]
/**
 * @function 根据屏幕x，y坐标获取3D空间中的坐标
 * @param x 屏幕坐标x
 * @param y 平面坐标y
 * @param type 根据支持的平面 'target' | 'near' | 'far'
 * @returns
 */
function position(x: number, y: number, type?: 'target' | 'near' | 'far'): Vec3 | undefined {
    const cam = p.camera.stereo.name === 'on' ? stereoCamera : camera;
    const position = webgl.isContextLost ? undefined : pickHelper.position(x, y, cam);
    if (!position || p.camera.stereo.name === 'on') return position;
    if (type === void 0) return position;

    const vector = Vec3.sub(Vec3(), camera.target, camera.position);
    const D = type === 'near' ? camera.near : type === 'far' ? camera.far : Vec3.distance(camera.target, camera.position);
    if (camera.state.mode === 'perspective') {
        const _position = Vec3.projectPointOnVector(Vec3(), position, vector, camera.position);
        const t = D / Vec3.distance(_position, camera.position);
        Vec3.scaleAndAdd(position, camera.position, Vec3.sub(Vec3(), position, camera.position), t);
    } else if (camera.state.mode === 'orthographic') {
        const origin = Vec3.scaleAndAdd(Vec3(), camera.position, Vec3.normalize(Vec3(), vector), D);
        const _position = Vec3.projectPointOnPlane(Vec3(), position, vector, origin);
        Vec3.copy(position, _position);
    } else {
        console.error('Molstar.canvas3d.position: Unsupported camera type.');
    }
    return position;
}
```