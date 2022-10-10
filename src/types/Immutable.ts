type FunctionLike = (...args: any[]) => any;

type Primitive = undefined|null|boolean|string|number|FunctionLike|Element;
 
type DeepReadonly<T> = 
    T extends Primitive
        ? T
        : T extends (infer U)[]
            ? DeepReadonlyArray<U>
            : T extends Map<infer K, infer V>
                ? DeepReadonlyMap<K, V>
                : DeepImmutableObject<T>;
 
type DeepImmutableObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
 
type DeepReadonlyArray<T> = readonly DeepReadonly<T>[]
 
type DeepReadonlyMap<K, V> = ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>

/**
 * Objects that can be converted to the Immutable<T> type implement this interface.
 */
export type ImmutConvertible<T = any> = T & {
    freeze(): Immutable<T>;
};

/**
 * It is a type that makes the type immutable. (More precisely, it's more like read only.)
 */
export type Immutable<T extends ImmutConvertible> = 
    T extends ImmutConvertible<infer U>
        ? U
        : DeepReadonly<T>;
