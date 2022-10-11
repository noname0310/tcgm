import type { Matrix4x4 } from "./Matrix4x4";
import { Matrix4x4Reader } from "./Matrix4x4.internalmacro";
import type { Quaternion } from "./Quaternion";
import type { Immutable, ImmutConvertible } from "./types/Immutable";
import type { Vector2 } from "./Vector2";
import type { Vector3 } from "./Vector3";
import type { XYZW } from "./VectorLike";

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

    /**
     * Returns a new Vector4 with the same x, y, z and w values as this one. 
     * @returns The new Vector4.
     */
    clone(): Vector4;

    /**
     * Returns a String representing this Vector4 instance.
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
     * Returns a boolean indicating whether the given Vector3 is equal to this Vector4 instance.
     * @param other The Vector4 to compare this instance to.
     * @returns True if the other Vector4 is equal to this instance; False otherwise.
     */
    equals(other: ReadonlyVector4): boolean;
    
    /**
     * Returns the Euclidean distance between this point and the other point.
     * @param other The other point.
     * @returns The distance.
     */
    distanceTo(other: ReadonlyVector4): number;

    /**
     * Returns the Euclidean distance squared between this point and the other point.
     * @param other The other point.
     * @returns The distance squared.
     */
    distanceSquaredTo(other: ReadonlyVector4): number;
    
    /**
     * Returns the dot product of this vector and the other vector.
     * @param other The other vector.
     * @returns The dot product.
     */
    dot(other: ReadonlyVector4): number;
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
    
    /**
     * Returns the Euclidean distance between this point and the other point.
     * @param other The other point.
     * @returns The distance.
     */
    public distanceTo(other: ReadonlyVector4): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        const dw = this.w - other.w;

        const ls = dx * dx + dy * dy + dz * dz + dw * dw;

        return Math.sqrt(ls);
    }

    /**
     * Returns the Euclidean distance squared between this point and the other point.
     * @param other The other point.
     * @returns The distance squared.
     */
    public distanceSquaredTo(other: ReadonlyVector4): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        const dw = this.w - other.w;

        return dx * dx + dy * dy + dz * dz + dw * dw;
    }
    
    /**
     * Converts this vector into a unit vector.
     * @returns This vector after the normalization.
     */
    public normalize(): Vector4 {
        const ls = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        const length = Math.sqrt(ls);
        
        if (length === 0) throw new Error("Cannot normalize a vector with length 0.");

        const invLength = 1.0 / length;
        this.x *= invLength;
        this.y *= invLength;
        this.z *= invLength;
        this.w *= invLength;

        return this;
    }

    /**
     * Restricts this vector between a min and max value.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns This vector after the restriction.
     */
    public clamp(min: ReadonlyVector4, max: ReadonlyVector4): Vector4 {
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

        let w = this.w;
        w = (w > max.w) ? max.w : w;
        w = (w < min.w) ? min.w : w;

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }
    
    /**
     * Set this vector to linearly interpolate between value1 and value2 by amount.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns This vector after the interpolation.
     */
    public lerpVectors(value1: ReadonlyVector4, value2: ReadonlyVector4, amount: number): Vector4 {
        this.x = value1.x + (value2.x - value1.x) * amount;
        this.y = value1.y + (value2.y - value1.y) * amount;
        this.z = value1.z + (value2.z - value1.z) * amount;
        this.w = value1.w + (value2.w - value1.w) * amount;

        return this;
    }
    
    /**
     * Set this vector to linearly interpolate between this vector and the other vector by amount.
     * @param other The other source vector.
     * @param amount Value between 0 and 1 indicating the weight of the second source vector.
     * @returns This vector after the interpolation.
     */
    public lerp(other: ReadonlyVector4, amount: number): Vector4 {
        this.x += (other.x - this.x) * amount;
        this.y += (other.y - this.y) * amount;
        this.z += (other.z - this.z) * amount;
        this.w += (other.w - this.w) * amount;

        return this;
    }

    /**
     * Transforms a vector2 by the given 4x4 matrix.
     * @param position The source vector.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformVector2From4x4Matrix(position: Immutable<Vector2>, matrix: Immutable<Matrix4x4>): Vector4 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = position.x;
        const y = position.y;
        this.x = x * m.$m11!() + y * m.$m21!() + m.$m41!();
        this.y = x * m.$m12!() + y * m.$m22!() + m.$m42!();
        this.z = x * m.$m13!() + y * m.$m23!() + m.$m43!();
        this.w = x * m.$m14!() + y * m.$m24!() + m.$m44!();
        
        return this;
    }

    /**
     * Transforms a vector3 by the given 4x4 matrix.
     * @param position The source vector.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformVector3FromMatrix4x4(position: Immutable<Vector3>, matrix: Immutable<Matrix4x4>): Vector4 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = position.x;
        const y = position.y;
        const z = position.z;
        this.x = x * m.$m11!() + y * m.$m21!() + z * m.$m31!() + m.$m41!();
        this.y = x * m.$m12!() + y * m.$m22!() + z * m.$m32!() + m.$m42!();
        this.z = x * m.$m13!() + y * m.$m23!() + z * m.$m33!() + m.$m43!();
        this.w = x * m.$m14!() + y * m.$m24!() + z * m.$m34!() + m.$m44!();

        return this;
    }
    
    /**
     * Transforms this vector by the given 4x4 matrix.
     * @param matrix The transformation matrix.
     * @returns This vector after the transformation.
     */
    public transformFromMatrix4x4(matrix: Immutable<Matrix4x4>): Vector4 {
        const m = Matrix4x4Reader.$fromTuple!(matrix.elements);
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;
        this.x = x * m.$m11!() + y * m.$m21!() + z * m.$m31!() + w * m.$m41!();
        this.y = x * m.$m12!() + y * m.$m22!() + z * m.$m32!() + w * m.$m42!();
        this.z = x * m.$m13!() + y * m.$m23!() + z * m.$m33!() + w * m.$m43!();
        this.w = x * m.$m14!() + y * m.$m24!() + z * m.$m34!() + w * m.$m44!();

        return this;
    }

    /**
     * Transforms a vector2 by the given Quaternion rotation value.
     * @param value The source vector to be rotated.
     * @param rotation The rotation to apply.
     * @returns This vector after the transformation.
     */
    public transformVector2FromQuaternion(value: Immutable<Vector2>, rotation: Immutable<Quaternion>): Vector4 {
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

        this.x = value.x * (1.0 - yy2 - zz2) + value.y * (xy2 - wz2);
        this.y = value.x * (xy2 + wz2) + value.y * (1.0 - xx2 - zz2);
        this.z = value.x * (xz2 - wy2) + value.y * (yz2 + wx2);
        this.w = 1.0;

        return this;
    }

    /**
     * Transforms a vector3 by the given Quaternion rotation value.
     * @param value The source vector to be rotated.
     * @param rotation The rotation to apply.
     * @returns This vector after the transformation.
     */
    public transformVector3FromQuaternion(value: Immutable<Vector3>, rotation: Immutable<Quaternion>): Vector4 {
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

        this.x = value.x * (1.0 - yy2 - zz2) + value.y * (xy2 - wz2) + value.z * (xz2 + wy2);
        this.y = value.x * (xy2 + wz2) + value.y * (1.0 - xx2 - zz2) + value.z * (yz2 - wx2);
        this.z = value.x * (xz2 - wy2) + value.y * (yz2 + wx2) + value.z * (1.0 - xx2 - yy2);
        this.w = 1.0;
        
        return this;
    }

    /**
     * Transforms this vector by the given Quaternion rotation value.
     * @param rotation The rotation to apply.
     * @returns This vector after the transformation.
     */
    public transformFromQuaternion(rotation: Immutable<Quaternion>): Vector4 {
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

        const px = this.x;
        const py = this.y;
        const pz = this.z;

        this.x = px * (1.0 - yy2 - zz2) + py * (xy2 - wz2) + pz * (xz2 + wy2);
        this.y = px * (xy2 + wz2) + py * (1.0 - xx2 - zz2) + pz * (yz2 - wx2);
        this.z = px * (xz2 - wy2) + py * (yz2 + wx2) + pz * (1.0 - xx2 - yy2);
        //this.w = this.w;

        return this;
    }
    
    /**
     * Returns the dot product of this vector and the other vector.
     * @param other The other vector.
     * @returns The dot product.
     */
    public dot(other: ReadonlyVector4): number {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns This vector after the min operation.
     */
    public minVectors(value1: ReadonlyVector4, value2: ReadonlyVector4): Vector4 {
        this.x = (value1.x < value2.x) ? value1.x : value2.x;
        this.y = (value1.y < value2.y) ? value1.y : value2.y;
        this.z = (value1.z < value2.z) ? value1.z : value2.z;
        this.w = (value1.w < value2.w) ? value1.w : value2.w;

        return this;
    }

    /**
     * Returns a vector whose elements are the minimum of each of the pairs of elements in this vector and the other vector.
     * @param other The other source vector.
     * @returns This vector after the min operation.
     */
    public min(other: ReadonlyVector4): Vector4 {
        this.x = (this.x < other.x) ? this.x : other.x;
        this.y = (this.y < other.y) ? this.y : other.y;
        this.z = (this.z < other.z) ? this.z : other.z;
        this.w = (this.w < other.w) ? this.w : other.w;

        return this;
    }

    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in the two source vectors.
     * @param value1 The first source vector.
     * @param value2 The second source vector.
     * @returns This vector after the max operation.
     */
    public maxVectors(value1: ReadonlyVector4, value2: ReadonlyVector4): Vector4 {
        this.x = (value1.x > value2.x) ? value1.x : value2.x;
        this.y = (value1.y > value2.y) ? value1.y : value2.y;
        this.z = (value1.z > value2.z) ? value1.z : value2.z;
        this.w = (value1.w > value2.w) ? value1.w : value2.w;

        return this;
    }
    
    /**
     * Returns a vector whose elements are the maximum of each of the pairs of elements in this vector and the other vector.
     * @param other The other source vector.
     * @returns This vector after max operation.
     */
    public max(other: ReadonlyVector4): Vector4 {
        this.x = (this.x > other.x) ? this.x : other.x;
        this.y = (this.y > other.y) ? this.y : other.y;
        this.z = (this.z > other.z) ? this.z : other.z;
        this.w = (this.w > other.w) ? this.w : other.w;

        return this;
    }

    /**
     * Returns a vector whose elements are the absolute values of this vector's elements.
     * @returns This vector after the absolute operation.
     */
    public abs(): Vector4 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        this.w = Math.abs(this.w);

        return this;
    }
    
    /**
     * Returns a vector whose elements are the square root of each of this vector's elements.
     * @returns This vector after the square root operation.
     */
    public sqrt(): Vector4 {
        this.x = Math.sqrt(this.x);
        this.y = Math.sqrt(this.y);
        this.z = Math.sqrt(this.z);
        this.w = Math.sqrt(this.w);

        return this;
    }
    
    /**
     * Adds two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the addition operation.
     */
    public addVectors(left: ReadonlyVector4, right: ReadonlyVector4): Vector4 {
        this.x = left.x + right.x;
        this.y = left.y + right.y;
        this.z = left.z + right.z;
        this.w = left.w + right.w;

        return this;
    }
    
    /**
     * Adds the given vector to this vector.
     * @param other The other vector.
     * @returns This vector after the addition operation.
     */
    public add(other: ReadonlyVector4): Vector4 {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        this.w += other.w;

        return this;
    }

    /**
     * Subtracts the second vector from the first.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the subtraction operation.
     */
    public subVectors(left: ReadonlyVector4, right: ReadonlyVector4): Vector4 {
        this.x = left.x - right.x;
        this.y = left.y - right.y;
        this.z = left.z - right.z;
        this.w = left.w - right.w;

        return this;
    }
    
    /**
     * Subtracts the given vector from this vector.
     * @param other The other vector.
     * @returns This vector after the subtraction operation.
     */
    public sub(other: ReadonlyVector4): Vector4 {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        this.w -= other.w;

        return this;
    }

    /**
     * Multiplies two vectors together.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the multiplication operation.
     */
    public mulVectors(left: ReadonlyVector4, right: ReadonlyVector4): Vector4 {
        this.x = left.x * right.x;
        this.y = left.y * right.y;
        this.z = left.z * right.z;
        this.w = left.w * right.w;

        return this;
    }
    
    /**
     * Multiplies this vector by the given vector.
     * @param other The other vector.
     * @returns This vector after the multiplication operation.
     */
    public mul(other: ReadonlyVector4): Vector4 {
        this.x *= other.x;
        this.y *= other.y;
        this.z *= other.z;
        this.w *= other.w;

        return this;
    }
    
    /**
     * Multiplies this vector by the given scalar.
     * @param other The scalar value.
     * @returns This vector after the multiplication operation.
     */
    public mulScalar(other: number): Vector4 {
        this.x *= other;
        this.y *= other;
        this.z *= other;
        this.w *= other;

        return this;
    }

    /**
     * Divides the first vector by the second.
     * @param left The first source vector.
     * @param right The second source vector.
     * @returns This vector after the division operation.
     */
    public divVectors(left: ReadonlyVector4, right: ReadonlyVector4): Vector4 {
        this.x = left.x / right.x;
        this.y = left.y / right.y;
        this.z = left.z / right.z;
        this.w = left.w / right.w;

        return this;
    }

    /**
     * Divides this vector by the given vector.
     * @param other The other vector.
     * @returns This vector after the division operation.
     */
    public div(other: ReadonlyVector4): Vector4 {
        this.x /= other.x;
        this.y /= other.y;
        this.z /= other.z;
        this.w /= other.w;

        return this;
    }
    
    /**
     * Divides this vector by the given scalar.
     * @param other The scalar value.
     * @returns This vector after the division operation.
     */
    public divScalar(divisor: number): Vector4 {
        const invDiv = 1.0 / divisor;

        this.x *= invDiv;
        this.y *= invDiv;
        this.z *= invDiv;
        this.w *= invDiv;

        return this;
    }
    
    /**
     * Negates this vector.
     * @returns This vector after the negation operation.
     */
    public negate(): Vector4 {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;

        return this;
    }

    // #endregion
}
