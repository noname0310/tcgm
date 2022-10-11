import { Matrix4x4 } from "./Matrix4x4";
import { Matrix4x4Reader } from "./Matrix4x4.internalmacro";
import { Quaternion } from "./Quaternion";
import { Immutable, ImmutConvertible } from "./types/Immutable";
import { XYZ } from "./VectorLike";

/**
 * readonly 3D vector.
 */
interface ReadonlyVector3 {
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
     * Returns a new Vector3 with the same x, y and z values as this one.
     * @returns 
     */
    clone(): Vector3;

    /**
     * Returns a String representing this Vector3 instance.
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
     * Returns a boolean indicating whether the given Vector3 is equal to this Vector3 instance.
     * @param other The Vector3 to compare this instance to.
     * @returns True if the other Vector3 is equal to this instance; False otherwise.
     */
    equals(other: ReadonlyVector3): boolean;

    /**
     * Returns the Euclidean distance between this point and the other point.
     * @param other The other point.
     * @returns The distance.
     */
    distanceTo(other: ReadonlyVector3): number;

    /**
     * Returns the Euclidean distance squared between this point and the other point.
     * @param other The other point.
     * @returns The distance squared.
     */
    distanceSquaredTo(other: ReadonlyVector3): number;
    
    /**
     * Returns the dot product of this vector and the other vector.
     * @param other The other vector.
     * @returns The dot product.
     */
    dot(other: ReadonlyVector3): number;
}

/**
 * A structure encapsulating three double precision floating point values.
 */
export class Vector3 implements ImmutConvertible<ReadonlyVector3> {
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
     * @returns The new Vector3.
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
     * Returns a String representing this Vector3 instance.
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
     * @returns True if the other Vector3 is equal to this instance; False otherwise.
     */
    public equals(other: ReadonlyVector3): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    /**
     * Returns the Euclidean distance between this point and the other point.
     * @param other The other point.
     * @returns The distance.
     */
    public distanceTo(other: ReadonlyVector3): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;

        const ls = dx * dx + dy * dy + dz * dz;

        return Math.sqrt(ls);
    }

    /**
     * Returns the Euclidean distance squared between this point and the other point.
     * @param other The other point.
     * @returns The distance squared.
     */
    public distanceSquaredTo(other: ReadonlyVector3): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        
        return dx * dx + dy * dy + dz * dz;
    }

    /**
     * Converts this vector into a unit vector.
     * @returns This vector after the normalization.
     */
    public normalize(): Vector3 {
        const ls = this.x * this.x + this.y * this.y + this.z * this.z;
        const length = Math.sqrt(ls);

        if (length === 0) throw new Error("Cannot normalize a vector with length 0.");

        const invLength = 1.0 / length;
        this.x *= invLength;
        this.y *= invLength;
        this.z *= invLength;

        return this;
    }

    /**
     * Set this vector to the cross product of itself and the given vector.
     * @param other The other vector.
     * @returns This vector after the cross product.
     */
    public cross(other: ReadonlyVector3): Vector3 {
        const x = this.x;
        const y = this.y;
        const z = this.z;

        this.x = y * other.z - z * other.y;
        this.y = z * other.x - x * other.z;
        this.z = x * other.y - y * other.x;

        return this;
    }

    /**
     * Set this vector into the reflection of the given vector around the given normal.
     * @param vector The source vector.
     * @param normal The normal of the surface being reflected off.
     * @returns This vector after the reflection.
     */
    public reflect(vector: ReadonlyVector3, normal: ReadonlyVector3): Vector3 {
        const dot = vector.x * normal.x + vector.y * normal.y + vector.z * normal.z;
        const tempX = normal.x * dot * 2.0;
        const tempY = normal.y * dot * 2.0;
        const tempZ = normal.z * dot * 2.0;

        this.x = vector.x - tempX;
        this.y = vector.y - tempY;
        this.z = vector.z - tempZ;

        return this;
    }

    /**
     * Restricts this vector between a min and max value.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns This vector after the restriction.
     */
    public clamp(min: ReadonlyVector3, max: ReadonlyVector3): Vector3 {
        // This compare order is very important!!!
        // We must follow HLSL behavior in the case user specified min value is bigger than max value.

        let x = this.x;
        x = (x > max.x) ? max.x : x;
        x = (x < min.x) ? min.x : x;

        let y = this.y;
        y = (y > max.y) ? max.y : y;
        y = (y < min.y) ? min.y : y;

        let z = this.z;
        z = (z > max.z) ? max.z : z;
        z = (z < min.z) ? min.z : z;

        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    /**
     * Set this vector to linearly interpolate between value1 and value2 by amount.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns This vector after the interpolation.
     */
    public lerpVectors(value1: ReadonlyVector3, value2: ReadonlyVector3, amount: number): Vector3 {
        this.x = value1.x + (value2.x - value1.x) * amount;
        this.y = value1.y + (value2.y - value1.y) * amount;
        this.z = value1.z + (value2.z - value1.z) * amount;

        return this;
    }

    /**
     * Set this vector to linearly interpolate between this vector and the other vector by amount.
     * @param other The other source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns This vector after the interpolation.
     */
    public lerp(other: ReadonlyVector3, amount: number): Vector3 {
        this.x += (other.x - this.x) * amount;
        this.y += (other.y - this.y) * amount;
        this.z += (other.z - this.z) * amount;

        return this;
    }

    /**
     * Transforms this vector by the given 4x4 matrix.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformFrom4x4Matrix(matrix: Immutable<Matrix4x4>): Vector3 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = this.x;
        const y = this.y;
        const z = this.z;
        this.x = x * m.$m11!() + y * m.$m21!() + z * m.$m31!() + m.$m41!();
        this.y = x * m.$m12!() + y * m.$m22!() + z * m.$m32!() + m.$m42!();
        this.z = x * m.$m13!() + y * m.$m23!() + z * m.$m33!() + m.$m43!();

        return this;
    }

    /**
     * Transforms this vector normal by the given 3x2 matrix.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformNormalFrom4x4Matrix(matrix: Immutable<Matrix4x4>): Vector3 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = this.x;
        const y = this.y;
        const z = this.z;
        this.x = x * m.$m11!() + y * m.$m21!() + z * m.$m31!();
        this.y = x * m.$m12!() + y * m.$m22!() + z * m.$m32!();
        this.z = x * m.$m13!() + y * m.$m23!() + z * m.$m33!();
        
        return this;
    }

    /**
     * Transforms this vector by the given Quaternion rotation value.
     * @param rotation The rotation to apply.
     * @returns This vector after the transformation.
     */
    public transformFromQuaternion(rotation: Immutable<Quaternion>): Vector3 {
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

        const x = this.x;
        const y = this.y;
        const z = this.z;

        this.x = x * (1.0 - yy2 - zz2) + y * (xy2 - wz2) + z * (xz2 + wy2);
        this.y = x * (xy2 + wz2) + y * (1.0 - xx2 - zz2) + z * (yz2 - wx2);
        this.z = x * (xz2 - wy2) + y * (yz2 + wx2) + z * (1.0 - xx2 - yy2);

        return this;
    }

    /**
     * Returns the dot product of this vector and the other vector.
     * @param other The other vector.
     * @returns The dot product.
     */
    public dot(other: ReadonlyVector3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns This vector after the min operation.
     */
    public minVectors(value1: ReadonlyVector3, value2: ReadonlyVector3): Vector3 {
        this.x = (value1.x < value2.x) ? value1.x : value2.x;
        this.y = (value1.y < value2.y) ? value1.y : value2.y;
        this.z = (value1.z < value2.z) ? value1.z : value2.z;

        return this;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in this vector and the other vector.
     * @param other The other source vector.
     * @returns This vector after the min operation.
     */
    public min(other: ReadonlyVector3): Vector3 {
        this.x = (this.x < other.x) ? this.x : other.x;
        this.y = (this.y < other.y) ? this.y : other.y;
        this.z = (this.z < other.z) ? this.z : other.z;

        return this;
    }

    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns This vector after the max operation.
     */
    public maxVectors(value1: ReadonlyVector3, value2: ReadonlyVector3): Vector3 {
        this.x = (value1.x > value2.x) ? value1.x : value2.x;
        this.y = (value1.y > value2.y) ? value1.y : value2.y;
        this.z = (value1.z > value2.z) ? value1.z : value2.z;

        return this;
    }
    
    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in this vector and the other vector.
     * @param other The other source vector.
     * @returns This vector after max operation.
     */
    public max(other: ReadonlyVector3): Vector3 {
        this.x = (this.x > other.x) ? this.x : other.x;
        this.y = (this.y > other.y) ? this.y : other.y;
        this.z = (this.z > other.z) ? this.z : other.z;

        return this;
    }
    
    /**
     * Returns a vector whose elements are the absolute values of this vector's elements.
     * @returns This vector after the absolute operation.
     */
    public abs(): Vector3 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);

        return this;
    }

    /**
     * Returns a vector whose elements are the square root of each of this vector's elements.
     * @returns This vector after the square root operation.
     */
    public sqrt(): Vector3 {
        this.x = Math.sqrt(this.x);
        this.y = Math.sqrt(this.y);
        this.z = Math.sqrt(this.z);

        return this;
    }

    /**
     * Adds two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the addition operation.
     */
    public addVectors(left: ReadonlyVector3, right: ReadonlyVector3): Vector3 {
        this.x = left.x + right.x;
        this.y = left.y + right.y;
        this.z = left.z + right.z;

        return this;
    }

    /**
     * Adds the given vector to this vector.
     * @param other The other vector.
     * @returns This vector after the addition operation.
     */
    public add(other: ReadonlyVector3): Vector3 {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;

        return this;
    }

    /**
     * Subtracts the second vector from the first.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the subtraction operation.
     */
    public subVectors(left: ReadonlyVector3, right: ReadonlyVector3): Vector3 {
        this.x = left.x - right.x;
        this.y = left.y - right.y;
        this.z = left.z - right.z;

        return this;
    }

    /**
     * Subtracts the given vector from this vector.
     * @param other The other vector.
     * @returns This vector after the subtraction operation.
     */
    public sub(other: ReadonlyVector3): Vector3 {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;

        return this;
    }

    /**
     * Multiplies two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the multiplication operation.
     */
    public mulVectors(left: ReadonlyVector3, right: ReadonlyVector3): Vector3 {
        this.x = left.x * right.x;
        this.y = left.y * right.y;
        this.z = left.z * right.z;

        return this;
    }

    /**
     * Multiplies this vector by the given vector.
     * @param other The other vector.
     * @returns This vector after the multiplication operation.
     */
    public mul(other: ReadonlyVector3): Vector3 {
        this.x *= other.x;
        this.y *= other.y;
        this.z *= other.z;

        return this;
    }

    /**
     * Multiplies this vector by the given scalar.
     * @param other The scalar value.
     * @returns This vector after the multiplication operation.
     */
    public mulScalar(other: number): Vector3 {
        this.x *= other;
        this.y *= other;
        this.z *= other;

        return this;
    }

    /**
     * Divides the first vector by the second.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the division operation.
     */
    public divVectors(left: ReadonlyVector3, right: ReadonlyVector3): Vector3 {
        this.x = left.x / right.x;
        this.y = left.y / right.y;
        this.z = left.z / right.z;

        return this;
    }

    /**
     * Divides this vector by the given vector.
     * @param other The other vector.
     * @returns This vector after the division operation.
     */
    public div(other: ReadonlyVector3): Vector3 {
        this.x /= other.x;
        this.y /= other.y;
        this.z /= other.z;

        return this;
    }

    /**
     * Divides this vector by the given scalar.
     * @param other The scalar value.
     * @returns This vector after the division operation.
     */
    public divScalar(other: number): Vector3 {
        const invDiv = 1.0 / other;

        this.x *= invDiv;
        this.y *= invDiv;
        this.z *= invDiv;

        return this;
    }

    /**
     * Negates this vector.
     * @returns This vector after the negation operation.
     */
    public negate(): Vector3 {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;
    }
    
    // #endregion
}
