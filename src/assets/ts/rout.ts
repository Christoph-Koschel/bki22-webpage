import {Callback} from "./types";
import {DEFAULT_ROOT, QUERY, refreshQuery} from "./utils";

export interface RoutEvent {
    dm: DocumentModel
}

export interface DocumentModel {
    title: string
}

function parseDocumentModel(dm: DocumentModel) {
    document.title = dm.title;
}

export function createEmptyDocumentModel(): DocumentModel {
    return {
        title: "Page"
    }
}

export class Rout {
    private static routes: Map<string, Callback<RoutEvent, HTMLElement>> = new Map<string, Callback<RoutEvent, HTMLElement>>();
    private static saves: Map<string, HTMLElement> = new Map<string, HTMLElement>();
    private static dms: Map<string, DocumentModel> = new Map<string, DocumentModel>();

    public static register(key: string, cb: Callback<RoutEvent, HTMLElement>) {
        this.routes.set(key, cb);
    }

    public static emit(key: string, e: RoutEvent): HTMLElement {
        let x = this.routes.get(key)(<any>e);
        parseDocumentModel(e.dm);
        this.dms.set(key, e.dm);
        return x;
    }

    public static getDM(key: string): DocumentModel {
        return this.dms.get(key);
    }

    public static saveState(key: string, root: HTMLElement) {
        this.saves.set(key, root);
    }

    public static loadState(key: string): HTMLElement {
        if (!this.saves.has(key)) {
            return null;
        }

        return this.saves.get(key);
    }
}

window.onpopstate = () => {
    refreshQuery();
    let root;
    let key;
    let app = document.getElementById("app");

    if (QUERY().has("r")) {
        key = QUERY().get("r");
        root = Rout.emit(QUERY().get("r"), {
            dm: createEmptyDocumentModel()
        });
    } else {
        key = DEFAULT_ROOT;
        root = Rout.emit(DEFAULT_ROOT, {
            dm: createEmptyDocumentModel()
        });
    }

    app.innerHTML = "";
    app.appendChild(root);
}

export function change_location(key: string | null, rerender: boolean) {
    let app = document.getElementById("app");

    if (key == null) {
        key = DEFAULT_ROOT;
    }

    if (rerender) {
        let newRoot = Rout.emit(key, {
            dm: createEmptyDocumentModel()
        });
        app.innerHTML = "";
        app.appendChild(newRoot);
        Rout.saveState(key, newRoot);
        parseDocumentModel(Rout.getDM(key));
    } else {
        let newRoot = Rout.loadState(key);
        if (newRoot == null) {
            change_location(key, true);
            return;
        }
        app.innerHTML = "";
        app.appendChild(newRoot);
        parseDocumentModel(Rout.getDM(key));
    }

    window.history.pushState(null, "", window.location.origin + window.location.pathname + (key == null ? "" : "?r=" + key));
}