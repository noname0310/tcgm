/**
 * @internal
 */
export interface Matrix4x4Reader {
    _type: "Matrix4x4Reader";
    $m11(): number;
    $m12(): number;
    $m13(): number;
    $m14(): number;
    $m21(): number;
    $m22(): number;
    $m23(): number;
    $m24(): number;
    $m31(): number;
    $m32(): number;
    $m33(): number;
    $m34(): number;
    $m41(): number;
    $m42(): number;
    $m43(): number;
    $m44(): number;
}

/**
 * @internal
 */
export namespace Matrix4x4Reader {
    export namespace Methods {
        export function $asData(self: Matrix4x4Reader): Readonly<Matrix4x4Tuple> {
            return self as unknown as Readonly<Matrix4x4Tuple>;
        }

        export function $m11(self: Matrix4x4Reader): number {
            return $asData!(self)[0];
        }

        export function $m12(self: Matrix4x4Reader): number {
            return $asData!(self)[4];
        }

        export function $m13(self: Matrix4x4Reader): number {
            return $asData!(self)[8];
        }

        export function $m14(self: Matrix4x4Reader): number {
            return $asData!(self)[12];
        }

        export function $m21(self: Matrix4x4Reader): number {
            return $asData!(self)[1];
        }

        export function $m22(self: Matrix4x4Reader): number {
            return $asData!(self)[5];
        }

        export function $m23(self: Matrix4x4Reader): number {
            return $asData!(self)[9];
        }

        export function $m24(self: Matrix4x4Reader): number {
            return $asData!(self)[13];
        }

        export function $m31(self: Matrix4x4Reader): number {
            return $asData!(self)[2];
        }

        export function $m32(self: Matrix4x4Reader): number {
            return $asData!(self)[6];
        }

        export function $m33(self: Matrix4x4Reader): number {
            return $asData!(self)[10];
        }

        export function $m34(self: Matrix4x4Reader): number {
            return $asData!(self)[14];
        }

        export function $m41(self: Matrix4x4Reader): number {
            return $asData!(self)[3];
        }

        export function $m42(self: Matrix4x4Reader): number {
            return $asData!(self)[7];
        }

        export function $m43(self: Matrix4x4Reader): number {
            return $asData!(self)[11];
        }

        export function $m44(self: Matrix4x4Reader): number {
            return $asData!(self)[15];
        }
    }

    export function $fromTuple(tuple: Readonly<Matrix4x4Tuple>): Matrix4x4Reader {
        return tuple as unknown as Matrix4x4Reader;
    }
}
    
/**
 * @internal
 */
export interface Matrix4x4Writer {
    _type: "Matrix4x4Writer";
    $m11(value: number): number;
    $m12(value: number): number;
    $m13(value: number): number;
    $m14(value: number): number;
    $m21(value: number): number;
    $m22(value: number): number;
    $m23(value: number): number;
    $m24(value: number): number;
    $m31(value: number): number;
    $m32(value: number): number;
    $m33(value: number): number;
    $m34(value: number): number;
    $m41(value: number): number;
    $m42(value: number): number;
    $m43(value: number): number;
    $m44(value: number): number;
}

/**
 * @internal
 */
export namespace Matrix4x4Writer {
    export namespace Methods {
        export function $asData(self: Matrix4x4Writer): Matrix4x4Tuple {
            return self as unknown as Matrix4x4Tuple;
        }

        export function $m11(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[0] = value;
        }

        export function $m12(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[4] = value;
        }

        export function $m13(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[8] = value;
        }

        export function $m14(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[12] = value;
        }

        export function $m21(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[1] = value;
        }

        export function $m22(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[5] = value;
        }

        export function $m23(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[9] = value;
        }

        export function $m24(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[13] = value;
        }

        export function $m31(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[2] = value;
        }

        export function $m32(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[6] = value;
        }

        export function $m33(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[10] = value;
        }

        export function $m34(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[14] = value;
        }

        export function $m41(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[3] = value;
        }

        export function $m42(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[7] = value;
        }

        export function $m43(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[11] = value;
        }

        export function $m44(self: Matrix4x4Writer, value: number): number {
            return $asData!(self)[15] = value;
        }
    }

    export function $fromTuple(tuple: Matrix4x4Tuple): Matrix4x4Writer {
        return tuple as unknown as Matrix4x4Writer;
    }
}

export type Matrix4x4Tuple = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
];

export interface ReadonlyMatrix4x4 {
    readonly elements: Readonly<Matrix4x4Tuple>;
}

/**
 * A structure encapsulating a 4x4 matrix.
 */
export class Matrix4x4 {
    /**
     * The elements of the matrix in column-major order.
     * 
     * elements represents:
     * 
     * matrix:
     * 
     * | m11 m12 m13 m14 |
     * 
     * | m21 m22 m23 m24 |
     * 
     * | m31 m32 m33 m34 |
     * 
     * | m41 m42 m43 m44 |
     * 
     * elements:
     * 
     * [ m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44 ]
     */
    public elements: Matrix4x4Tuple;

    public constructor() {
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    public freeze(): ReadonlyMatrix4x4 {
        Object.freeze(this.elements);
        return Object.freeze(this);
    }
}
