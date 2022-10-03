import { Matrix3x2 } from "./Matrix3x2";
import { Matrix3x2Reader } from "./Matrix3x2.internalmacro";
import { Matrix4x4 } from "./Matrix4x4";
import { Matrix4x4Reader } from "./Matrix4x4.internalmacro";
import { Quaternion } from "./Quaternion";
import { Immutable, ImmutConvertable } from "./types/Immutable";
import { XY } from "./VectorLike";

/**
 * readonly 2D vector
 */
export interface ReadonlyVector2 {
    /**
     * The X component of the vector.
     */
    readonly x: number;

    /**
     * The Y component of the vector.
     */
    readonly y: number;

    /**
     * Returns a new Vector2 with the same x and y values as this one. 
     * @returns 
     */
    clone(): Vector2;

    /**
     * Returns a String representing this Vector2 instance.
     * @returns The string representation.
     */
    toString(): string;

    /**
     * Returns the length of the vector.
     * @returns The vector's length.
     */
    length(): number;

    /**
     * Returns the length of the vector squared. This operation is cheaper than Length().
     * @returns The vector's length squared.
     */
    lengthSquared(): number;

    /**
     * Copies the contents of the vector into the given array, starting from the given index.
     * @param array The destination array.
     * @param index The index to start copying at.
     */
    copyToArray(array: number[], index?: number): void;

    /**
     * Returns a boolean indicating whether the given Vector2 is equal to this Vector2 instance.
     * @param other The Vector2 to compare this instance to.
     * @returns True if the other Vector2 is equal to this instance; False otherwise.
     */
    equals(other: ReadonlyVector2): boolean;

    /**
     * Returns the Euclidean distance between this point and the other point.
     * @param other The other point.
     * @returns The distance.
     */
    distanceTo(other: ReadonlyVector2): number;

    /**
     * Returns the Euclidean distance squared between this point and the other point.
     * @param other The other point.
     * @returns The distance squared.
     */
    distanceSquaredTo(other: ReadonlyVector2): number;
    
    /**
     * Returns the dot product of this vector and the other vector.
     * @param other The other vector.
     * @returns The dot product.
     */
    dot(other: ReadonlyVector2): number;
}

/**
 * A structure encapsulating two double precision floating point values.
 */
export class Vector2 implements ImmutConvertable<ReadonlyVector2> {
    // #region Public Static Properties

    /**
     * The vector (0,0).
     */
    public static readonly zero = new Vector2(0, 0).freeze();
    /**
     * The vector (1,1).
     */
    public static readonly one = new Vector2(1, 1).freeze();
    /**
     * The vector (1,0).
     */
    public static readonly unitX = new Vector2(1, 0).freeze();
    /**
     * The vector (0,1).
     */
    public static readonly unitY = new Vector2(0, 1).freeze();

    // #endregion Public Static Properties

    /**
     * The X component of the vector.
     */
    public x: number;
    /**
     * The Y component of the vector.
     */
    public y: number;

    // #region Constructors

    /**
     * Constructs a vector with (0,0) as its elements.
     */
    public constructor();

    /**
     * Constructs a vector with the given individual elements.
     * @param x The X component.
     * @param y The Y component.
     */
    public constructor(x: number, y: number);

    public constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // #endregion Constructors

    // #region Public Instance methods

    /**
     * freezes the vector and returns it.
     */
    public freeze(): ReadonlyVector2 {
        return Object.freeze(this);
    }

    /**
     * Copies the values of the passed Vector2's x and y properties to this Vector2. 
     * @param value The source Vector2.
     * @returns This Vector2 after the values have been copied.
     */
    public copy(value: Immutable<XY>): Vector2 {
        this.x = value.x;
        this.y = value.y;
        return this;
    }

    /**
     * Returns a new Vector2 with the same x and y values as this one. 
     * @returns 
     */
    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    /**
     * Returns a String representing this Vector2 instance.
     * @returns The string representation.
     */
    public toString(): string {
        return "<" + this.x + ", " + this.y + ">";
    }

    /**
     * Returns the length of the vector.
     * @returns The vector's length.
     */
    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns the length of the vector squared. This operation is cheaper than Length().
     * @returns The vector's length squared.
     */
    public lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * Copies the contents of the vector into the given array, starting from the given index.
     * @param array The destination array.
     * @param index The index to start copying at.
     */
    public copyToArray(array: number[], index = 0): void {
        array[index] = this.x;
        array[index + 1] = this.y;
    }

    /**
     * Returns a boolean indicating whether the given Vector2 is equal to this Vector2 instance.
     * @param other The Vector2 to compare this instance to.
     * @returns True if the other Vector2 is equal to this instance; False otherwise.
     */
    public equals(other: ReadonlyVector2): boolean {
        return this.x == other.x && this.y == other.y;
    }

    /**
     * Returns the Euclidean distance between this point and the other point.
     * @param other The other point.
     * @returns The distance.
     */
    public distanceTo(other: ReadonlyVector2): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Returns the Euclidean distance squared between this point and the other point.
     * @param other The other point.
     * @returns The distance squared.
     */
    public distanceSquaredTo(other: ReadonlyVector2): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;

        return dx * dx + dy * dy;
    }

    /**
     * Converts this vector into a unit vector.
     * @returns This vector after the normalization.
     */
    public normalize(): Vector2 {
        const ls = this.x * this.x + this.y * this.y;
        const invNorm = 1.0 / Math.sqrt(ls);

        this.x *= invNorm;
        this.y *= invNorm;

        return this;
    }

    /**
     * Set this vector into the reflection of the given vector around the given normal.
     * @param vector The source vector.
     * @param normal The normal of the surface being reflected off.
     * @returns This vector after the reflection.
     */
    public reflect(vector: ReadonlyVector2, normal: ReadonlyVector2): Vector2 {
        const dot = vector.x * normal.x + vector.y * normal.y;
        this.x = vector.x - 2.0 * dot * normal.x;
        this.y = vector.y - 2.0 * dot * normal.y;

        return this;
    }

    /**
     * Restricts this vector between a min and max value.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns This vector after the restriction.
     */
    public clamp(min: ReadonlyVector2, max: ReadonlyVector2): Vector2 {
        // This compare order is very important!!!
        // We must follow HLSL behavior in the case user specified min value is bigger than max value.
        let x = this.x;
        x = (x > max.x) ? max.x : x;
        x = (x < min.x) ? min.x : x;

        let y = this.y;
        y = (y > max.y) ? max.y : y;
        y = (y < min.y) ? min.y : y;

        this.x = x;
        this.y = y;

        return this;
    }

    /**
     * Set this vector to linearly interpolate between value1 and value2 by amount.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns This vector after the interpolation.
     */
    public lerpVectors(value1: ReadonlyVector2, value2: ReadonlyVector2, amount: number): Vector2 {
        this.x = value1.x + (value2.x - value1.x) * amount;
        this.y = value1.y + (value2.y - value1.y) * amount;

        return this;
    }
    
    /**
     * Set this vector to linearly interpolate between this vector and the other vector by amount.
     * @param other The other source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns This vector after the interpolation.
     */
     public lerp(other: ReadonlyVector2, amount: number): Vector2 {
        this.x += (other.x - this.x) * amount;
        this.y += (other.y - this.y) * amount;

        return this;
    }

    /**
     * Transform this vector by the given 3x2 matrix.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformFrom3x2Matrix(matrix: Immutable<Matrix3x2>): Vector2 {
        const m = Matrix3x2Reader.$fromTuple!(matrix.elements);
        const x = this.x;
        const y = this.y;
        this.x = x * m.$m11!() + y * m.$m21!() + m.$m31!();
        this.y = x * m.$m12!() + y * m.$m22!() + m.$m32!();

        return this;
    }

    /**
     * Transforms this vector by the given 4x4 matrix.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformFrom4x4Matrix(matrix: Immutable<Matrix4x4>): Vector2 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = this.x;
        const y = this.y;
        this.x = x * m.$m11!() + y * m.$m21!() + m.$m41!();
        this.y = x * m.$m12!() + y * m.$m22!() + m.$m42!();

        return this;
    }

    /**
     * Transforms this vector normal by the given 3x2 matrix.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformNormalFrom3x2Matrix(matrix: Immutable<Matrix3x2>): Vector2 {
        const m = Matrix3x2Reader.$fromTuple!(matrix.elements);
        const x = this.x;
        const y = this.y;
        this.x = x * m.$m11!() + y * m.$m21!();
        this.y = x * m.$m12!() + y * m.$m22!();

        return this;
    }

    /**
     * Transforms this vector normal by the given 4x4 matrix.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformNormalFrom4x4Matrix(matrix: Immutable<Matrix4x4>): Vector2 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = this.x;
        const y = this.y;
        this.x = x * m.$m11!() + y * m.$m21!();
        this.y = x * m.$m12!() + y * m.$m22!();

        return this;
    }

    /**
     * Transforms this vector by the given Quaternion rotation value.
     * @param rotation The rotation to apply.
     * @returns This vector after the transformation.
     */
    public transformFromQuaternion(rotation: Immutable<Quaternion>): Vector2 {
        const x2 = rotation.x + rotation.x;
        const y2 = rotation.y + rotation.y;
        const z2 = rotation.z + rotation.z;

        const wz2 = rotation.w * z2;
        const xx2 = rotation.x * x2;
        const xy2 = rotation.x * y2;
        const yy2 = rotation.y * y2;
        const zz2 = rotation.z * z2;

        const x = this.x;
        const y = this.y;

        this.x = (x * (1.0 - yy2 - zz2)) + (y * (xy2 - wz2));
        this.y = (x * (xy2 + wz2)) + (y * (1.0 - xx2 - zz2));

        return this;
    }

    /**
     * Returns the dot product of this vector and the other vector.
     * @param other The other vector.
     * @returns The dot product.
     */
    public dot(other: ReadonlyVector2): number {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns This vector after the min operation.
     */
    public minVectors(value1: ReadonlyVector2, value2: ReadonlyVector2): Vector2 {
        this.x = (value1.x < value2.x) ? value1.x : value2.x;
        this.y = (value1.y < value2.y) ? value1.y : value2.y;

        return this;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in this vector and the other vector.
     * @param other The other source vector.
     * @returns This vector after the min operation.
     */
    public min(other: ReadonlyVector2): Vector2 {
        this.x = (this.x < other.x) ? this.x : other.x;
        this.y = (this.y < other.y) ? this.y : other.y;

        return this;
    }

    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns This vector after the max operation.
     */
    public maxVectors(value1: ReadonlyVector2, value2: ReadonlyVector2): Vector2 {
        this.x = (value1.x > value2.x) ? value1.x : value2.x;
        this.y = (value1.y > value2.y) ? value1.y : value2.y;

        return this;
    }

    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in this vector and the other vector.
     * @param other The other source vector.
     * @returns This vector after max operation.
     */
    public max(other: ReadonlyVector2): Vector2 {
        this.x = (this.x > other.x) ? this.x : other.x;
        this.y = (this.y > other.y) ? this.y : other.y;

        return this;
    }

    /**
     * Returns a vector whose elements are the absolute values of this vector's elements.
     * @returns This vector after the absolute operation.
     */
    public abs(): Vector2 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);

        return this;
    }

    /**
     * Returns a vector whose elements are the square root of each of this vector's elements.
     * @returns This vector after the square root operation.
     */
    public sqrt(): Vector2 {
        this.x = Math.sqrt(this.x);
        this.y = Math.sqrt(this.y);

        return this;
    }
    
    /**
     * Adds two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the addition operation.
     */
    public addVectors(left: ReadonlyVector2, right: ReadonlyVector2): Vector2 {
        this.x = left.x + right.x;
        this.y = left.y + right.y;

        return this;
    }

    /**
     * Adds the given vector to this vector.
     * @param other The other vector.
     * @returns This vector after the addition operation.
     */
    public add(other: ReadonlyVector2): Vector2 {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    /**
     * Subtracts the second vector from the first.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the subtraction operation.
     */
    public subVectors(left: ReadonlyVector2, right: ReadonlyVector2): Vector2 {
        this.x = left.x - right.x;
        this.y = left.y - right.y;

        return this;
    }

    /**
     * Subtracts the given vector from this vector.
     * @param other The other vector.
     * @returns This vector after the subtraction operation.
     */
    public sub(other: ReadonlyVector2): Vector2 {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    /**
     * Multiplies two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the multiplication operation.
     */
    public mulVectors(left: ReadonlyVector2, right: ReadonlyVector2): Vector2 {
        this.x = left.x * right.x;
        this.y = left.y * right.y;

        return this;
    }

    /**
     * Multiplies this vector by the given vector.
     * @param other The other vector.
     * @returns This vector after the multiplication operation.
     */
    public mul(other: ReadonlyVector2): Vector2 {
        this.x *= other.x;
        this.y *= other.y;

        return this;
    }

    /**
     * Multiplies this vector by the given scalar.
     * @param other The scalar value.
     * @returns This vector after the multiplication operation.
     */
    public mulScalar(other: number): Vector2 {
        this.x *= other;
        this.y *= other;

        return this;
    }

    /**
     * Divides the first vector by the second.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the division operation.
     */
    public divVectors(left: ReadonlyVector2, right: ReadonlyVector2): Vector2 {
        this.x = left.x / right.x;
        this.y = left.y / right.y;

        return this;
    }

    /**
     * Divides this vector by the given vector.
     * @param other The other vector.
     * @returns This vector after the division operation.
     */
    public div(other: ReadonlyVector2): Vector2 {
        this.x /= other.x;
        this.y /= other.y;

        return this;
    }

    /**
     * Divides this vector by the given scalar.
     * @param other The scalar value.
     * @returns This vector after the division operation.
     */
    public divScalar(other: number): Vector2 {
        this.x /= other;
        this.y /= other;

        return this;
    }

    /**
     * Negates this vector.
     * @returns This vector after the negation operation.
     */
    public negate(): Vector2 {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    // #endregion Public Instance methods
}
