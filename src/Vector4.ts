import { Matrix4x4 } from "./Matrix4x4";
import { Matrix4x4Reader } from "./Matrix4x4.internalmacro";
import { Quaternion } from "./Quaternion";
import { Immutable, ImmutConvertible } from "./types/Immutable"
import { Vector2 } from "./Vector2";
import { Vector3 } from "./Vector3";
import { XYZW } from "./VectorLike";

/**
 * readonly 4D vector.
 */
interface ReadonlyVector4 {
    /**
     * The X component of the vector.
     */
    readonly x: number;

    /**
     * The Y component of the vector.
     */
    readonly y: number;

    /**
     * The Z component of the vector.
     */
    readonly z: number;

    /**
     * The W component of the vector.
     */
    readonly w: number;
}

/**
 * A structure encapsulating four double precision floating point values.
 */
export class Vector4 implements ImmutConvertible<ReadonlyVector4> {
    // #region Public Static Properties
    
    /**
     * The vector (0,0,0,0).
     */
    public static readonly zero = new Vector4(0, 0, 0, 0).freeze();
    /**
     * The vector (1,1,1,1).
     */
    public static readonly one = new Vector4(1, 1, 1, 1).freeze();
    
    /**
     * The vector (1,0,0,0).
     */
    public static readonly unitX = new Vector4(1, 0, 0, 0).freeze();
    
    /**
     * The vector (0,1,0,0).
     */
    public static readonly unitY = new Vector4(0, 1, 0, 0).freeze();
    
    /**
     * The vector (0,0,1,0).
     */
    public static readonly unitZ = new Vector4(0, 0, 1, 0).freeze();
    
    /**
     * The vector (0,0,0,1).
     */
    public static readonly unitW = new Vector4(0, 0, 0, 1).freeze();

    // #endregion

    /**
     * The X component of the vector.
     */
    public x: number;
    
    /**
     * The Y component of the vector.
     */
    public y: number;

    /**
     * The Z component of the vector.
     */
    public z: number;

    /**
     * The W component of the vector.
     */
    public w: number;

    // #region Constructors

    /**
     * Constructs a vector with (0,0,0,0) as its values.
     */
    public constructor();

    /**
     * Constructs a vector with the given individual elements.
     * @param x The X component.
     * @param y The Y component.
     * @param z The Z component.
     * @param w The W component.
     */
    public constructor(x: number, y: number, z: number, w: number);

    public constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    // #endregion

    // #region Public instance methods

    /**
     * freezes the vector and returns it.
     */
    public freeze(): ReadonlyVector4 {
        return Object.freeze(this);
    }
    
    /**
     * Copies the values of the passed Vector4's x, y, z and w properties to this Vector4. 
     * @param value The source Vector4.
     * @returns This Vector4 after the values have been copied.
     */
    public copy(value: Immutable<XYZW>): Vector4 {
        this.x = value.x;
        this.y = value.y;
        this.z = value.z;
        this.w = value.w;

        return this;
    }

    /**
     * Returns a new Vector4 with the same x, y, z and w values as this one. 
     * @returns The new Vector4.
     */
    public clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    /**
     * Sets the vector's x, y, z and w values from the given values.
     * @param x The x value.
     * @param y The y value.
     * @param z The z value.
     * @param w The w value.
     * @returns This vector.
     */
    public set(x: number, y: number, z: number, w: number): Vector4 {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    /**
     * Sets the vector's x value.
     * @param x The x value.
     * @returns This vector.
     */
    public setX(x: number): Vector4 {
        this.x = x;

        return this;
    }

    /**
     * Sets the vector's y value.
     * @param y The y value.
     * @returns This vector.
     */
    public setY(y: number): Vector4 {
        this.y = y;

        return this;
    }

    /**
     * Sets the vector's z value.
     * @param z The z value.
     * @returns This vector.
     */
    public setZ(z: number): Vector4 {
        this.z = z;

        return this;
    }

    /**
     * Sets the vector's w value.
     * @param w The w value.
     * @returns This vector.
     */
    public setW(w: number): Vector4 {
        this.w = w;

        return this;
    }

    /**
     * Returns a String representing this Vector4 instance.
     * @returns The string representation.
     */
    public toString(): string {
        return "<" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ">";
    }

    /**
     * Returns the length of the vector.
     * @returns The vector's length.
     */
    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    /**
     * Returns the length of the vector squared. This operation is cheaper than Length().
     * @returns The vector's length squared.
     */
    public lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    
    /**
     * Copies the contents of the vector into the given array, starting from the given index.
     * @param array The destination array.
     * @param index The index to start copying at.
     */
    public copyToArray(array: number[], index = 0): void {
        array[index] = this.x;
        array[index + 1] = this.y;
        array[index + 2] = this.z;
        array[index + 3] = this.w;
    }

    /**
     * Returns a boolean indicating whether the given Vector3 is equal to this Vector4 instance.
     * @param other The Vector4 to compare this instance to.
     * @returns True if the other Vector4 is equal to this instance; False otherwise.
     */
    public equals(other: ReadonlyVector4): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    }

    // #endregion

    // #region Public Static Methods
    
    /**
     * Returns the Euclidean distance between the two given points.
     * @param value1 The first point.
     * @param value2 The second point.
     * @returns The distance.
     */
    public static distance(value1: ReadonlyVector4, value2: ReadonlyVector4): number {
        const dx = value1.x - value2.x;
        const dy = value1.y - value2.y;
        const dz = value1.z - value2.z;
        const dw = value1.w - value2.w;

        const ls = dx * dx + dy * dy + dz * dz + dw * dw;

        return Math.sqrt(ls);
    }

    /**
     * Returns the Euclidean distance squared between the two given points.
     * @param value1 The first point.
     * @param value2 The second point.
     * @returns The distance squared.
     */
    public static distanceSquared(value1: ReadonlyVector4, value2: ReadonlyVector4): number {
        const dx = value1.x - value2.x;
        const dy = value1.y - value2.y;
        const dz = value1.z - value2.z;
        const dw = value1.w - value2.w;

        return dx * dx + dy * dy + dz * dz + dw * dw;
    }
    
    /**
     * Returns a vector with the same direction as the given vector, but with a length of 1.
     * @param vector The vector to normalize.
     * @returns The normalized vector.
     */
    public static normalize(vector: ReadonlyVector4): Vector4 {
        const ls = vector.x * vector.x + vector.y * vector.y + vector.z * vector.z + vector.w * vector.w;
        const invNorm = 1.0 / Math.sqrt(ls);

        return new Vector4(
            vector.x * invNorm,
            vector.y * invNorm,
            vector.z * invNorm,
            vector.w * invNorm
        );
    }

    /**
     * Restricts a vector between a min and max value.
     * @param value1 The source vector.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns The restricted vector.
     */
    public static clamp(value1: ReadonlyVector4, min: ReadonlyVector4, max: ReadonlyVector4): Vector4 {
        // This compare order is very important!!!
        // We must follow HLSL behavior in the case user specified min value is bigger than max value.
        
        let x = value1.x;
        x = (x > max.x) ? max.x : x;
        x = (x < min.x) ? min.x : x;

        let y = value1.y;
        y = (y > max.y) ? max.y : y;
        y = (y < min.y) ? min.y : y;

        let z = value1.z;
        z = (z > max.z) ? max.z : z;
        z = (z < min.z) ? min.z : z;

        let w = value1.w;
        w = (w > max.w) ? max.w : w;
        w = (w < min.w) ? min.w : w;

        return new Vector4(x, y, z, w);
    }
    
    /**
     * Linearly interpolates between two vectors based on the given weighting.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns The interpolated vector.
     */
    public static lerp(value1: ReadonlyVector4, value2: ReadonlyVector4, amount: number): Vector4 {
        return new Vector4(
            value1.x + (value2.x - value1.x) * amount,
            value1.y + (value2.y - value1.y) * amount,
            value1.z + (value2.z - value1.z) * amount,
            value1.w + (value2.w - value1.w) * amount
        );
    }

    /**
     * Transforms a vector2 by the given 4x4 matrix.
     * @param position The source vector.
     * @param matrix The transformation matrix.
     * @returns The transformed vector.
     */
    public static transformVector2From4x4Matrix(position: Immutable<Vector2>, matrix: Immutable<Matrix4x4>): Vector4 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        return new Vector4(
            position.x * m.$m11!() + position.y * m.$m21!() + m.$m41!(),
            position.x * m.$m12!() + position.y * m.$m22!() + m.$m42!(),
            position.x * m.$m13!() + position.y * m.$m23!() + m.$m43!(),
            position.x * m.$m14!() + position.y * m.$m24!() + m.$m44!()
        );
    }

    /**
     * Transforms a vector3 by the given 4x4 matrix.
     * @param position The source vector.
     * @param matrix The transformation matrix.
     * @returns The transformed vector.
     */
    public static transformVector3FromMatrix4x4(position: Immutable<Vector3>, matrix: Immutable<Matrix4x4>): Vector4 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        return new Vector4(
            position.x * m.$m11!() + position.y * m.$m21!() + position.z * m.$m31!() + m.$m41!(),
            position.x * m.$m12!() + position.y * m.$m22!() + position.z * m.$m32!() + m.$m42!(),
            position.x * m.$m13!() + position.y * m.$m23!() + position.z * m.$m33!() + m.$m43!(),
            position.x * m.$m14!() + position.y * m.$m24!() + position.z * m.$m34!() + m.$m44!()
        );
    }
    
    /**
     * Transforms a vector4 by the given 4x4 matrix.
     * @param vector The source vector.
     * @param matrix The transformation matrix.
     * @returns The transformed vector.
     */
    public static transformFromMatrix4x4(vector: ReadonlyVector4, matrix: Immutable<Matrix4x4>): Vector4 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        return new Vector4(
            vector.x * m.$m11!() + vector.y * m.$m21!() + vector.z * m.$m31!() + vector.w * m.$m41!(),
            vector.x * m.$m12!() + vector.y * m.$m22!() + vector.z * m.$m32!() + vector.w * m.$m42!(),
            vector.x * m.$m13!() + vector.y * m.$m23!() + vector.z * m.$m33!() + vector.w * m.$m43!(),
            vector.x * m.$m14!() + vector.y * m.$m24!() + vector.z * m.$m34!() + vector.w * m.$m44!()
        );
    }

    /**
     * Transforms a vector2 by the given Quaternion rotation value.
     * @param value The source vector to be rotated.
     * @param rotation The rotation to apply.
     * @returns The transformed vector.
     */
    public static transformVector2FromQuaternion(value: Immutable<Vector2>, rotation: Immutable<Quaternion>): Vector4 {
        const x2 = rotation.x + rotation.x;
        const y2 = rotation.y + rotation.y;
        const z2 = rotation.z + rotation.z;

        const wx2 = rotation.w * x2;
        const wy2 = rotation.w * y2;
        const wz2 = rotation.w * z2;
        const xx2 = rotation.x * x2;
        const xy2 = rotation.x * y2;
        const xz2 = rotation.x * z2;
        const yy2 = rotation.y * y2;
        const yz2 = rotation.y * z2;
        const zz2 = rotation.z * z2;

        return new Vector4(
            value.x * (1.0 - yy2 - zz2) + value.y * (xy2 - wz2),
            value.x * (xy2 + wz2) + value.y * (1.0 - xx2 - zz2),
            value.x * (xz2 - wy2) + value.y * (yz2 + wx2),
            1.0
        );
    }

    /**
     * Transforms a vector3 by the given Quaternion rotation value.
     * @param value The source vector to be rotated.
     * @param rotation The rotation to apply.
     * @returns The transformed vector.
     */
    public static transformVector3FromQuaternion(value: Immutable<Vector3>, rotation: Immutable<Quaternion>): Vector4 {
        const x2 = rotation.x + rotation.x;
        const y2 = rotation.y + rotation.y;
        const z2 = rotation.z + rotation.z;

        const wx2 = rotation.w * x2;
        const wy2 = rotation.w * y2;
        const wz2 = rotation.w * z2;
        const xx2 = rotation.x * x2;
        const xy2 = rotation.x * y2;
        const xz2 = rotation.x * z2;
        const yy2 = rotation.y * y2;
        const yz2 = rotation.y * z2;
        const zz2 = rotation.z * z2;

        return new Vector4(
            value.x * (1.0 - yy2 - zz2) + value.y * (xy2 - wz2) + value.z * (xz2 + wy2),
            value.x * (xy2 + wz2) + value.y * (1.0 - xx2 - zz2) + value.z * (yz2 - wx2),
            value.x * (xz2 - wy2) + value.y * (yz2 + wx2) + value.z * (1.0 - xx2 - yy2),
            1.0
        );
    }

    /**
     * Transforms a vector4 by the given Quaternion rotation value.
     * @param value The source vector to be rotated.
     * @param rotation The rotation to apply.
     * @returns The transformed vector.
     */
    public static transformFromQuaternion(value: ReadonlyVector4, rotation: Immutable<Quaternion>): Vector4 {
        const x2 = rotation.x + rotation.x;
        const y2 = rotation.y + rotation.y;
        const z2 = rotation.z + rotation.z;

        const wx2 = rotation.w * x2;
        const wy2 = rotation.w * y2;
        const wz2 = rotation.w * z2;
        const xx2 = rotation.x * x2;
        const xy2 = rotation.x * y2;
        const xz2 = rotation.x * z2;
        const yy2 = rotation.y * y2;
        const yz2 = rotation.y * z2;
        const zz2 = rotation.z * z2;

        return new Vector4(
            value.x * (1.0 - yy2 - zz2) + value.y * (xy2 - wz2) + value.z * (xz2 + wy2),
            value.x * (xy2 + wz2) + value.y * (1.0 - xx2 - zz2) + value.z * (yz2 - wx2),
            value.x * (xz2 - wy2) + value.y * (yz2 + wx2) + value.z * (1.0 - xx2 - yy2),
            value.w
        );
    }
    
    /**
     * Returns the dot product of two vectors.
     * @param vector1 The first vector.
     * @param vector2 The second vector.
     * @returns The dot product.
     */
    public static dot(vector1: ReadonlyVector4, vector2: ReadonlyVector4): number {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z + vector1.w * vector2.w;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns The minimized vector.
     */
    public static min(value1: ReadonlyVector4, value2: ReadonlyVector4): Vector4 {
        return new Vector4(
            (value1.x < value2.x) ? value1.x : value2.x,
            (value1.y < value2.y) ? value1.y : value2.y,
            (value1.z < value2.z) ? value1.z : value2.z,
            (value1.w < value2.w) ? value1.w : value2.w
        );
    }

    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns The maximized vector.
     */
    public static max(value1: ReadonlyVector4, value2: ReadonlyVector4): Vector4 {
        return new Vector4(
            (value1.x > value2.x) ? value1.x : value2.x,
            (value1.y > value2.y) ? value1.y : value2.y,
            (value1.z > value2.z) ? value1.z : value2.z,
            (value1.w > value2.w) ? value1.w : value2.w
        );
    }

    /**
     * Returns a vector whose elements are the absolute values of each of the source vector's elements.
     * @param value The source vector.
     * @returns The absolute value vector.
     */
    public static abs(value: ReadonlyVector4): Vector4 {
        return new Vector4(Math.abs(value.x), Math.abs(value.y), Math.abs(value.z), Math.abs(value.w));
    }
    
    /**
     * Returns a vector whose elements are the square root of each of the source vector's elements.
     * @param value The source vector.
     * @returns The square root vector.
     */
    public static sqrt(value: ReadonlyVector4): Vector4 {
        return new Vector4(Math.sqrt(value.x), Math.sqrt(value.y), Math.sqrt(value.z), Math.sqrt(value.w));
    }
    
    /**
     * Adds two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The summed vector.
     */
    public static add(left: ReadonlyVector4, right: ReadonlyVector4): Vector4 {
        return new Vector4(left.x + right.x, left.y + right.y, left.z + right.z, left.w + right.w);
    }

    /**
     * Subtracts the second vector from the first.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The difference vector.
     */
    public static sub(left: ReadonlyVector4, right: ReadonlyVector4): Vector4 {
        return new Vector4(left.x - right.x, left.y - right.y, left.z - right.z, left.w - right.w);
    }

    /**
     * Multiplies two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The product vector.
     */
    public static mul(left: ReadonlyVector4, right: ReadonlyVector4): Vector4 {
        return new Vector4(left.x * right.x, left.y * right.y, left.z * right.z, left.w * right.w);
    }
    
    /**
     * Multiplies a vector by the given scalar.
     * @param left The source vector.
     * @param right The scalar value.
     * @returns The scaled vector.
     */
    public static mulScalar(left: ReadonlyVector4, right: number): Vector4 {
        return new Vector4(left.x * right, left.y * right, left.z * right, left.w * right);
    }

    /**
     * Divides the first vector by the second.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The vector resulting from the division.
     */
    public static div(left: ReadonlyVector4, right: ReadonlyVector4): Vector4 {
        return new Vector4(left.x / right.x, left.y / right.y, left.z / right.z, left.w / right.w);
    }
    
    /**
     * Divides the vector by the given scalar.
     * @param left The source vector.
     * @param divisor The scalar value.
     * @returns The result of the division.
     */
    public static divScalar(left: ReadonlyVector4, divisor: number): Vector4 {
        const invDiv = 1.0 / divisor;

        return new Vector4(left.x * invDiv, left.y * invDiv, left.z * invDiv, left.w * invDiv);
    }
    
    /**
     * Negates a given vector.
     * @param value The source vector.
     * @returns The negated vector.
     */
    public static negate(value: ReadonlyVector4): Vector4 {
        return new Vector4(-value.x, -value.y, -value.z, -value.w);
    }

    // #endregion
}
