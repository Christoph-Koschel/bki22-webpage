import {RoutEvent} from "../rout";
import {buildNavBar, checkRequirements} from "./global";
import {R, WIKI_DATA} from "../utils";
import {parseTemplate} from "../xmlParser";

export function wiki_page(e: RoutEvent): HTMLElement {
    e.dm.title = "Work-Page | Wiki";
    if (!checkRequirements(R.PAGES.WIKI)) {
        return;
    }

    let root = document.createElement("div");
    root.setAttribute("page", R.PAGES.WIKI);
    root.appendChild(buildNavBar(R.PAGES.WIKI));

    let content = document.createElement("div");
    content.classList.add("content");
    content.appendChild(buildSideBar());
    content.appendChild(buildMainContent());

    root.appendChild(content);

    return root;
}

function buildMainContent(): HTMLElement {
    let struct = `
        <div id="current-page">
        
        </div>
    `;

    return parseTemplate(struct);
}

function buildSideBar() {
    let struct = `
        <div class="side-bar">
            <div>
                <h3><text>WIKI</text></h3>
            </div>
            <ul>
            
            </ul>
        </div>
    `;

    let root = parseTemplate(struct);
    let list = root.querySelector("ul");

    WIKI_DATA().forEach((page) => {
        let li = document.createElement("li");
        let span = document.createElement("span");

        li.appendChild(span);
        li.addEventListener("click", () => {
            document.getElementById("current-page").innerHTML = "";
            document.getElementById("current-page").appendChild(parseTemplate(page.struct));
        });
        span.innerHTML = page.title;
        list.appendChild(li);
    });

    return root;
}