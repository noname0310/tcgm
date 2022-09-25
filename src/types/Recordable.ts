export interface Recordable {
    copy(other: this): this;
    clone(): this;
}
