import {RoutEvent} from "../rout";

export function global_search_page(e: RoutEvent): HTMLElement {
    e.dm.title = "Globale Suche";

    return document.createElement("div");
}