import { ImmutConvertable } from "./types/Immutable";

/**
 * @internal
 */
export interface Matrix3x2Reader {
    _type: "Matrix3x2Reader";
    $m11(): number;
    $m12(): number;
    $m21(): number;
    $m22(): number;
    $m31(): number;
    $m32(): number;
}

/**
 * @internal
 */
export namespace Matrix3x2Reader {
    export namespace Methods {
        export function $asData(self: Matrix3x2Reader): Readonly<Matrix3x2Tuple> {
            return self as unknown as Readonly<Matrix3x2Tuple>;
        }

        export function $m11(self: Matrix3x2Reader): number {
            return $asData!(self)[0];
        }

        export function $m12(self: Matrix3x2Reader): number {
            return $asData!(self)[3];
        }

        export function $m21(self: Matrix3x2Reader): number {
            return $asData!(self)[1];
        }

        export function $m22(self: Matrix3x2Reader): number {
            return $asData!(self)[4];
        }

        export function $m31(self: Matrix3x2Reader): number {
            return $asData!(self)[2];
        }

        export function $m32(self: Matrix3x2Reader): number {
            return $asData!(self)[5];
        }
    }

    export function $fromTuple(tuple: Readonly<Matrix3x2Tuple>): Matrix3x2Reader {
        return tuple as unknown as Matrix3x2Reader;
    }
}

/**
 * @internal
 */
export interface Matrix3x2Writer {
    _type: "Matrix3x2Writer";
    $m11(value: number): number;
    $m12(value: number): number;
    $m21(value: number): number;
    $m22(value: number): number;
    $m31(value: number): number;
    $m32(value: number): number;
}

/**
 * @internal
 */
export namespace Matrix3x2Writer {
    export namespace Methods {
        export function $asData(self: Matrix3x2Writer): Matrix3x2Tuple {
            return self as unknown as Matrix3x2Tuple;
        }

        export function $m11(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[0] = value;
        }

        export function $m12(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[3] = value;
        }

        export function $m21(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[1] = value;
        }

        export function $m22(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[4] = value;
        }

        export function $m31(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[2] = value;
        }

        export function $m32(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[5] = value;
        }
    }

    export function $fromTuple(tuple: Matrix3x2Tuple): Matrix3x2Writer {
        return tuple as unknown as Matrix3x2Writer;
    }
}

export type Matrix3x2Tuple = [
    number, number, number,
    number, number, number
];

export interface ReadonlyMatrix3x2 {
    readonly elements: Readonly<Matrix3x2Tuple>;
}

/**
 * A structure encapsulating a 3x2 matrix.
 */
export class Matrix3x2 implements ImmutConvertable<ReadonlyMatrix3x2> {
    /**
     * The elements of the matrix in column-major order.
     * 
     * elements represents:
     * 
     * matrix:
     * 
     * | m11 m12 0 |
     * 
     * | m21 m22 0 |
     * 
     * | m31 m32 1 |
     * 
     * elements:
     * 
     * [ m11, m21, m31, m12, m22, m32 ]
     */
    public elements: Matrix3x2Tuple;

    public constructor() {
        this.elements = [1, 0, 0, 0, 1, 0];
    }

    public freeze(): ReadonlyMatrix3x2 {
        Object.freeze(this.elements);
        return Object.freeze(this);
    }
}
