import {DEFAULT_ROOT, QUERY} from "./utils";
import {GLOBAL_SEARCH} from "./page";
import {createEmptyDocumentModel, Rout} from "./rout";
import {index_page} from "./pages/index";
import {global_search_page} from "./pages/global_search";


Rout.register(DEFAULT_ROOT, index_page);
Rout.register(GLOBAL_SEARCH, global_search_page);

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

    console.log(root);
    document.body.appendChild(app);
    app.appendChild(root);
    Rout.saveState(key, root);
});


