import { Matrix3x2Tuple } from "./Matrix3x2";

export interface Matrix3x2Reader {
    type: "Matrix3x2Reader";
    $m11(): number;
    $m12(): number;
    $m21(): number;
    $m22(): number;
    $m31(): number;
    $m32(): number;
}

export namespace Matrix3x2Reader {
    export namespace Methods {
        export function $asData(self: Matrix3x2Reader): Readonly<Matrix3x2Tuple> {
            return self as unknown as Readonly<Matrix3x2Tuple>;
        }

        export function $m11(self: Matrix3x2Reader): number {
            return $asData!(self)[0];
        }

        export function $m12(self: Matrix3x2Reader): number {
            return $asData!(self)[3];
        }

        export function $m21(self: Matrix3x2Reader): number {
            return $asData!(self)[1];
        }

        export function $m22(self: Matrix3x2Reader): number {
            return $asData!(self)[4];
        }

        export function $m31(self: Matrix3x2Reader): number {
            return $asData!(self)[2];
        }

        export function $m32(self: Matrix3x2Reader): number {
            return $asData!(self)[5];
        }
    }

    export function $fromTuple(tuple: Readonly<Matrix3x2Tuple>): Matrix3x2Reader {
        return tuple as unknown as Matrix3x2Reader;
    }
}

export interface Matrix3x2Writer {
    type: "Matrix3x2Writer";
    $m11(value: number): number;
    $m12(value: number): number;
    $m21(value: number): number;
    $m22(value: number): number;
    $m31(value: number): number;
    $m32(value: number): number;
}

export namespace Matrix3x2Writer {
    export namespace Methods {
        export function $asData(self: Matrix3x2Writer): Matrix3x2Tuple {
            return self as unknown as Matrix3x2Tuple;
        }

        export function $m11(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[0] = value;
        }

        export function $m12(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[3] = value;
        }

        export function $m21(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[1] = value;
        }

        export function $m22(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[4] = value;
        }

        export function $m31(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[2] = value;
        }

        export function $m32(self: Matrix3x2Writer, value: number): number {
            return $asData!(self)[5] = value;
        }
    }

    export function $fromTuple(tuple: Matrix3x2Tuple): Matrix3x2Writer {
        return tuple as unknown as Matrix3x2Writer;
    }
}
