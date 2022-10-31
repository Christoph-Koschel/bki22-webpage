import {DataGroup, DBData, SearchResultParameter} from "./types";
import {arr_contains_count, DB_DATA, html_escape, string_contains_count} from "./utils";
import {select} from "./lib/code-database/linq";
import {isGroup} from "./ui";

function dataHeader(ele: HTMLElement) {
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");

    th1.innerHTML = "Befehl";
    th2.innerHTML = "Beschreibung";

    tr.appendChild(th1);
    tr.appendChild(th2);
    ele.appendChild(tr);
}

function dataItem(ele, data: DBData) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");

    let str: string = data.prefix + " " + data.cmd;
    data.arguments.forEach((arg) => {
        str += " <" + arg.key + ">";
    });

    td1.innerHTML = html_escape(str);

    let td2 = document.createElement("td");
    td2.innerHTML = data.description;

    let argumentTable = document.createElement("table");
    argumentTable.classList.add("argument-table");
    if (data.arguments.length != 0) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let th2 = document.createElement("th");
        th.innerHTML = "Key";
        th2.innerHTML = "Beschreibung";
        tr.appendChild(th);
        tr.appendChild(th2);
        argumentTable.appendChild(tr);
    }

    data.arguments.forEach((arg) => {
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
    ele.appendChild(tr);
}

export function filterData(ele: HTMLElement, data: DBData[], keywords: string[] | null) {
    if (keywords == null) {
        ele.innerHTML = "";
        dataHeader(ele);

        data.forEach((data) => dataItem(ele, data));
        return;
    }

    let groups = <DataGroup[]>select(keywords).all().where((x, i) => isGroup(x)).get();
    keywords = select(keywords).all().not().where((x, i) => isGroup(x) || x == "").get();

    let result: SearchResultParameter<DBData>[] = [];
    data.forEach((data) => {
        let selectCount = 0;
        selectCount += arr_contains_count(data.groups, groups);
        selectCount += string_contains_count(data.cmd.toLowerCase(), keywords);
        selectCount += string_contains_count(data.prefix.toLowerCase(), keywords);
        selectCount += string_contains_count(data.description.toLowerCase(), keywords);

        data.arguments.forEach((argument) => {
            selectCount += string_contains_count(argument.key.toLowerCase(), keywords);
            selectCount += string_contains_count(argument.description.toLowerCase(), keywords);
        });

        if (selectCount > 0) {
            result.push({
                quote: selectCount,
                item: data
            });
        }
    });
    result.sort((a, b) => {
        if (a.quote > b.quote) {
            return -1;
        }

        if (b.quote < b.quote) {
            return 1;
        }

        return 0;
    });
    let items: DBData[] = [];

    console.log(result);
    result.forEach(value => {
        items.push(value.item);
    });

    filterData(ele, items, null);
}