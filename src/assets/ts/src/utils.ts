import {REFType, DataGroup, DBData, EscapeTable, WikiResolvePage} from "./types";
import {Storage} from "./Storage";

export const ESCAPE_TABLE: EscapeTable[] = [
    {
        key: /</gi,
        replace: "&lt;"
    },
    {
        key: /\n/g,
        replace: "<br>"
    }
];

let pageID = 0;

function next() {
    return "p" + (pageID++);
}

export const REF: REFType = {
    GROUPS: {
        SWITCH: "switch",
        ROUTER: "router",
        LINUX: "linux",
        WINDOWS: "windows",
        JAVA: "java",
        CISCO: "cisco",
        CLI: "cli",
        OTHERS: "others"
    },
    PAGES: {
        DEFAULT_ROOT: "default",
        GLOBAL_SEARCH: next(),
        SETTINGS: next(),
        HOME: next(),
        WIKI: next()
    },
    ID: {
        QUERY: "storage.query",
        SEARCH_TABLE: "storage.search-table",
        WIKI_DATA: "storage.wiki-data"
    }
}


export function arr_contains<T>(query: T[], search: T[]): boolean {
    for (const q of query) {
        for (const s of search) {
            if (q == s) {
                return true;
            }
        }
    }

    return false;
}

export function arr_contains_count<T>(query: T[], search: T[]): number {
    let count = 0;

    for (const q of query) {
        for (const s of search) {
            if (q == s) {
                count++;
            }
        }
    }

    return count;
}

export function string_contains(query: string, search: string[]): boolean {
    for (const s of search) {
        if (query.indexOf(s) != -1) {
            return true;
        }
    }

    return false;
}

export function string_contains_count(query: string, search: string[]): number {
    let count = 0;
    console.log(search, query);
    for (const s of search) {
        if (query.indexOf(s) != -1) {
            debugger;
            count++;
        }
    }

    return count;
}

export function html_escape(x: string): string {
    ESCAPE_TABLE.forEach(({key, replace}) => {
        x = x.replace(key, replace);
    });

    return x;
}

export function allGroup(): DataGroup[] {
    let result = [];
    Object.keys(REF.GROUPS).forEach(value => {
        result.push(REF.GROUPS[value]);
    });
    return result;
}

export function isGroup(x: string): boolean {
    return allGroup().includes(<DataGroup>x);
}

export function allPages(): string[] {
    let result = [];
    Object.keys(REF.PAGES).forEach((value) => {
        result.push(REF.PAGES[value]);
    });

    return result;
}

export function isPage(x: string): boolean {
    return allPages().includes(x);
}

export function parseQuery(x: string) {
    let params: URLSearchParams = new URLSearchParams(x);
    let p = new Map();

    params.forEach((value, key) => {
        p.set(key, value);
    });

    Storage.alloc(REF.ID.QUERY, p);
}

export const DB_DATA = () => Storage.load<DBData[]>(REF.ID.SEARCH_TABLE);
export const QUERY = () => Storage.load<Map<string, string>>(REF.ID.QUERY);
export const WIKI_DATA = () => Storage.load<WikiResolvePage[]>(REF.ID.WIKI_DATA);

parseQuery(window.location.search);