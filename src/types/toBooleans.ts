export type toBoolean<T> = {
    [K in keyof T]: boolean;
};