let i = 0;

function next() {
    return "p" + (i++);
}

export const GLOBAL_SEARCH = next();
