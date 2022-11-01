import {change_location, RoutEvent} from "../rout";
import {GLOBAL_SEARCH, SETTINGS} from "../page";
import {parseTemplate} from "../xmlParser";
import {DEFAULT_ROOT} from "../utils";
import {buildBrand} from "./global";

export function index_page(e: RoutEvent): HTMLElement {
    return document.createElement("div");
}

