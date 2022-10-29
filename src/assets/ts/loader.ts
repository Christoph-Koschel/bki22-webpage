import {DEFAULT_ROOT, QUERY} from "./utils";
import {GLOBAL_SEARCH, SETTINGS} from "./page";
import {createEmptyDocumentModel, Rout} from "./rout";
import {index_page} from "./pages/index";
import {global_search_page} from "./pages/global_search";
import {settings_page} from "./pages/settings";
import {isDarkMode} from "./theme";


Rout.register(DEFAULT_ROOT, index_page);
Rout.register(GLOBAL_SEARCH, global_search_page);
Rout.register(SETTINGS, settings_page);

window.addEventListener("load", () => {
    let root;
    let key;

    if (QUERY().has("r")) {
        key = QUERY().get("r");
        root = Rout.emit(QUERY().get("r"), {
            dm: createEmptyDocumentModel()
        });
    } else {
        root = Rout.emit(DEFAULT_ROOT, {
            dm: createEmptyDocumentModel()
        });
        key = DEFAULT_ROOT;
    }

    let app = document.createElement("div");
    app.id = "app";

    document.body.appendChild(app);
    app.appendChild(root);
    Rout.saveState(key, root);

    if (!isDarkMode()) {
        document.body.classList.remove("--dark-mode");
    }
});


