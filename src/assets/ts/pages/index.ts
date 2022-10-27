import {change_location, RoutEvent} from "../rout";
import {GLOBAL_SEARCH} from "../page";

export function index_page(e: RoutEvent): HTMLElement {
    e.dm.title = "Work-Page";

    let root = document.createElement("div");
    root.classList.add("container");

    root.appendChild(buildHeader());
    root.appendChild(buildTableContents());

    return root;
}

function buildHeader(): HTMLElement {
    let root = document.createElement("div");
    let head = document.createElement("h1");
    head.innerHTML = "BKI22 Work-Page";
    root.appendChild(head);

    let subHeader = document.createElement("h2");
    subHeader.innerHTML = "Inhaltsverzeichnis";
    root.appendChild(head);

    return root;
}

function buildTableContents(): HTMLElement {
    let root = document.createElement("div");

    let list = document.createElement("ul");
    list.classList.add("table-contents");

    {
        let li = document.createElement("li");
        li.innerHTML = "Globale Suche";
        li.addEventListener("click", () => {
            change_location(GLOBAL_SEARCH, false);
        });
        list.appendChild(li);
    }

    root.appendChild(list);

    return root;
}