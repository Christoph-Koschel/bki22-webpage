import {RoutEvent} from "../rout";
import {buildNavBar, checkRequirements} from "./global";
import {parseTemplate} from "../xmlParser";
import {disableDarkMode, enableDarkMode, isDarkMode} from "../theme";
import {REF} from "../utils";

export function settings_page(e: RoutEvent): HTMLElement {
    e.dm.title = "Work-Page | Settings";
    if (!checkRequirements(REF.PAGES.SETTINGS)) {
        return;
    }

    let root = document.createElement("div");
    root.setAttribute("page", REF.PAGES.SETTINGS);
    root.classList.add("container");

    root.appendChild(buildNavBar(REF.PAGES.SETTINGS));
    root.appendChild(buildThemeManager());

    return root;
}

function buildThemeManager(): HTMLElement {
    let struct = `
        <div>
            <h1><text>Theme</text></h1>
            <button>
               
            </button>
        </div>
    `;

    let root = parseTemplate(struct);
    let button = root.querySelector("button");
    if (isDarkMode()) {
        button.innerHTML = "Darkmode deaktiviren";
    } else {
        button.innerHTML = "Darkmode aktivieren";
    }

    button.addEventListener("click", () => {
        if (isDarkMode()) {
            button.innerHTML = "Darkmode aktivieren";
            disableDarkMode();
        } else {
            button.innerHTML = "Darkmode deaktiviren";
            enableDarkMode();
        }
    });

    return root;
}