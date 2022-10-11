import type { ImmutConvertible } from "./types/Immutable";

export type Matrix3x2Tuple = [
    number, number, number,
    number, number, number
];

interface ReadonlyMatrix3x2 {
    readonly elements: Readonly<Matrix3x2Tuple>;
}

/**
 * A structure encapsulating a 3x2 matrix.
 */
export class Matrix3x2 implements ImmutConvertible<ReadonlyMatrix3x2> {
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
