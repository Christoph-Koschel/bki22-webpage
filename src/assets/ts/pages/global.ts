import {parseTemplate} from "../xmlParser";
import {GLOBAL_SEARCH, SETTINGS} from "../page";
import {change_location} from "../rout";
import {DEFAULT_ROOT} from "../utils";

export function buildNavBar(current: string): HTMLElement {
    let struct = `
        <div>
            <div page="global" class="navbar">
                <h1><text>Work-Page</text></h1>
                <div>
                    
                </div>
            </div>
            <div page="global" class="fake-navbar">
            
            </div>
        </div>
    `;

    let root = parseTemplate(struct);
    let navbar = root.querySelector("div.navbar");
    navbar.appendChild(buildItem("Home", DEFAULT_ROOT, DEFAULT_ROOT == current));
    navbar.appendChild(buildItem("Globale Suche", GLOBAL_SEARCH, GLOBAL_SEARCH == current));
    navbar.appendChild(buildItem("Einstellungen", SETTINGS, SETTINGS == current));

    let fake = <HTMLElement>root.querySelector("div.fake-navbar");
    fake.style.height = "90px";

    return root;
}

function buildItem(name: string, id: string, current: boolean): HTMLElement {
    let struct = `
        <div>
            <a class="text-hover c-default"><text>${name}</text></a>
        </div>
    `;

    let root = parseTemplate(struct);
    if (!current) {
        root.addEventListener("click", () => {
            change_location(id, false);
        });
    } else {
        root.classList.add("text-muted");
    }

    return root;
}

export function buildBrand(): HTMLElement {
    let struct = `
        <div page="global" class="brand">
            <div class="before"></div>
            <i class="fab fa-github text-hover"></i>
        </div>
    `;

    let root = parseTemplate(struct);

    let github = root.querySelector("i.fab.fa-github");
    github.addEventListener("click", () => {
        window.open("https://github.com/Christoph-Koschel/bki22-webpage", "_blank");
    });
    return root;
}
