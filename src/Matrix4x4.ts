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
