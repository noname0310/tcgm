import { ImmutConvertable } from "./types/Immutable";

export namespace Matrix3x2Array {
    export namespace Methods {
        export function $asData(array: Matrix3x2Array): Matrix3x2Tuple {
            return array as unknown as Matrix3x2Tuple;
        }

        export function $getM11(array: Matrix3x2Array): number {
            return $asData!(array)[0];
        }

        export function $getM12(array: Matrix3x2Array): number {
            return $asData!(array)[3];
        }

        export function $getM21(array: Matrix3x2Array): number {
            return $asData!(array)[1];
        }

        export function $getM22(array: Matrix3x2Array): number {
            return $asData!(array)[4];
        }

        export function $getM31(array: Matrix3x2Array): number {
            return $asData!(array)[2];
        }

        export function $getM32(array: Matrix3x2Array): number {
            return $asData!(array)[5];
        }

        export function $setM11(array: Matrix3x2Array, value: number): number {
            return $asData!(array)[0] = value;
        }

        export function $setM12(array: Matrix3x2Array, value: number): number {
            return $asData!(array)[3] = value;
        }

        export function $setM21(array: Matrix3x2Array, value: number): number {
            return $asData!(array)[1] = value;
        }

        export function $setM22(array: Matrix3x2Array, value: number): number {
            return $asData!(array)[4] = value;
        }

        export function $setM31(array: Matrix3x2Array, value: number): number {
            return $asData!(array)[2] = value;
        }

        export function $setM32(array: Matrix3x2Array, value: number): number {
            return $asData!(array)[5] = value;
        }
    }

    export function $fromMatrix3x2(matrix: Matrix3x2): Matrix3x2Array {
        return matrix.elements as unknown as Matrix3x2Array;
    }

    export function $fromMatrix3x2Tuple(tuple: Matrix3x2Tuple): Matrix3x2Array {
        return tuple as unknown as Matrix3x2Array;
    }
}

export interface ReadonlyMatrix3x2Array {
    _type: ReadonlyMatrix3x2Array;
    $getM11(): number;
    $getM12(): number;
    $getM21(): number;
    $getM22(): number;
    $getM31(): number;
    $getM32(): number;
}

export interface Matrix3x2Array extends ReadonlyMatrix3x2Array {
    _type: Matrix3x2Array;
    $setM11(value: number): number;
    $setM12(value: number): number;
    $setM21(value: number): number;
    $setM22(value: number): number;
    $setM31(value: number): number;
    $setM32(value: number): number;
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
