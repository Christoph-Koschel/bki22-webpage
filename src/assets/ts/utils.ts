import {_R, DataGroup, DBData, EscapeTable} from "./types";
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

export const R: _R = {
    GROUPS: {
        SWITCH: "switch",
        ROUTER: "router",
        LINUX: "linux",
        JAVA: "java",
        CISCO: "cisco",
        CLI: "cli",
        OTHERS: "others"
    },
    PAGES: {
        DEFAULT_ROOT: "default",
        GLOBAL_SEARCH: next(),
        SETTINGS: next(),
        HOME: next()
    },
    ID: {
        QUERY: "storage.query",
        SEARCH_TABLE: "storage.search-table"
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
    Object.keys(R.GROUPS).forEach(value => {
        result.push(R.GROUPS[value]);
    });
    return result;
}

export function isGroup(x: string): boolean {
    return allGroup().includes(<DataGroup>x);
}

export function parseQuery(x: string) {
    let params: URLSearchParams = new URLSearchParams(x);
    let p = new Map();

    params.forEach((value, key) => {
        p.set(key, value);
    });

    Storage.alloc(R.ID.QUERY, p);
}

export const DB_DATA = () => Storage.load<DBData[]>(R.ID.SEARCH_TABLE);
export const QUERY = () => Storage.load<Map<string, string>>(R.ID.QUERY);

parseQuery(window.location.search);