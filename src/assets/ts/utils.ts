import {DataGroup, DBData, EscapeTable} from "./types";


const SWITCH: DataGroup = "switch";
const ROUTER: DataGroup = "router";
const LINUX: DataGroup = "linux";
const JAVA: DataGroup = "java";
const CISCO: DataGroup = "cisco";
const CLI: DataGroup = "cli";
const OTHERS: DataGroup = "others";
export const DEFAULT_ROOT = "default";

export const ESCAPE_TABLE: EscapeTable[] = [
    {
        key: /</gi,
        replace: "&lt;"
    },
    {
        key: /\n/g,
        replace: "<br>"
    }
]


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
    return [
        "cisco",
        "linux",
        "java",
        "router",
        "switch",
        "cli"
    ];
}

export function isGroup(x: string): boolean {
    return allGroup().includes(<DataGroup>x);
}

let _QUERY = parseQuery(window.location.search);

export const QUERY = () => _QUERY;

export function parseQuery(x: string): Map<string, string> {
    let params: URLSearchParams = new URLSearchParams(x);
    let p = new Map();

    params.forEach((value, key) => {
        p.set(key, value);
    });

    return p;
}

export function refreshQuery() {
    _QUERY = parseQuery(window.location.search);
}


let _DB_DATA: DBData[] = []
export const DB_DATA = () => _DB_DATA;

export function refreshDB(data: DBData[]) {
    _DB_DATA = data;
}