import {change_location, RoutEvent} from "../rout";
import {parseTemplate} from "../xmlParser";
import {DB_DATA, html_escape, isPage, QUERY, R} from "../utils";
import {buildBrand} from "./global";
import {Storage} from "../Storage";
import {WikiPage, WikiResolvePage} from "../types";

export function index_page(e: RoutEvent): HTMLElement {
    e.dm.title = "Work-Page";

    let root = document.createElement("div");
    root.setAttribute("page", R.PAGES.DEFAULT_ROOT);
    root.appendChild(buildLogo());
    root.appendChild(buildAnimation());
    root.appendChild(buildTitle());
    root.appendChild(buildBrand());

    fetch_data().then(() => {
        if (QUERY().has("b") && isPage(QUERY().get("b"))) {
            change_location(QUERY().get("b"), true);
        } else {
            change_location(R.PAGES.HOME, false);
        }
    });

    return root;
}

async function fetch_data() {
    writeTitle("Überprüfe Daten");

    if (!Storage.contains(R.ID.SEARCH_TABLE)) {
        writeTitle("Lade Datenbank herunter...");
        let formData: FormData = new FormData();
        formData.append("file", "json/data.json");
        let str: string = await doRequest("assets/php/fetch.php", formData);
        try {
            Storage.alloc(R.ID.SEARCH_TABLE, JSON.parse(str));
        } catch (err) {

        }
    }

    if (!Storage.contains(R.ID.WIKI_DATA)) {
        writeTitle("Lade Wiki-Header herunter...");
        let formData = new FormData();
        formData.append("file", "json/wiki.json");
        let str: string = await doRequest("assets/php/fetch.php", formData);
        try {
            let result: WikiResolvePage[] = [];
            let entries: WikiPage[] = JSON.parse(str);
            for (const value of entries) {
                const index = entries.indexOf(value);
                writeTitle(`Lade Wiki-Page herunter [${index}|${entries.length}]`);
                let formData = new FormData();
                formData.append("file", value.file);
                let str: string = await doRequest("assets/php/fetch.php", formData);
                result.push({
                    file: value.file,
                    title: value.title,
                    struct: str
                });
            }
            Storage.alloc(R.ID.WIKI_DATA, result);
        } catch (err) {

        }
    }
}

async function doRequest(url: string, data: FormData): Promise<string> {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            }
        }
        xhr.open("POST", url, true);
        xhr.send(data);
    });
}

function buildLogo() {
    let struct = `
        <div class="image-wrapper">
            <img src="assets/image/est_logo_270x150.png" />
        </div>
    `;

    return parseTemplate(struct);
}

function buildAnimation() {
    let struct = `
        <div class="loader">
            <div class="loader-inner">
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
            </div>
        </div>
    `;

    return parseTemplate(struct);
}

let message: HTMLElement | null = null;

function buildTitle() {
    let struct = `
        <div class="title">
            <span><text>Hallo</text></span>
        </div>
    `;

    let root = parseTemplate(struct);
    message = root.querySelector("span");

    return root;
}

function writeTitle(str: string) {
    if (message == null) {
        return;
    }

    message.innerHTML = html_escape(str);
}