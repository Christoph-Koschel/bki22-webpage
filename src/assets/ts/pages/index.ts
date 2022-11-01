import {change_location, RoutEvent} from "../rout";
import {parseTemplate} from "../xmlParser";
import {DB_DATA, DEFAULT_ROOT, html_escape, refreshDB} from "../utils";
import {HOME} from "../page";

export function index_page(e: RoutEvent): HTMLElement {
    e.dm.title = "Work-Page"

    let root = document.createElement("div");
    root.setAttribute("page", DEFAULT_ROOT);
    root.appendChild(buildLogo());
    root.appendChild(buildAnimation());
    root.appendChild(buildTitle());

    fetch_data().then(() => {
        change_location(HOME, false);
    });

    return root;
}

async function fetch_data() {
    writeTitle("Überprüfe Daten");

    if (DB_DATA().length == 0) {
        writeTitle("Lade Datenbank herunter...")
        let str: string = await doRequest("assets/php/fetch.php");
        try {
            refreshDB(JSON.parse(str));
        } catch (err) {

        }
    }
}

async function doRequest(url: string): Promise<string> {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            }
        }
        xhr.open("POST", url, true);
        xhr.send();
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