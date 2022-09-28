export namespace Matrix4x4Array {
    export namespace Methods {
        export function $asData(array: Matrix4x4Array): Matrix4x4Tuple {
            return array as unknown as Matrix4x4Tuple;
        }

        export function $getM11(array: Matrix4x4Array): number {
            return $asData!(array)[0];
        }

        export function $getM12(array: Matrix4x4Array): number {
            return $asData!(array)[4];
        }

        export function $getM13(array: Matrix4x4Array): number {
            return $asData!(array)[8];
        }

        export function $getM14(array: Matrix4x4Array): number {
            return $asData!(array)[12];
        }

        export function $getM21(array: Matrix4x4Array): number {
            return $asData!(array)[1];
        }

        export function $getM22(array: Matrix4x4Array): number {
            return $asData!(array)[5];
        }

        export function $getM23(array: Matrix4x4Array): number {
            return $asData!(array)[9];
        }

        export function $getM24(array: Matrix4x4Array): number {
            return $asData!(array)[13];
        }

        export function $getM31(array: Matrix4x4Array): number {
            return $asData!(array)[2];
        }

        export function $getM32(array: Matrix4x4Array): number {
            return $asData!(array)[6];
        }

        export function $getM33(array: Matrix4x4Array): number {
            return $asData!(array)[10];
        }

        export function $getM34(array: Matrix4x4Array): number {
            return $asData!(array)[14];
        }

        export function $getM41(array: Matrix4x4Array): number {
            return $asData!(array)[3];
        }

        export function $getM42(array: Matrix4x4Array): number {
            return $asData!(array)[7];
        }

        export function $getM43(array: Matrix4x4Array): number {
            return $asData!(array)[11];
        }

        export function $getM44(array: Matrix4x4Array): number {
            return $asData!(array)[15];
        }

        export function $setM11(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[0] = value;
        }

        export function $setM12(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[4] = value;
        }

        export function $setM13(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[8] = value;
        }

        export function $setM14(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[12] = value;
        }

        export function $setM21(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[1] = value;
        }

        export function $setM22(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[5] = value;
        }

        export function $setM23(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[9] = value;
        }

        export function $setM24(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[13] = value;
        }

        export function $setM31(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[2] = value;
        }

        export function $setM32(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[6] = value;
        }

        export function $setM33(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[10] = value;
        }

        export function $setM34(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[14] = value;
        }

        export function $setM41(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[3] = value;
        }

        export function $setM42(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[7] = value;
        }

        export function $setM43(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[11] = value;
        }

        export function $setM44(array: Matrix4x4Array, value: number): number {
            return $asData!(array)[15] = value;
        }
    }

    export function $fromMatrix4x4(matrix: Matrix4x4): Matrix4x4Array {
        return matrix.elements as unknown as Matrix4x4Array;
    }

    export function $fromTuple(array: Matrix4x4Tuple): Matrix4x4Array {
        return array as unknown as Matrix4x4Array;
    }
}

export interface Matrix4x4Array {
    $getM11(): number;
    $getM12(): number;
    $getM13(): number;
    $getM14(): number;
    $getM21(): number;
    $getM22(): number;
    $getM23(): number;
    $getM24(): number;
    $getM31(): number;
    $getM32(): number;
    $getM33(): number;
    $getM34(): number;
    $getM41(): number;
    $getM42(): number;
    $getM43(): number;
    $getM44(): number;
    $setM11(value: number): number;
    $setM12(value: number): number;
    $setM13(value: number): number;
    $setM14(value: number): number;
    $setM21(value: number): number;
    $setM22(value: number): number;
    $setM23(value: number): number;
    $setM24(value: number): number;
    $setM31(value: number): number;
    $setM32(value: number): number;
    $setM33(value: number): number;
    $setM34(value: number): number;
}

export type Matrix4x4Tuple = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
];

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
}
