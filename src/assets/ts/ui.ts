import {DataGroup} from "./types";
import {select} from "./lib/code-database/linq";
import {DB_DATA} from "./utils";
import {arr_contains, html_escape} from "./utils";

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

export function parseData(element: HTMLElement, groups: DataGroup[]) {
    element.innerHTML = "";

    let headTr = document.createElement("tr");
    let cmdTh = document.createElement("th");
    cmdTh.innerHTML = "Befehl";
    let descTh = document.createElement("th");
    descTh.innerHTML = "Beschreibung";
    headTr.appendChild(cmdTh);
    headTr.appendChild(descTh);

    element.appendChild(headTr);

    select(DB_DATA).all().where((x, i) => arr_contains<DataGroup>(x.groups, groups)).get().forEach((value) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");

        let str: string = value.prefix + " " + value.cmd;
        value.arguments.forEach((arg) => {
            str += " <" + arg.key + ">";
        });

        td1.innerHTML = html_escape(str);

        let td2 = document.createElement("td");
        td2.innerHTML = value.description;

        let argumentTable = document.createElement("table");
        argumentTable.classList.add("argument-table");
        if (value.arguments.length != 0) {
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            let th2 = document.createElement("th");
            th.innerHTML = "Key";
            th2.innerHTML = "Beschreibung";
            tr.appendChild(th);
            tr.appendChild(th2);
            argumentTable.appendChild(tr);
        }

        value.arguments.forEach((arg) => {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let td2 = document.createElement("td");
            td.innerHTML = arg.key;
            td2.innerHTML = arg.description;

            tr.appendChild(td);
            tr.appendChild(td2);
            argumentTable.appendChild(tr);
        });

        td2.appendChild(argumentTable);
        tr.appendChild(td1);
        tr.appendChild(td2);
        element.appendChild(tr);
    });
}