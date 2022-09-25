import { Vector2 } from "../src/macro/Vector2";
import { Vector3 } from "../src/macro/Vector3";

const vec1 = Vector2.$new!();
console.log(vec1.$x!());
console.log(vec1.$y!());
const vec2 = Vector2.$from!(1, 2);
vec2;

const vec3 = Vector3.$new!();
console.log(vec3.$x!());
console.log(vec3.$y!());
console.log(vec3.$z!());
const vec4 = Vector3.$from!(1, 2, 3);
vec4;

export {};
