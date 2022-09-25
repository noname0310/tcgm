export function $m1() {
    return 1;
}

export namespace Vector3 {
    export function $new() {
        return [0, 0, 0];
    }
}

export namespace Vector2 {
    export function $new() {
        return [0, 0];
    }
}

const test1 = Vector3.$new!();
const test2 = Vector2.$new!();

test1;
test2;
