import { Matrix3x2, Matrix3x2Array } from "./Matrix3x2";
import { Matrix4x4, Matrix4x4Array } from "./Matrix4x4";
import { Quaternion } from "./Quaternion";

/**
 * A structure encapsulating two double precision floating point values.
 */
export class Vector2 {
    // #region Public Static Properties

    /**
     * The vector (0,0).
     */
    public static readonly zero = new Vector2(0, 0);
    /**
     * The vector (1,1).
     */
    public static readonly one = new Vector2(1, 1);
    /**
     * The vector (1,0).
     */
    public static readonly unitX = new Vector2(1, 0);
    /**
     * The vector (0,1).
     */
    public static readonly unitY = new Vector2(0, 1);

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
     * Constructs a vector with the given individual elements.
     * @param x The X component.
     * @param y The Y component.
     */
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // #endregion Constructors

    // #region Public Instance methods

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
    public copyTo(array: number[], index = 0): void {
        array[index] = this.x;
        array[index + 1] = this.y;
    }

    /**
     * Returns a boolean indicating whether the given Vector2 is equal to this Vector2 instance.
     * @param other The Vector2 to compare this instance to.
     * @returns True if the other Vector2 is equal to this instance; False otherwise.
     */
    public equals(other: Vector2): boolean {
        return this.x == other.x && this.y == other.y;
    }

    // #endregion Public Instance Methods

    // #region Public Static Methods

    /**
     * Returns the Euclidean distance between the two given points.
     * @param value1 The first point.
     * @param value2 The second point.
     * @returns The distance.
     */
    public static distance(value1: Vector2, value2: Vector2): number {
        const dx = value1.x - value2.x;
        const dy = value1.y - value2.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Returns the Euclidean distance squared between the two given points.
     * @param value1 The first point.
     * @param value2 The second point.
     * @returns The distance squared.
     */
    public static distanceSquared(value1: Vector2, value2: Vector2): number {
        const dx = value1.x - value2.x;
        const dy = value1.y - value2.y;

        return dx * dx + dy * dy;
    }

    /**
     * Returns a vector with the same direction as the given vector, but with a length of 1.
     * @param value The vector to normalize.
     * @returns The normalized vector.
     */
    public static normalize(value: Vector2): Vector2 {
        const ls = value.x * value.x + value.y * value.y;
        const invNorm = 1.0 / Math.sqrt(ls);

        return new Vector2(value.x * invNorm, value.y * invNorm);
    }

    /**
     * Returns the reflection of a vector off a surface that has the specified normal.
     * @param vector The source vector.
     * @param normal The normal of the surface being reflected off.
     * @returns The reflected vector.
     */
    public static reflect(vector: Vector2, normal: Vector2): Vector2 {
        const dot = vector.x * normal.x + vector.y * normal.y;
        return new Vector2(
            vector.x - 2.0 * dot * normal.x,
            vector.y - 2.0 * dot * normal.y
        );
    }

    /**
     * Restricts a vector between a min and max value.
     * @param value1 The source vector.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns The restricted vector.
     */
    public static clamp(value1: Vector2, min: Vector2, max: Vector2): Vector2 {
        // This compare order is very important!!!
        // We must follow HLSL behavior in the case user specified min value is bigger than max value.
        let x = value1.x;
        x = (x > max.x) ? max.x : x;
        x = (x < min.x) ? min.x : x;

        let y = value1.y;
        y = (y > max.y) ? max.y : y;
        y = (y < min.y) ? min.y : y;

        return new Vector2(x, y);
    }

    /**
     * Linearly interpolates between two vectors based on the given weighting.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns The interpolated vector.
     */
    public static lerp(value1: Vector2, value2: Vector2, amount: number): Vector2 {
        return new Vector2(
            value1.x + (value2.x - value1.x) * amount,
            value1.y + (value2.y - value1.y) * amount
        );
    }

    /**
     * Transforms a vector by the given 3x2 matrix.
     * @param position The source vector.
     * @param matrix The transformation matrix.
     * @returns The transformed vector.
     */
    public static transform3x2Matrix(position: Vector2, matrix: Matrix3x2): Vector2 {
        const a = Matrix3x2Array.$fromMatrix3x2!(matrix);
        return new Vector2(
            position.x * a.$getM11!() + position.y * a.$getM21!() + a.$getM31!(),
            position.x * a.$getM12!() + position.y * a.$getM22!() + a.$getM32!()
        );
    }

    /**
     * Transforms a vector by the given 4x4 matrix.
     * @param position The source vector.
     * @param matrix The transformation matrix.
     */
    public static transform4x4Matrix(position: Vector2, matrix: Matrix4x4): Vector2 {
        const a = Matrix4x4Array.$fromMatrix4x4!(matrix);
        return new Vector2(
            position.x * a.$getM11!() + position.y * a.$getM21!() + a.$getM41!(),
            position.x * a.$getM12!() + position.y * a.$getM22!() + a.$getM42!()
        );
    }

    /**
     * Transforms a vector normal by the given 3x2 matrix.
     * @param normal The source vector.
     * @param matrix The transformation matrix.
     * @returns The transformed vector.
     */
    public static transformNormal3x2Matrix(normal: Vector2, matrix: Matrix3x2): Vector2 {
        const a = Matrix3x2Array.$fromMatrix3x2!(matrix);
        return new Vector2(
            normal.x * a.$getM11!() + normal.y * a.$getM21!(),
            normal.x * a.$getM12!() + normal.y * a.$getM22!()
        );
    }

    /**
     * Transforms a vector normal by the given 4x4 matrix.
     * @param normal The source vector.
     * @param matrix The transformation matrix.
     * @returns The transformed vector.
     */
    public static transformNormal4x4Matrix(normal: Vector2, matrix: Matrix4x4): Vector2 {
        const a = Matrix4x4Array.$fromMatrix4x4!(matrix);
        return new Vector2(
            normal.x * a.$getM11!() + normal.y * a.$getM21!(),
            normal.x * a.$getM12!() + normal.y * a.$getM22!()
        );
    }

    /**
     * Transforms a vector by the given Quaternion rotation value.
     * @param value The source vector to be rotated.
     * @param rotation The rotation to apply.
     * @returns The transformed vector.
     */
    public static transformQuaternion(value: Vector2, rotation: Quaternion): Vector2 {
        const x2 = rotation.x + rotation.x;
        const y2 = rotation.y + rotation.y;
        const z2 = rotation.z + rotation.z;

        const wz2 = rotation.w * z2;
        const xx2 = rotation.x * x2;
        const xy2 = rotation.x * y2;
        const yy2 = rotation.y * y2;
        const zz2 = rotation.z * z2;

        return new Vector2(
            value.x * (1.0 - yy2 - zz2) + value.y * (xy2 - wz2),
            value.x * (xy2 + wz2) + value.y * (1.0 - xx2 - zz2)
        );
    }

    /**
     * Returns the dot product of two vectors.
     * @param value1 The first vector.
     * @param value2 The second vector.
     * @returns 
     */
    public static dot(value1: Vector2, value2: Vector2): number {
        return value1.x * value2.x + value1.y * value2.y;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns The minimized vector.
     */
    public static min(value1: Vector2, value2: Vector2): Vector2 {
        return new Vector2(
            (value1.x < value2.x) ? value1.x : value2.x,
            (value1.y < value2.y) ? value1.y : value2.y);
    }

    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns The maximized vector.
     */
    public static max(value1: Vector2, value2: Vector2): Vector2 {
        return new Vector2(
            (value1.x > value2.x) ? value1.x : value2.x,
            (value1.y > value2.y) ? value1.y : value2.y);
    }

    /**
     * Returns a vector whose elements are the absolute values of each of the source vector's elements.
     * @param value The source vector.
     * @returns The absolute value vector.
     */
    public static abs(value: Vector2): Vector2 {
        return new Vector2(Math.abs(value.x), Math.abs(value.y));
    }

    /**
     * Returns a vector whose elements are the square root of each of the source vector's elements.
     * @param value The source vector.
     * @returns The square root vector.
     */
    public static sqrt(value: Vector2): Vector2 {
        return new Vector2(Math.sqrt(value.x), Math.sqrt(value.y));
    }
    
    /**
     * Adds two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The summed vector.
     */
    public static add(left: Vector2, right: Vector2): Vector2 {
        return new Vector2(left.x + right.x, left.y + right.y);
    }

    /**
     * Subtracts the second vector from the first.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The difference vector.
     */
    public static sub(left: Vector2, right: Vector2): Vector2 {
        return new Vector2(left.x - right.x, left.y - right.y);
    }

    /**
     * Multiplies two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The product vector.
     */
    public static mul(left: Vector2, right: Vector2): Vector2 {
        return new Vector2(left.x * right.x, left.y * right.y);
    }

    /**
     * Multiplies a vector by the given scalar.
     * @param left The source vector.
     * @param right The scalar value.
     * @returns The scaled vector.
     */
    public static mulScalar(left: Vector2, right: number): Vector2 {
        return new Vector2(left.x * right, left.y * right);
    }

    /**
     * Divides the first vector by the second.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns The vector resulting from the division.
     */
    public static div(left: Vector2, right: Vector2): Vector2 {
        return new Vector2(left.x / right.x, left.y / right.y);
    }

    /**
     * Divides the vector by the given scalar.
     * @param value1 The source vector.
     * @param value2 The scalar value.
     * @returns The result of the division.
     */
    public static divScalar(value1: Vector2, value2: number): Vector2 {
        const invDiv = 1 / value2;
        return new Vector2(value1.x * invDiv, value1.y * invDiv);
    }

    /**
     * Negates a given vector.
     * @param value The source vector.
     * @returns The negated vector.
     */
    public static negate(value: Vector2): Vector2 {
        return new Vector2(-value.x, -value.y);
    }

    /**
     * Returns a boolean indicating whether the two given vectors are equal.
     * @param left The first vector to compare.
     * @param right The second vector to compare.
     * @returns True if the vectors are equal; False otherwise.
     */
    public static equals(left: Vector2, right: Vector2): boolean {
        return left.x == right.x && left.y == right.y;
    }

    // #endregion Public Static Methods
}
