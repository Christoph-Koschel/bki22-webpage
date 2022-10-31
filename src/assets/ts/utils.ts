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
const CLI: DataGroup = "cli";
const OTHERS: DataGroup = "others";

let _QUERY = parseQuery(window.location.search);

export const QUERY = () => _QUERY;
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
        groups: [SWITCH],
        description: "Message of Today Nachricht setzen",
        prefix: "(conf)#",
        cmd: "banner motd",
        arguments: [
            {
                key: "msg",
                description: "Die Nachricht"
            }
        ]
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
        description: "Consolenpasswort setzen",
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
        description: "Consolenpasswort \"scharf\" stellen",
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
        description: "In den VTY-Modus wechseln",
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
        description: "VTY-Passwort setzen",
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
        description: "VTY-Passwort \"scharf\" stellen",
        prefix: "* (conf-line)#",
        cmd: "login",
        arguments: []
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Namensauflösung ausschalten",
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
        groups: [SWITCH, ROUTER],
        description: "Passwort-Verschlüsselung setzen",
        prefix: "* (conf)#",
        cmd: "service password-encryption",
        arguments: []
    },
    {
        groups: [SWITCH],
        description: "In den Interface-Modus wechseln",
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
        description: "IP-Adresse den VLAN setzen",
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
        description: "Interface VLAN \"hoch\" fahren",
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
    },
    {
        groups: [SWITCH, ROUTER],
        description: "Aktuelle Konfiguration anzeigen",
        prefix: "* #",
        cmd: "show running-config",
        arguments: []
    },


    {
        groups: [LINUX, CLI],
        description: "Navigation im Verzeichnisbaum: Der Kommandozeilenbefehl cd steht für change directory und dient der Navigation im Verzeichnisbaum",
        cmd: "cd",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl",
            },
            {
                key: "verzeichnis|path|operator",
                description: "Der zu wechselten Pfad, Verzeichnis oder Pfad-Operator z.B. \"..\""
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Verzeichnisinhalte auflisten: Der Kommandozeilenbefehl ls steht für list und wird verwendet, um den Inhalt eines Verzeichnisses (die Namen aller Dateien und Ordner, die sich im angegebenen Verzeichnis befinden) anzuzeigen",
        cmd: "ls",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl z.B. -ls für detaillierte listen",
            },
            {
                key: "verzeichnis|path|operator",
                description: "Der zu lesende Pfad, Verzeichnis oder Pfad-Operator z.B. \"..\""
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Verzeichnis erstellen: Der Kommandozeilenbefehl mkdir steht für make directory und ermöglicht es Linux-Nutzern, neue Verzeichnisse anzulegen",
        cmd: "mkdir",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl --parent für recursive erstellung",
            },
            {
                key: "verzeichnis|path",
                description: "Der zu erstellende Pfad oder Verzeichnis"
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Verzeichnisname ausgeben: Nutzen Sie pwd (kurz für print working directory), um sich den Namen des aktuellen Arbeitsverzeichnisses auszugeben zu lassen",
        cmd: "pwd",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl",
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Verzeichnis löschen: Möchten Sie ein bestimmtes Verzeichnis löschen, nutzen Sie den Kommandozeilenbefehl rmdir (remove directory)",
        cmd: "rmdir",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl --parent für recursive löschung",
            },
            {
                key: "verzeichnis|path",
                description: "Der zu löschende Pfad, Verzeichnis oder Pfad-Operator z.B. \"..\""
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Verzeichnisse in Baumstruktur auslisten: Während ls lediglich den Inhalt von Verzeichnissen auflistet, lässt sich mit dem Kommandozeilenprogramm tree die gesamte Verzeichnishierarchie rekursiv als Baumstruktur ausgeben",
        cmd: "tree",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl",
            },
            {
                key: "verzeichnis|path",
                description: "Der zu lesende Pfad, Verzeichnis oder Pfad-Operator z.B. \"..\""
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Mit dem alias-Befehl kannst du temporäre Aliase in deiner Shell-Sitzung definieren. Wenn du einen Alias erstellst, weist du deine Shell an, ein Wort durch eine Reihe von Befehlen zu ersetzen",
        cmd: "alias",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "name=<string>",
                description: "Der name mit der Befehlskette als String geschrieben"
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Kopiert verzeichnise oder Dateien",
        cmd: "cp",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl",
            },
            {
                key: "src",
                description: "Die zu kopierende Datei oder Verzeichnis"
            },
            {
                key: "dest",
                description: "Das Ziel + der name wohin die Datei oder Verzeichnis hin kopiert werden soll"
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Mit dem Befehl kann man neue Dateien erstellen",
        cmd: "touch",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl",
            },
            {
                key: "name|path",
                description: "Die zu erstellende Datei"
            }
        ]
    },
    {
        groups: [LINUX, CLI],
        description: "Mit dem Befehl chmod kann man den Modus einer Datei (Berechtigungen) schnell ändern. Er bietet eine Vielzahl von Optionen. Die grundlegenden Rechte, die eine Datei haben kann, sind:\nr (read)\nw (write)\nx (execute)\nEiner der häufigsten Anwendungsfälle für chmod ist es, eine Datei für den Benutzer ausführbar zu machen. Dazu gibt man chmod und das Flag +x ein, gefolgt von der Datei, deren Berechtigungen man ändern möchte",
        cmd: "chmod",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "options",
                description: "Optionale Paramerter für den Befehl",
            },
            {
                key: "mode",
                description: "Der zu bearbeitende Modus"
            },
            {
                key: "file",
                description: "Die Ziel Datei"
            }
        ]
    },


    {
        groups: [JAVA, CLI],
        description: "Kompiliert Dateien zu java bytecode Dateien",
        cmd: "javac",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "...src",
                description: "Die source Dateien"
            }
        ]
    },
    {
        groups: [JAVA, CLI],
        description: "Führt eine java bytecode datei aus",
        cmd: "java",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "main class",
                description: "Die Main Klasse bei Packages getrennt mit einem Punkt"
            }
        ]
    },

    {
        groups: [OTHERS, CLI],
        description: "Öffnet eine Datei im CLI-Editor nano",
        cmd: "nano",
        prefix: "user@pc-name: path/to/cwd $",
        arguments: [
            {
                key: "file",
                description: "Die zu öffnenden Dateien"
            }
        ]
    }
]