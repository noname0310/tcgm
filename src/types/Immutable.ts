type Primitive = undefined|null|boolean|string|number|Function|Element;
 
type DeepReadonly<T> = 
    T extends Primitive
        ? T
        : T extends Array<infer U>
            ? DeepReadonlyArray<U>
            : T extends Map<infer K, infer V>
                ? DeepReadonlyMap<K, V>
                : DeepImmutableObject<T>;
 
type DeepImmutableObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
 
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }
 
interface DeepReadonlyMap<K, V> extends ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> { }

/**
 * Objects that can be converted to the Immutable<T> type implement this interface.
 */
export type ImmutConvertable<T = any> = T & {
    freeze(): Immutable<T>;
};

/**
 * It is a type that makes the type immutable. (More precisely, it's more like read only.)
 */
export type Immutable<T extends ImmutConvertable> = 
    T extends ImmutConvertable<infer U>
        ? U
        : DeepReadonly<T>;
