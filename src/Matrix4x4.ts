import { Matrix4x4Reader, Matrix4x4Writer } from "./Matrix4x4.internalmacro";
import { Immutable } from "./types/Immutable";
import { Vector3 } from "./Vector3";

export type Matrix4x4Tuple = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
];

interface ReadonlyMatrix4x4 {
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

    /**
     * Returns whether the matrix is the identity matrix.
     */
    public get isIdentity(): boolean {
        const m = Matrix4x4Reader.$fromTuple!(this.elements);
        return m.$m11!() === 1 && m.$m22!() === 1 && m.$m33!() === 1 && m.$m44!() === 1  // Check diagonal element first for early out.
            && m.$m12!() === 0 && m.$m13!() === 0 && m.$m14!() === 0
            && m.$m21!() === 0 && m.$m23!() === 0 && m.$m24!() === 0
            && m.$m31!() === 0 && m.$m32!() === 0 && m.$m34!() === 0
            && m.$m41!() === 0 && m.$m42!() === 0 && m.$m43!() === 0;
    }

    /**
     * Gets the translation component of this matrix.
     * @param out The vector to store the translation component in.
     * @returns The vector storing the translation component.
     */
    public getTranslation(out?: Vector3): Vector3 {
        out ??= new Vector3();

        const m = Matrix4x4Reader.$fromTuple!(this.elements);
        return out.set(m.$m41!(), m.$m42!(), m.$m43!());
    }

    /**
     * Sets the translation component of this matrix.
     * @param translation The translation component.
     * @returns This matrix.
     */
    public setTranslation(translation: Immutable<Vector3>): Matrix4x4 {
        const m = Matrix4x4Writer.$fromTuple!(this.elements);
        m.$m41!(translation.x);
        m.$m42!(translation.y);
        m.$m43!(translation.z);
        return this;
    }

    /**
     * Constructs a Identity 4x4 matrix.
     */
    public constructor() {
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    /**
     * Freezes the matrix 4x4 and returns it.
     */
    public freeze(): ReadonlyMatrix4x4 {
        Object.freeze(this.elements);
        return Object.freeze(this);
    }
}
