import {RoutEvent} from "../rout";
import {GLOBAL_SEARCH} from "../page";
import {buildNavBar} from "./global";
import {parseTemplate} from "../xmlParser";
import {DB_DATA} from "../utils";
import {filterData} from "../searchHelper";

export function global_search_page(e: RoutEvent): HTMLElement {
    e.dm.title = "Globale Suche";
    let root = document.createElement("div");
    root.setAttribute("page", GLOBAL_SEARCH);

    root.appendChild(buildNavBar(GLOBAL_SEARCH));
    root.appendChild(buildSearchPanel());
    root.appendChild(buildResultPanel());

    return root;
}

let table: HTMLElement | null = null;

function buildSearchPanel(): HTMLElement {
    let struct = `
        <div>
            <input placeholder="Keywords, Name, Group" />
        </div>
    `;

    let root = parseTemplate(struct);

    let input = root.querySelector("input");
    input.addEventListener("keyup", () => {
        console.log("x");
        if (table == null) {
            return;
        }
        console.log("y");

        if (input.value == "") {
            filterData(table, DB_DATA, null);
        } else {
            let keywords = input.value.toLowerCase().split(" ");
            console.log(keywords);
            filterData(table, DB_DATA, keywords);
        }
    });

    return root;
}

function buildResultPanel(): HTMLElement {
    let struct = `
        <div>
            <h3><text>Such Ergebnis</text></h3>
            <table class="border result-table">
            
            </table>
        </div>
    `
    let root = parseTemplate(struct);

    table = root.querySelector("table");
    filterData(table, DB_DATA, null);
    return root;
}