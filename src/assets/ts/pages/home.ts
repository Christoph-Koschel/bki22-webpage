import {change_location, RoutEvent} from "../rout";
import {buildBrand} from "./global";
import {parseTemplate} from "../xmlParser";
import {R} from "../utils";
import {Storage} from "../Storage";

export function home_page(e: RoutEvent) {
    e.dm.title = "Work-Page | Home";
    if (!Storage.require(R.ID.SEARCH_TABLE)) {
        change_location(R.PAGES.DEFAULT_ROOT, true);
    }

    let root = document.createElement("div");
    root.setAttribute("page", R.PAGES.HOME);
    root.classList.add("container");

    root.appendChild(buildHeader());
    root.appendChild(buildTableContents());
    root.appendChild(buildBrand());

    return root;
}

function buildHeader(): HTMLElement {
    let root = document.createElement("div");
    let head = document.createElement("h1");
    head.innerHTML = "BKI22 Work-Page";
    root.appendChild(head);

    let subHeader = document.createElement("h2");
    subHeader.innerHTML = "Inhaltsverzeichnis";
    root.appendChild(subHeader)

    return root;
}

function buildTableContents(): HTMLElement {
    const struct = `
        <div>
            <ul class="table-contents">
                
            </ul>
        </div>
    `;

    let root = parseTemplate(struct);


    let ul = <HTMLElement>root.getElementsByTagName("ul").item(0);

    {
        let li = document.createElement("li");
        li.classList.add("text-hover", "c-default")
        li.innerHTML = "Globale Suche";
        li.addEventListener("click", () => {
            change_location(R.PAGES.GLOBAL_SEARCH, false);
        });
        ul.appendChild(li);
    }
    {
        let li = document.createElement("li");
        li.classList.add("text-hover", "c-default")
        li.innerHTML = "Einstellungen";
        li.addEventListener("click", () => {
            change_location(R.PAGES.SETTINGS, false);
        });
        ul.appendChild(li);
    }

    return root;
}