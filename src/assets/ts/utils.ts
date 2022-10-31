import {DataGroup, DBData, EscapeTable} from "./types";

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

const SWITCH: DataGroup = "switch";
const ROUTER: DataGroup = "router";
const LINUX: DataGroup = "linux";
const JAVA: DataGroup = "java";
const CISCO: DataGroup = "cisco";

let _QUERY = parseQuery(window.location.search);

export const QUERY = () => _QUERY;
export const DEFAULT_ROOT = "default";

export const ESCAPE_TABLE: EscapeTable[] = [
    {
        key: /</gi,
        replace: "&lt;"
    }
]

export const DB_DATA: DBData[] = [
    {
        groups: [SWITCH, ROUTER],
        description: "In den Administrationsmodus wechseln",
        prefix: "* >",
        cmd: "enable",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Wechselt in denn Benutzer Modus",
        prefix: "* #",
        cmd: "disable",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "In den Konfigurationsmodus wechseln",
        prefix: "* #",
        cmd: "configure terminal",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Setzt den Hostname",
        prefix: "* (conf)#",
        cmd: "hostname",
        arguments: [
            {
                key: "name",
                description: "Neuer name für das Gerät"
            }
        ]
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Administrationspasswort setzen",
        prefix: "* (conf)#",
        cmd: "enable secret",
        arguments: [
            {
                key: "psw",
                description: "The new password"
            }
        ]
    },
    {
        groups: [SWITCH, ROUTER],
        description: "In den Line-Consolenmodus wechseln",
        prefix: "* (conf)#",
        cmd: "line console",
        arguments: [
            {
                key: "index",
                description: "Anschluss stelle"
            }
        ]
    },
    {
        groups: [SWITCH, ROUTER],
        description: "In den Line-Consolenmodus wechseln",
        prefix: "* (conf-line)#",
        cmd: "password",
        arguments: [
            {
                key: "psw",
                description: "Das Passwort"
            }
        ]
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Setzt das davor eingegeben Passwort als Login Passwort",
        prefix: "* (conf-line)#",
        cmd: "login",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Beendet den Konfigurations Modus und Wechselt in den Administrator Modus zurück",
        prefix: "* (conf-line)#",
        cmd: "end",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Wechselt denn Modus zum letzen Modus zurück (Beendet den Prozess)",
        prefix: "* *",
        cmd: "exit",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Selektiert Ports zu einer Gruppe",
        prefix: "* (conf)#",
        cmd: "line vty",
        arguments: [
            {
                key: "from",
                description: "Port-Number start"
            },
            {
                key: "to",
                description: "Port-Number end"
            }
        ]
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Versucht nicht mehr bei einer Fehleingabe eine Namensauflösung durchzuführen",
        prefix: "* (conf)#",
        cmd: "no ip domain lookup",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Setzt das Passwort vom Interface",
        prefix: "* (line)#",
        cmd: "password",
        arguments: [
            {
                key: "pasword",
                description: "The password"
            }
        ]
    },
    {
        groups: [SWITCH],
        description: "Wählt das vlan interface aus un wechselt in den Konfigurations Modus",
        prefix: "switch(conf)#",
        cmd: "interface vlan",
        arguments: [
            {
                key: "index",
                description: "Nummer des vInterfaces"
            }
        ]
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Setzt die IP & Submask von dem Ausgewählten Interface",
        prefix: "* (conf-if)#",
        cmd: "ip address",
        arguments: [
            {
                key: "ip",
                description: "Die Ip Addresse"
            },
            {
                key: "snm",
                description: "Die Subnet mask"
            }
        ]
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Verhindert dass das interface herunterfährt",
        prefix: "* (conf-if)#",
        cmd: "no shutdown",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Aktiviert die Passwort verschlüsselung",
        prefix: "* (conf-if)#",
        cmd: "enable password encryption",
        arguments: []
    }
]