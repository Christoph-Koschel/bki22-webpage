export function isDarkMode() {
    return window.localStorage.getItem("theme") == "dark";
}

export function enableDarkMode() {
    document.body.classList.add("--dark-mode");
    window.localStorage.setItem("theme", "dark");
    document.body.style.transition = "0.5s all";
    document.body.addEventListener("transitionend", () => {
        document.body.style.transition = "";
    });
}

export function disableDarkMode() {
    document.body.classList.remove("--dark-mode");
    window.localStorage.removeItem("theme");
    document.body.style.transition = "0.5s all";
    document.body.addEventListener("transitionend", () => {
        document.body.style.transition = "";
    });
}