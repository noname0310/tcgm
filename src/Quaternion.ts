/**
 * A structure encapsulating a four-dimensional vector (x,y,z,w),
 * which is used to efficiently rotate an object about the (x,y,z) vector by the angle theta, where w = cos(theta/2).
 */
export class Quaternion {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}
