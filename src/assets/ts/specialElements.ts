export function parseCElements() {
    document.querySelectorAll(".show-group").forEach((item, index) => {
        let btn: string = item.getAttribute("trigger-element");
        let target: string = item.getAttribute("target-element");

        let btnElement = <HTMLElement>item.querySelector(btn);
        let targetElement = <HTMLElement>item.querySelector(target);

        btnElement.addEventListener("click", () => {
            if (targetElement.style.display == "none") {
                targetElement.style.display = "";
                btnElement.innerHTML = "Hide";
            } else {
                targetElement.style.display = "none";
                btnElement.innerHTML = "Show";
            }
        });
    });

    document.querySelectorAll(".switch-theme").forEach((item, index) => {
        item.addEventListener("click", () => {
            document.body.classList.toggle("--dark-mode");

            if (document.body.classList.contains("--dark-mode")) {
                window.localStorage.setItem("theme", "dark");
            } else{
                window.localStorage.removeItem("theme");
            }
        });
    });
}