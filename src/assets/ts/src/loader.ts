import {parseQuery, QUERY, REF} from "./utils";
import {createEmptyDocumentModel, Rout} from "./rout";
import {index_page} from "./pages";
import {global_search_page} from "./pages/global_search";
import {settings_page} from "./pages/settings";
import {isDarkMode} from "./theme";
import {home_page} from "./pages/home";
import {wiki_page} from "./pages/wiki";

Rout.register(REF.PAGES.DEFAULT_ROOT, index_page);
Rout.register(REF.PAGES.HOME, home_page);
Rout.register(REF.PAGES.GLOBAL_SEARCH, global_search_page);
Rout.register(REF.PAGES.SETTINGS, settings_page);
Rout.register(REF.PAGES.WIKI, wiki_page);

window.addEventListener("load", () => {
    let root;
    let key;

    console.log(window.location.href);
    parseQuery(window.location.search);

    if (QUERY().has("r")) {
        key = QUERY().get("r");
        console.log(QUERY());
        console.log("Use query");
        root = Rout.emit(QUERY().get("r"), {
            dm: createEmptyDocumentModel()
        });
    } else {
        console.log("Use default");
        key = REF.PAGES.DEFAULT_ROOT;
        root = Rout.emit(REF.PAGES.DEFAULT_ROOT, {
            dm: createEmptyDocumentModel()
        });
        console.log(root);
    }

    let app = document.getElementById("app");
    app.appendChild(root);
    Rout.saveState(key, root);

    if (!isDarkMode()) {
        document.body.classList.remove("--dark-mode");
    }
});


