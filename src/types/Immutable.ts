export type ImmutConvertable<T = any> = T & {
    freeze(): T;
};

export type Immutable<T extends ImmutConvertable> = 
    T extends ImmutConvertable<infer U>
        ? U
        : never;

//------------------------------

interface ReadonlyVector3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;
}

class Vector3 implements ImmutConvertable<ReadonlyVector3> {
    public x: number;
    public y: number;
    public z: number;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public freeze(): ReadonlyVector3 {
        return Object.freeze(this);
    }

    public set(x: number, y: number, z: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

//------------------------------

interface ReadonlyVector2 {
    readonly x: number;
    readonly y: number;
}

export class Vector2 implements ImmutConvertable<ReadonlyVector2> {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public freeze(): ReadonlyVector2 {
        return Object.freeze(this);
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}

//------------------------------

class CustomStorage<T extends ImmutConvertable> {
    private _value: Immutable<T>|null = null;

    public setValue(value: Immutable<T>): void {
        this._value = value;
        this._value;
    }
}
const storage = new CustomStorage<Vector3>();
const vector3 = new Vector3(1, 2, 3);
storage.setValue(vector3);
