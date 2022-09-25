export namespace Vector2 {
    export function $new(): Vector2 {
        return [0, 0] as unknown as Vector2;
    }

    export function $from(x: number, y: number): Vector2 {
        return [x, y] as unknown as Vector2;
    }
}

export interface Vector2 {
    $x(): number;
    $y(): number;
}

function $asData(v: Vector2): [number, number] {
    return v as unknown as [number, number];
}

export function $x(v: Vector2): number {
    return $asData!(v)[0];
}

export function $y(v: Vector2): number {
    return $asData!(v)[1];
}
