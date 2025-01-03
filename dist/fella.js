/*!
 * Fella version 0.6.0
 * Copyright Floofi Systems
 */

// sidebar.js
if ((localStorage.getItem("fella-sidebar") === "false" && window.innerWidth > 1100) || localStorage.getItem("fella-sidebar") === "true" && window.innerWidth <= 1100) {
    window.addEventListener('load', () => {
        window.toggleSidebar();
    });
}

window.toggleSidebar = () => {
    if (window.innerWidth > 1100) {
        if (document.getElementById("app") && document.getElementById("app").classList.contains("fella-sidebar-show")) {
            document.getElementById("app").classList.remove("fella-sidebar-show");
            localStorage.setItem("fella-sidebar", "false");
        } else if (document.getElementById("app")) {
            document.getElementById("app").classList.add("fella-sidebar-show")
            localStorage.setItem("fella-sidebar", "true");
        }
    } else {
        if (document.getElementById("app") && document.getElementById("app").classList.contains("fella-sidebar-show-mobile")) {
            document.getElementById("app").classList.remove("fella-sidebar-show-mobile");
            localStorage.setItem("fella-sidebar", "false");
        } else if (document.getElementById("app")) {
            document.getElementById("app").classList.add("fella-sidebar-show-mobile")
            localStorage.setItem("fella-sidebar", "true");
        }
    }
}

// navigation.js
window.loadNavigation = () => {
    window.categoryNavigationItem = null;
    window.categorySection = null;
    window.lastPosition = -1;

    Array.from(c("fella-nav-navigation-item")).map(i => {
        i.onmouseenter = (e) => {
            if (g("navbar") && g("navbar").classList.contains("fella-nav-mobile-open")) return;
            if (e.target.getAttribute("data-category-id")) {
                let category = g("navbar-category-base-" + e.target.getAttribute("data-category-id"));
                if (g("navbar-category")) g("navbar-category").style.width = category.clientWidth + "px";
                if (g("navbar-category")) g("navbar-category").style.height = category.clientHeight + "px";

                if (window.categoryNavigationItem && g("navbar-category-outer")) g("navbar-category-outer").onmouseleave({
                    _switching: true
                });

                category.classList.remove("hide");
                category.classList.add("show");
                window.categorySection = category;
            } else {
                if (g("navbar-category-outer")) g("navbar-category-outer").onmouseleave({});
            }

            if (g("navbar-tabs")) g("navbar-tabs").style.left = e.target.getBoundingClientRect().left + "px";
            if (g("navbar-category-indicator")) g("navbar-category-indicator").style.left = (e.target.getBoundingClientRect().left + e.target.clientWidth / 3) + "px";
            if (g("navbar-tabs")) g("navbar-tabs").style.width = e.target.clientWidth + "px";
            if (g("navbar-tabs")) g("navbar-tabs").style.opacity = "1";
            e.target.classList.add("open");
            if (window.categoryNavigationItem) {
                window.categoryNavigationItem.classList.remove("open");
            }
            window.categoryNavigationItem = e.target;
        };

        i.onmouseleave = (e) => {
            if (g("navbar") && g("navbar").classList.contains("fella-nav-mobile-open")) return;
            if (e.target.classList.contains("fella-nav-navigation-item-with-category")) return;
            e.target.classList.remove("open");
        }
    });

    if (g("navbar-category-outer")) g("navbar-category-outer").onmouseleave = b.onmouseleave = (e) => {
        if (g("navbar").classList.contains("fella-nav-mobile-open")) return;
        if (window.categoryNavigationItem) {
            window.categoryNavigationItem.classList.remove("open");
            window.categoryNavigationItem = null;
        }
        if (window.categorySection) {
            window.categorySection.classList.remove("show");
            Array.from(c("fella-nav-category-base")).map(i => i.classList.remove("hide"));
            window.categorySection.classList.add("hide");
            window.categorySection = null;
        }
        if (g("navbar-navigation") && !e._switching) g("navbar-navigation").onmouseleave(null);
    }

    if (g("navbar-inner-left")) g("navbar-inner-left").onmouseleave = () => {
        if (g("navbar-tabs")) g("navbar-tabs").style.transition = "opacity 150ms ease";
    }

    if (g("navbar-navigation")) g("navbar-navigation").onmousemove = (e) => {
        if (g("navbar").classList.contains("fella-nav-mobile-open")) return;
        if (g("navbar-category-outer")) g("navbar-category-outer").onmousemove(e);
        if (g("navbar-category")) g("navbar-category").style.transition = "width 150ms ease, height 150ms ease";
        if (g("navbar-tabs")) g("navbar-tabs").style.transition = "left 250ms ease, width 250ms ease, opacity 150ms ease";
        if (g("navbar-category-indicator")) g("navbar-category-indicator").style.transition = "left 250ms ease";
    };

    if (g("navbar-navigation")) g("navbar-navigation").onmouseleave = (e) => {
        if (g("navbar").classList.contains("fella-nav-mobile-open")) return;
        if (window.categoryNavigationItem && window.categoryNavigationItem.classList.contains("fella-nav-navigation-item-with-category")) return;
        if (g("navbar-tabs")) g("navbar-tabs").style.opacity = "0";
        if (g("navbar-tabs") && e) g("navbar-tabs").style.transition = "opacity 150ms ease";
        if (g("navbar-category")) g("navbar-category").style.transition = "";
        if (g("navbar-category-indicator")) g("navbar-category-indicator").style.transition = "";
        if (g("navbar-tabs")) g("navbar-tabs").style.left = "0";
        if (g("navbar-tabs")) g("navbar-tabs").style.width = "0";
    };

    if (g("navbar-category-outer")) g("navbar-category-outer").onmousemove = (e) => {
        if (g("navbar-inner-left")) g("navbar-inner-left").classList.remove("navigating");
        if (g("navbar") && g("navbar").classList.contains("fella-nav-mobile-open")) return;
        if (window.lastPosition === -1) {
            window.lastPosition = e.clientX;
        }

        if (e.clientX - window.lastPosition < -2) {
            Array.from(c("fella-nav-category-base")).map(i => i.classList.add("reverse"));
        } else if (e.clientX - window.lastPosition > 2) {
            Array.from(c("fella-nav-category-base")).map(i => i.classList.remove("reverse"));
        }

        window.lastPosition = e.clientX;
    }

    if (g("navbar-tabs")) g("navbar-tabs").style.opacity = "0";
    if (g("navbar-tabs")) g("navbar-tabs").style.transition = "opacity 150ms ease";
    if (g("navbar-tabs")) g("navbar-tabs").style.left = "0";
    if (g("navbar-tabs")) g("navbar-tabs").style.width = "0";

    window.onresize = () => {
        if (window.innerWidth > 900) {
            if (g("navbar")) g("navbar").classList.remove("fella-nav-mobile-open");
        }
    }
}

// navbar.js
window.scrollHooks = [];

window.onscroll = () => {
    updateScroll();
}

window.updateScroll = () => {
    if (g("navbar") && !g("navbar").classList.contains("fella-nav-fixed")) {
        if (window.scrollY === 0) {
            g("navbar").classList.add("fella-nav-no-border");
        } else {
            g("navbar").classList.remove("fella-nav-no-border");
        }
    }

    if (g("mobile-navbar") && !g("mobile-navbar").classList.contains("fella-nav-fixed")) {
        if (window.scrollY === 0) {
            g("mobile-navbar").classList.add("fella-nav-no-border");
        } else {
            g("mobile-navbar").classList.remove("fella-nav-no-border");
        }
    }

    for (let name of scrollHooks) {
        if ('temporaryPageData' in window && name in window.temporaryPageData) {
            window.temporaryPageData[name]();
        }
    }
}

window.mobileNavbar = () => {
    if (g("navbar").classList.contains("fella-nav-mobile-open")) {
        g("navbar").classList.remove("fella-nav-mobile-open");
    } else {
        g("navbar").classList.add("fella-nav-mobile-open");
    }
}

// loader.js
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

// effects.js
let canvas = document.createElement('canvas');
let gl;

try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
} catch (e) {}

if (gl) {
    document.body.classList.add("fella-visual-effects");
} else {
    console.warn("Cannot enable visual effects: no GPU acceleration detected.");
}

// code.js
for (let el of c("fella-code-block-multilanguage")) {
    let selector = el.getElementsByClassName("fella-code-block-selector")[0];

    selector.onchange = () => {
        for (let it of el.getElementsByClassName("fella-code-block-filename")) {
            it.classList.remove("fella-code-block-selected");
        }

        for (let it of el.getElementsByClassName("fella-code-block-language")) {
            it.classList.remove("fella-code-block-selected");
        }

        for (let it of el.querySelectorAll(`[data-fella-language="${selector.value}"]`)) {
            it.classList.add("fella-code-block-selected");
        }

        selector.blur();
    }
}

for (let el of c("fella-code-block-language")) {
    let btn = el.getElementsByClassName("fella-code-block-copy")[0] ?? null;
    if (btn) {
        let target = btn.parentElement.getElementsByClassName("fella-code-block")[0];
        if (target) {
            btn.onclick = () => {
                // noinspection JSIgnoredPromiseFromCall
                navigator.clipboard.writeText(target.innerText);
            }
        }
    }
}

