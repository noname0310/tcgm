import type { Matrix4x4 } from "./Matrix4x4";
import { Matrix4x4Reader } from "./Matrix4x4.internalmacro";
import type { Quaternion } from "./Quaternion";
import type { Immutable, ImmutConvertible } from "./types/Immutable";
import type { Vector3 } from "./Vector3";
import type { Vector4 } from "./Vector4";

/**
 * Readonly 3D plane.
 */
interface ReadonlyPlane {
    /**
     * The normal vector of the Plane.
     */
    readonly normal: Immutable<Vector3>;

    /**
     * The distance of the Plane along its normal from the origin.
     */
    readonly d: number;

    /**
     * Calculates the dot product of a Plane and Vector4.
     * @param value The Vector4.
     * @returns The dot product.
     */
    dot(value: Immutable<Vector4>): number;

    /**
     * Returns the dot product of a specified Vector3 and the normal vector of this Plane plus the distance (D) value of the Plane.
     * @param value The Vector3.
     * @returns The resulting value.
     */
    dotCoordinate(value: Immutable<Vector3>): number;

    /**
     * Returns the dot product of a specified Vector3 and the Normal vector of this Plane.
     * @param value The Vector3.
     * @returns The resulting dot product.
     */
    dotNormal(value: Immutable<Vector3>): number;

    /**
     * Returns a boolean indicating whether the given Plane is equal to this Plane instance.
     * @param other The Plane to compare this instance to.
     * @returns True if the other Plane is equal to this instance; False otherwise.
     */
    equals(other: ReadonlyPlane): boolean;

    /**
     * Returns a String representing this Plane instance.
     * @return The string representation.
     */
    toString(): string;
}

/**
 * A structure encapsulating a 3D Plane
 */
export class Plane implements ImmutConvertible<ReadonlyPlane> {
    /**
     * The normal vector of the Plane.
     */
    public normal: Vector3;

    /**
     * The distance of the Plane along its normal from the origin.
     */
    public d: number;

    /**
     * Constructs a Plane from the given normal and distance along the normal from the origin.
     * @param normal The Plane's normal vector.
     * @param d The Plane's distance from the origin along its normal vector.
     */
    public constructor(normal: Immutable<Vector3>, d: number) {
        this.normal = normal.clone();
        this.d = d;
    }
    
    /**
     * Freezes the plane and returns it.
     */
    public freeze(): ReadonlyPlane {
        return Object.freeze(this);
    }

    /**
     * Make a Plane that contains the three given points.
     * @param point1 The first point defining the Plane.
     * @param point2 The second point defining the Plane.
     * @param point3 The third point defining the Plane.
     * @returns This Plane, initialized with the three given points.
     */
    public makeFromVertices(point1: Immutable<Vector3>, point2: Immutable<Vector3>, point3: Immutable<Vector3>): Plane {
        const ax = point2.x - point1.x;
        const ay = point2.y - point1.y;
        const az = point2.z - point1.z;

        const bx = point3.x - point1.x;
        const by = point3.y - point1.y;
        const bz = point3.z - point1.z;

        // N=Cross(a,b)
        const nx = ay * bz - az * by;
        const ny = az * bx - ax * bz;
        const nz = ax * by - ay * bx;

        // Normalize(N)
        const ls = nx * nx + ny * ny + nz * nz;
        const invNorm = 1.0 / Math.sqrt(ls);

        const normal = this.normal;
        normal.x = nx * invNorm;
        normal.y = ny * invNorm;
        normal.z = nz * invNorm;
        this.d = -(normal.x * point1.x + normal.y * point1.y + normal.z * point1.z);
        
        return this;
    }

    /**
     * Convert This Plane normal vector to a unit vector.
     * @returns This Plane, with its normal vector normalized.
     */
    public normalize(): Plane {
        const fltEpsilon = 1.192092896e-07; // smallest such that 1.0+FLT_EPSILON != 1.0
        
        const normal = this.normal;
        const f = normal.x * normal.x + normal.y * normal.y + normal.z * normal.z;

        if (Math.abs(f - 1.0) < fltEpsilon) {
            return this; // It already normalized, so we don't need to further process.
        }

        if (f === 0.0) throw new Error("Cannot normalize a vector with length 0.");

        const fInv = 1.0 / Math.sqrt(f);

        normal.x *= fInv;
        normal.y *= fInv;
        normal.z *= fInv;
        this.d *= fInv;

        return this;
    }

    private static _tempMatrix4x4: Matrix4x4|null = null;

    /**
     * Transforms a normalized Plane by a Matrix.
     * 
     * This Plane must already be normalized, so that its Normal vector is of unit length, before this method is called.
     * @param matrix The transformation matrix to apply to the Plane.
     * @returns This plane transformed by the given matrix.
     */
    public transformFromMatrix4x4(matrix: Immutable<Matrix4x4>): Plane {
        let inverted: Matrix4x4;
        if (!Plane._tempMatrix4x4) {
            inverted = Plane._tempMatrix4x4 = matrix.clone(); //note: fix this
        } else {
            inverted = Plane._tempMatrix4x4.copy(matrix);
        }
        inverted.invert();
        
        const m = Matrix4x4Reader.$fromTuple(inverted.elements);

        const normal = this.normal;
        const x = normal.x, y = normal.y, z = normal.z, w = this.d;

        normal.x = x * m.$m11!() + y * m.$m12!() + z * m.$m13!() + w * m.$m14!();
        normal.y = x * m.$m21!() + y * m.$m22!() + z * m.$m23!() + w * m.$m24!();
        normal.z = x * m.$m31!() + y * m.$m32!() + z * m.$m33!() + w * m.$m34!();
        this.d = x * m.$m41!() + y * m.$m42!() + z * m.$m43!() + w * m.$m44!();

        return this;
    }

    /**
     * Transforms a normalized Plane by a Quaternion rotation.
     * 
     * This Plane must already be normalized, so that its Normal vector is of unit length, before this method is called.
     * @param rotation The Quaternion rotation to apply to the Plane.
     * @returns This plane transformed by the given rotation.
     */
    public transformFromQuaternion(rotation: Immutable<Quaternion>): Plane {
        // Compute rotation matrix.
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

        const m11 = 1.0 - yy2 - zz2;
        const m21 = xy2 - wz2;
        const m31 = xz2 + wy2;

        const m12 = xy2 + wz2;
        const m22 = 1.0 - xx2 - zz2;
        const m32 = yz2 - wx2;

        const m13 = xz2 - wy2;
        const m23 = yz2 + wx2;
        const m33 = 1.0 - xx2 - yy2;

        const normal = this.normal;
        const x = normal.x, y = normal.y, z = normal.z;

        normal.x = x * m11 + y * m12 + z * m13;
        normal.y = x * m21 + y * m22 + z * m23;
        normal.z = x * m31 + y * m32 + z * m33;
        //this.d = this.d;
        
        return this;
    }

    /**
     * Calculates the dot product of a Plane and Vector4.
     * @param value The Vector4.
     * @returns The dot product.
     */
    public dot(value: Immutable<Vector4>): number {
        const normal = this.normal;
        return normal.x * value.x + normal.y * value.y + normal.z * value.z + this.d * value.w;
    }

    /**
     * Returns the dot product of a specified Vector3 and the normal vector of this Plane plus the distance (D) value of the Plane.
     * @param value The Vector3.
     * @returns The resulting value.
     */
    public dotCoordinate(value: Immutable<Vector3>): number {
        const normal = this.normal;
        return normal.x * value.x + normal.y * value.y + normal.z * value.z + this.d;
    }

    /**
     * Returns the dot product of a specified Vector3 and the Normal vector of this Plane.
     * @param value The Vector3.
     * @returns The resulting dot product.
     */
    public dotNormal(value: Immutable<Vector3>): number {
        const normal = this.normal;
        return normal.x * value.x + normal.y * value.y + normal.z * value.z;
    }

    /**
     * Returns a boolean indicating whether the given Plane is equal to this Plane instance.
     * @param other The Plane to compare this instance to.
     * @returns True if the other Plane is equal to this instance; False otherwise.
     */
    public equals(other: ReadonlyPlane): boolean {
        const normal = this.normal;
        const otherNormal = other.normal;
        return (
            normal.x == otherNormal.x &&
            normal.y == otherNormal.y &&
            normal.z == otherNormal.z &&
            this.d == other.d
        );
    }

    /**
     * Returns a String representing this Plane instance.
     * @return The string representation.
     */
    public toString(): string {
        return "{Normal:" + this.normal.toString() + " D:" + this.d + "}";
    }
}
