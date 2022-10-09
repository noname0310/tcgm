import { Matrix4x4 } from "./Matrix4x4";
import { Matrix4x4Reader } from "./Matrix4x4.internalmacro";
import { Quaternion } from "./Quaternion";
import { Immutable, ImmutConvertable } from "./types/Immutable";
import { XYZ } from "./VectorLike";

/**
 * readonly 3D vector
 */
export interface ReadonlyVector3 {
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
}

/**
 * A structure encapsulating three single precision floating point values and provides hardware accelerated methods.
 */
export class Vector3 implements ImmutConvertable<ReadonlyVector3> {
    // #region Public Static Properties

    /**
     * The vector (0,0,0).
     */
    public static readonly zero = new Vector3(0, 0, 0).freeze();
    /**
     * The vector (1,1,1).
     */
    public static readonly one = new Vector3(1, 1, 1).freeze();
    /**
     * The vector (1,0,0).
     */
    public static readonly unitX = new Vector3(1, 0, 0).freeze();
    /**
     * The vector (0,1,0).
     */
    public static readonly unitY = new Vector3(0, 1, 0).freeze();
    /**
     * The vector (0,0,1).
     */
    public static readonly unitZ = new Vector3(0, 0, 1).freeze();

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

    // #region Constructors

    /**
     * Constructs a vector with (0,0,0) as its elements.
     */
    public constructor();

    /**
     * Constructs a vector with the given individual elements.
     * @param x The X component.
     * @param y The Y component.
     * @param z The Z component.
     */
    public constructor(x: number, y: number, z: number);

    public constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    // #endregion

    // #region Public Instance Methods

    /**
     * freezes the vector and returns it.
     */
    public freeze(): ReadonlyVector3 {
        return Object.freeze(this);
    }
    
    /**
     * Copies the values of the passed Vector3's x, y and z properties to this Vector3. 
     * @param value The source Vector3.
     * @returns This Vector3 after the values have been copied.
     */
    public copy(value: Immutable<XYZ>): Vector3 {
        this.x = value.x;
        this.y = value.y;
        this.z = value.z;

        return this;
    }

    /**
     * Returns a new Vector3 with the same x, y and z values as this one. 
     * @returns 
     */
    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * Sets the vector's x, y and z values from the given values.
     * @param x The x value.
     * @param y The y value.
     * @param z The z value.
     * @returns This vector.
     */
    public set(x: number, y: number, z: number): Vector3 {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    /**
     * Sets the vector's x value.
     * @param x The x value.
     * @returns This vector.
     */
    public setX(x: number): Vector3 {
        this.x = x;

        return this;
    }

    /**
     * Sets the vector's y value.
     * @param y The y value.
     * @returns This vector.
     */
    public setY(y: number): Vector3 {
        this.y = y;

        return this;
    }

    /**
     * Sets the vector's z value.
     * @param z The z value.
     * @returns This vector.
     */
    public setZ(z: number): Vector3 {
        this.z = z;

        return this;
    }

    /**
     * Returns a String representing this Vector2 instance.
     * @returns The string representation.
     */
    public toString(): string {
        return "<" + this.x + ", " + this.y + ", " + this.z + ">";
    }

    /**
     * Returns the length of the vector.
     * @returns The vector's length.
     */
    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * Returns the length of the vector squared. This operation is cheaper than Length().
     * @returns The vector's length squared.
     */
    public lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
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
    }

    /**
     * Returns a boolean indicating whether the given Vector3 is equal to this Vector3 instance.
     * @param other The Vector3 to compare this instance to.
     * @returns True if the other Vector2 is equal to this instance; False otherwise.
     */
    public equals(other: ReadonlyVector3): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    // #endregion

    // #region Public Static Methods

    /**
     * Returns the Euclidean distance between the two given points.
     * @param value1 The first point.
     * @param value2 The second point.
     * @returns The distance.
     */
    public static distance(value1: ReadonlyVector3, value2: ReadonlyVector3): number {
        const dx = value1.x - value2.x;
        const dy = value1.y - value2.y;
        const dz = value1.z - value2.z;

        const ls = dx * dx + dy * dy + dz * dz;

        return Math.sqrt(ls);
    }

    /**
     * Returns the Euclidean distance squared between the two given points.
     * @param value1 The first point.
     * @param value2 The second point.
     * @returns The distance squared.
     */
    public static distanceSquared(value1: ReadonlyVector3, value2: ReadonlyVector3): number {
        const dx = value1.x - value2.x;
        const dy = value1.y - value2.y;
        const dz = value1.z - value2.z;
        
        return dx * dx + dy * dy + dz * dz;
    }

    /**
     * Returns a vector with the same direction as the given vector, but with a length of 1.
     * @param value The vector to normalize.
     * @returns The normalized vector.
     */
    public static normalize(value: ReadonlyVector3): Vector3 {
        const ls = value.x * value.x + value.y * value.y + value.z * value.z;
        const length = Math.sqrt(ls);
        return new Vector3(value.x / length, value.y / length, value.z / length);
    }

    /**
     * Computes the cross product of two vectors.
     * @param vector1 The first vector.
     * @param vector2 The second vector.
     * @returns The cross product.
     */
    public static cross(vector1: ReadonlyVector3, vector2: ReadonlyVector3): Vector3 {
        return new Vector3(
            vector1.y * vector2.z - vector1.z * vector2.y,
            vector1.z * vector2.x - vector1.x * vector2.z,
            vector1.x * vector2.y - vector1.y * vector2.x
        );
    }

    /**
     * Returns the reflection of a vector off a surface that has the specified normal.
     * @param vector The source vector.
     * @param normal The normal of the surface being reflected off.
     * @returns The reflected vector.
     */
    public static reflect(vector: ReadonlyVector3, normal: ReadonlyVector3): Vector3 {
        const dot = vector.x * normal.x + vector.y * normal.y + vector.z * normal.z;
        const tempX = normal.x * dot * 2.0;
        const tempY = normal.y * dot * 2.0;
        const tempZ = normal.z * dot * 2.0;
        return new Vector3(vector.x - tempX, vector.y - tempY, vector.z - tempZ);
    }

    /**
     * Restricts a vector between a min and max value.
     * @param value1 The source vector.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns The restricted vector.
     */
    public static clamp(value1: ReadonlyVector3, min: ReadonlyVector3, max: ReadonlyVector3): Vector3 {
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

        return new Vector3(x, y, z);
    }

    /**
     * Linearly interpolates between two vectors based on the given weighting.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns The interpolated vector.
     */
    public static lerp(value1: ReadonlyVector3, value2: ReadonlyVector3, amount: number): Vector3 {
        return new Vector3(
            value1.x + (value2.x - value1.x) * amount,
            value1.y + (value2.y - value1.y) * amount,
            value1.z + (value2.z - value1.z) * amount
        );
    }

    /// <summary>
    /// Transforms a vector by the given matrix.
    /// </summary>
    /// <param name="position">The source vector.</param>
    /// <param name="matrix">The transformation matrix.</param>
    /// <returns>The transformed vector.</returns>
    /**
     * Transforms a vector by the given matrix.
     * @param position The source vector.
     * @param matrix The transformation matrix.
     * @returns The transformed vector.
     */
    public static transformFrom4x4Matrix(position: ReadonlyVector3, matrix: Immutable<Matrix4x4>) {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = position.x;
        const y = position.y;
        const z = position.z;
        return new Vector3(
            x * m.$m11!() + y * m.$m21!() + z * m.$m31!() + m.$m41!(),
            x * m.$m12!() + y * m.$m22!() + z * m.$m32!() + m.$m42!(),
            x * m.$m13!() + y * m.$m23!() + z * m.$m33!() + m.$m43!()
        );
    }

    /**
     * Transforms a vector normal by the given matrix.
     * @param normal The source vector.
     * @param matrix The transformation matrix.
     * @returns The transformed vector.
     */
    public static transformNormalFrom4x4Matrix(normal: ReadonlyVector3, matrix: Immutable<Matrix4x4>): Vector3 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = normal.x;
        const y = normal.y;
        const z = normal.z;
        return new Vector3(
            x * m.$m11!() + y * m.$m21!() + z * m.$m31!(),
            x * m.$m12!() + y * m.$m22!() + z * m.$m32!(),
            x * m.$m13!() + y * m.$m23!() + z * m.$m33!()
        );
    }

    /**
     * Transforms a vector by the given Quaternion rotation value.
     * @param value The source vector to be rotated.
     * @param rotation The rotation to apply.
     * @returns The transformed vector.
     */
    public static transformFromQuaternion(value: ReadonlyVector3, rotation: Immutable<Quaternion>): Vector3 {
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

        const x = value.x;
        const y = value.y;
        const z = value.z;

        return new Vector3(
            x * (1.0 - yy2 - zz2) + y * (xy2 - wz2) + z * (xz2 + wy2),
            x * (xy2 + wz2) + y * (1.0 - xx2 - zz2) + z * (yz2 - wx2),
            x * (xz2 - wy2) + y * (yz2 + wx2) + z * (1.0 - xx2 - yy2)
        );
    }

    /**
     * Returns the dot product of two vectors.
     * @param vector1 The first vector.
     * @param vector2 The second vector.
     * @returns The dot product.
     */
    public static dot(vector1: ReadonlyVector3, vector2: ReadonlyVector3): number {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns The minimized vector.
     */
    public static min(value1: ReadonlyVector3, value2: ReadonlyVector3): Vector3 {
        return new Vector3(
            (value1.x < value2.x) ? value1.x : value2.x,
            (value1.y < value2.y) ? value1.y : value2.y,
            (value1.z < value2.z) ? value1.z : value2.z
        );
    }
    
    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns The maximized vector.
     */
    public static max(value1: ReadonlyVector3, value2: ReadonlyVector3): Vector3 {
        return new Vector3(
            (value1.x > value2.x) ? value1.x : value2.x,
            (value1.y > value2.y) ? value1.y : value2.y,
            (value1.z > value2.z) ? value1.z : value2.z
        );
    }
    
    /**
     * Returns a vector whose elements are the absolute values of each of the source vector's elements.
     * @param value The source vector.
     * @returns The absolute value vector.
     */
    public static abs(value: ReadonlyVector3): Vector3 {
        return new Vector3(Math.abs(value.x), Math.abs(value.y), Math.abs(value.z));
    }

    /**
     * Returns a vector whose elements are the square root of each of the source vector's elements.
     * @param value The source vector.
     * @returns The square root vector.
     */
    public static sqrt(value: ReadonlyVector3): Vector3 {
        return new Vector3(Math.sqrt(value.x), Math.sqrt(value.y), Math.sqrt(value.z));
    }

    // #endregion

    // #region Public operator methods

    /**
     * Adds two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The summed vector.
     */
    public static add(left: ReadonlyVector3, right: ReadonlyVector3): Vector3 {
        return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z);
    }

    /**
     * Subtracts the second vector from the first.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The difference vector.
     */
    public static sub(left: ReadonlyVector3, right: ReadonlyVector3): Vector3 {
        return new Vector3(left.x - right.x, left.y - right.y, left.z - right.z);
    }

    /**
     * Multiplies two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The product vector.
     */
    public static mul(left: ReadonlyVector3, right: ReadonlyVector3): Vector3 {
        return new Vector3(left.x * right.x, left.y * right.y, left.z * right.z);
    }

    /**
     * Multiplies a vector by the given scalar.
     * @param left The source vector.
     * @param right The scalar value.
     * @returns The scaled vector.
     */
    public static mulScalar(left: ReadonlyVector3, right: number): Vector3 {
        return new Vector3(left.x * right, left.y * right, left.z * right);
    }

    /**
     * Divides the first vector by the second.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The vector resulting from the division.
     */
    public static div(left: ReadonlyVector3, right: ReadonlyVector3): Vector3 {
        return new Vector3(left.x / right.x, left.y / right.y, left.z / right.z);
    }

    /**
     * Divides the vector by the given scalar.
     * @param left The source vector.
     * @param divisor The scalar value.
     * @returns The result of the division.
     */
    public static divScalar(left: ReadonlyVector3, divisor: number): Vector3 {
        return new Vector3(left.x / divisor, left.y / divisor, left.z / divisor);
    }

    /**
     * Negates a given vector.
     * @param value The source vector.
     * @returns The negated vector.
     */
    public static negate(value: ReadonlyVector3): Vector3 {
        return new Vector3(-value.x, -value.y, -value.z);
    }
    
    // #endregion
}
