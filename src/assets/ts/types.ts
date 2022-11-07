export interface Callback<E, R> {
    (e: E): R;
}

export interface EscapeTable {
    key: RegExp,
    replace: string
}

export type DataGroup = "switch" | "router" | "linux" | "java" | "cisco" | "cli" | "others";

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

export interface WikiPage {
    title: string,
    file: string
}

export interface WikiResolvePage {
    title: string,
    struct: string,
    file: string
}

export type _R = {
    GROUPS: {
        SWITCH: DataGroup,
        ROUTER: DataGroup,
        LINUX: DataGroup,
        JAVA: DataGroup,
        CISCO: DataGroup,
        CLI: DataGroup,
        OTHERS: DataGroup
    }
    PAGES: {
        DEFAULT_ROOT: string,
        GLOBAL_SEARCH: string,
        SETTINGS: string,
        HOME: string,
        WIKI: string
    },
    ID: {
        QUERY: string,
        SEARCH_TABLE: string,
        WIKI_DATA: string
    }
}