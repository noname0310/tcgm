export namespace Vector3 {
    export function $new(): Vector3 {
        return [0, 0, 0] as unknown as Vector3;
    }

    export function $from(x: number, y: number, z: number): Vector3 {
        return [x, y, z] as unknown as Vector3;
    }
}

export interface Vector3 {
    $x(): number;
    $y(): number;
    $z(): number;
}

function $asData(v: Vector3): [number, number, number] {
    return v as unknown as [number, number, number];
}

export function $x(v: Vector3): number {
    return $asData!(v)[0];
}

export function $y(v: Vector3): number {
    return $asData!(v)[1];
}

export function $z(v: Vector3): number {
    return $asData!(v)[2];
}
