import {QUERY, R} from "./utils";
import {createEmptyDocumentModel, Rout} from "./rout";
import {index_page} from "./pages/index";
import {global_search_page} from "./pages/global_search";
import {settings_page} from "./pages/settings";
import {isDarkMode} from "./theme";
import {home_page} from "./pages/home";

Rout.register(R.PAGES.DEFAULT_ROOT, index_page);
Rout.register(R.PAGES.HOME, home_page);
Rout.register(R.PAGES.GLOBAL_SEARCH, global_search_page);
Rout.register(R.PAGES.SETTINGS, settings_page);

window.addEventListener("load", () => {
    let root;
    let key;

    if (QUERY().has("r")) {
        key = QUERY().get("r");
        root = Rout.emit(QUERY().get("r"), {
            dm: createEmptyDocumentModel()
        });
    } else {
        root = Rout.emit(R.PAGES.DEFAULT_ROOT, {
            dm: createEmptyDocumentModel()
        });
        key = R.PAGES.DEFAULT_ROOT;
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


