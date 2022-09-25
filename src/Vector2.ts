import { ReadonlyMatrix2 } from "./Matrix2";
import { ReadonlyMatrix3x2 } from "./Matrix3x2";
import { RoundingMode } from "./RoundingMode";

export interface ReadonlyVector2 {
    readonly x: number;
    readonly y: number;
    sub(v: ReadonlyVector2, dest?: Vector2): Vector2;
    sub(x: number, y: number, dest?: Vector2): Vector2;
    dot(v: ReadonlyVector2): number;
    angle(v: ReadonlyVector2): number;
    lengthSquared(): number;
    length(): number;
    distance(v: ReadonlyVector2): number;
    distanceSquared(v: ReadonlyVector2): number;
    distance(x: number, y: number): number;
    distanceSquared(x: number, y: number): number;
    normalize(dest?: Vector2): Vector2;
    normalize(length: number, dest?: Vector2): Vector2;
    add(v: ReadonlyVector2, dest?: Vector2): Vector2;
    add(x: number, y: number, dest?: Vector2): Vector2;
    negate(dest?: Vector2): Vector2;
    mul(scalar: number, dest?: Vector2): Vector2;
    mul(x: number, y: number, dest?: Vector2): Vector2;
    mul(v: ReadonlyVector2, dest?: Vector2): Vector2;
    div(scalar: number, dest?: Vector2): Vector2;
    div(v: ReadonlyVector2, dest?: Vector2): Vector2;
    div(x: number, y: number, dest?: Vector2): Vector2;
    mul(mat: ReadonlyMatrix2, dest?: Vector2): Vector2;
    mulTranspose(mat: ReadonlyMatrix2, dest?: Vector2): Vector2;
    mulPosition(mat: ReadonlyMatrix3x2, dest?: Vector2): Vector2;
    mulDirection(mat: ReadonlyMatrix3x2, dest?: Vector2): Vector2;
    lerp(other: ReadonlyVector2, t: number, dest?: Vector2): Vector2;
    fma(a: ReadonlyVector2, b: ReadonlyVector2, dest?: Vector2): Vector2;
    fma(a: number, b: ReadonlyVector2, dest?: Vector2): Vector2;
    min(v: ReadonlyVector2, dest?: Vector2): Vector2;
    max(v: ReadonlyVector2, dest?: Vector2): Vector2;
    maxComponent(): number;
    minComponent(): number;
    get(component: number): number;
    round(mode: RoundingMode, dest?: Vector2): Vector2;
    get(dest: Vector2): Vector2;
    floor(dest?: Vector2): Vector2;
    ceil(dest?: Vector2): Vector2;
    round(dest?: Vector2): Vector2;
    isFinite(): boolean;
    absolute(dest?: Vector2): Vector2;
    equals(v: ReadonlyVector2, delta: number): boolean;
    equals(x: number, y: number): boolean;
}

export class Vector2 {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public freeze(): ReadonlyVector2 {
        return Object.freeze(this) as any;
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}
