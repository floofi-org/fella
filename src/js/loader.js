window.g = (elementId) => document.getElementById(elementId);
window.b = document.body;
window.c = (classNames) => document.getElementsByClassName(classNames);

window.addEventListener('load', () => {
    loadNavigation();
});

window.startLoad = () => {
    if (g("app")) g("app").classList.remove("fella-loaded");
    if (g("loader")) g("loader").classList.remove("fella-loaded");
    if (b) b.classList.remove("fella-loaded");
}

window.completeLoad = () => {
    if (g("app")) g("app").classList.add("fella-loaded");
    if (g("loader")) g("loader").classList.add("fella-loaded");
    if (b) b.classList.add("fella-loaded");
}