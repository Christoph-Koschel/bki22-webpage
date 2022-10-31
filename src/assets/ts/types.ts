export interface Callback<E, R> {
    (e: E): R;
}

export interface EscapeTable {
    key: RegExp,
    replace: string
}

export type DataGroup = "switch" | "router" | "linux" | "java" | "cisco";

export interface DBDataArgument {
    key: string,
    description: string
}

export interface DBData {
    groups: DataGroup[],
    description: string,
    prefix: string,
    cmd: string,
    arguments: DBDataArgument[];
}

export interface SearchResultParameter<T> {
    quote: number,
    item: T
}