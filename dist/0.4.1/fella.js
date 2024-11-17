/*!
 * Fella version 0.4.1
 * Copyright Floofi Systems
 */

// navigation.js
window.loadNavigation = () => {
    window.categoryNavigationItem = null;
    window.categorySection = null;
    window.lastPosition = -1;

    Array.from(document.getElementsByClassName("fella-nav-navigation-item")).map(i => {
        i.onmouseenter = (e) => {
            if (document.getElementById("navbar") && document.getElementById("navbar").classList.contains("fella-nav-mobile-open")) return;
            if (e.target.getAttribute("data-category-id")) {
                let category = document.getElementById("navbar-category-base-" + e.target.getAttribute("data-category-id"));
                if (document.getElementById("navbar-category")) document.getElementById("navbar-category").style.width = category.clientWidth + "px";
                if (document.getElementById("navbar-category")) document.getElementById("navbar-category").style.height = category.clientHeight + "px";

                if (window.categoryNavigationItem && document.getElementById("navbar-category-outer")) document.getElementById("navbar-category-outer").onmouseleave({
                    _switching: true
                });

                category.classList.remove("hide");
                category.classList.add("show");
                window.categorySection = category;
            } else {
                if (document.getElementById("navbar-category-outer")) document.getElementById("navbar-category-outer").onmouseleave({});
            }

            if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.left = e.target.getBoundingClientRect().left + "px";
            if (document.getElementById("navbar-category-indicator")) document.getElementById("navbar-category-indicator").style.left = (e.target.getBoundingClientRect().left + e.target.clientWidth / 3) + "px";
            if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.width = e.target.clientWidth + "px";
            if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.opacity = "1";
            e.target.classList.add("open");
            if (window.categoryNavigationItem) {
                window.categoryNavigationItem.classList.remove("open");
            }
            window.categoryNavigationItem = e.target;
        };

        i.onmouseleave = (e) => {
            if (document.getElementById("navbar") && document.getElementById("navbar").classList.contains("fella-nav-mobile-open")) return;
            if (e.target.classList.contains("fella-nav-navigation-item-with-category")) return;
            e.target.classList.remove("open");
        }
    });

    if (document.getElementById("navbar-category-outer")) document.getElementById("navbar-category-outer").onmouseleave = document.body.onmouseleave = (e) => {
        if (document.getElementById("navbar").classList.contains("fella-nav-mobile-open")) return;
        if (window.categoryNavigationItem) {
            window.categoryNavigationItem.classList.remove("open");
            window.categoryNavigationItem = null;
        }
        if (window.categorySection) {
            window.categorySection.classList.remove("show");
            Array.from(document.getElementsByClassName("fella-nav-category-base")).map(i => i.classList.remove("hide"));
            window.categorySection.classList.add("hide");
            window.categorySection = null;
        }
        if (document.getElementById("navbar-navigation") && !e._switching) document.getElementById("navbar-navigation").onmouseleave(null);
    }

    if (document.getElementById("navbar-inner-left")) document.getElementById("navbar-inner-left").onmouseleave = () => {
        if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.transition = "opacity 150ms ease";
    }

    if (document.getElementById("navbar-navigation")) document.getElementById("navbar-navigation").onmousemove = (e) => {
        if (document.getElementById("navbar").classList.contains("fella-nav-mobile-open")) return;
        if (document.getElementById("navbar-category-outer")) document.getElementById("navbar-category-outer").onmousemove(e);
        if (document.getElementById("navbar-category")) document.getElementById("navbar-category").style.transition = "width 150ms ease, height 150ms ease";
        if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.transition = "left 250ms ease, width 250ms ease, opacity 150ms ease";
        if (document.getElementById("navbar-category-indicator")) document.getElementById("navbar-category-indicator").style.transition = "left 250ms ease";
    };

    if (document.getElementById("navbar-navigation")) document.getElementById("navbar-navigation").onmouseleave = (e) => {
        if (document.getElementById("navbar").classList.contains("fella-nav-mobile-open")) return;
        if (window.categoryNavigationItem && window.categoryNavigationItem.classList.contains("fella-nav-navigation-item-with-category")) return;
        if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.opacity = "0";
        if (document.getElementById("navbar-tabs") && e) document.getElementById("navbar-tabs").style.transition = "opacity 150ms ease";
        if (document.getElementById("navbar-category")) document.getElementById("navbar-category").style.transition = "";
        if (document.getElementById("navbar-category-indicator")) document.getElementById("navbar-category-indicator").style.transition = "";
        if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.left = "0";
        if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.width = "0";
    };

    if (document.getElementById("navbar-category-outer")) document.getElementById("navbar-category-outer").onmousemove = (e) => {
        if (document.getElementById("navbar-inner-left")) document.getElementById("navbar-inner-left").classList.remove("navigating");
        if (document.getElementById("navbar") && document.getElementById("navbar").classList.contains("fella-nav-mobile-open")) return;
        if (window.lastPosition === -1) {
            window.lastPosition = e.clientX;
        }

        if (e.clientX - window.lastPosition < -2) {
            Array.from(document.getElementsByClassName("fella-nav-category-base")).map(i => i.classList.add("reverse"));
        } else if (e.clientX - window.lastPosition > 2) {
            Array.from(document.getElementsByClassName("fella-nav-category-base")).map(i => i.classList.remove("reverse"));
        }

        window.lastPosition = e.clientX;
    }

    if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.opacity = "0";
    if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.transition = "opacity 150ms ease";
    if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.left = "0";
    if (document.getElementById("navbar-tabs")) document.getElementById("navbar-tabs").style.width = "0";

    window.onresize = () => {
        if (window.innerWidth > 900) {
            if (document.getElementById("navbar")) document.getElementById("navbar").classList.remove("fella-nav-mobile-open");
        }
    }
}

// navbar.js
window.scrollHooks = [];

window.onscroll = () => {
    updateScroll();
}

window.updateScroll = () => {
    if (document.getElementById("navbar") && !document.getElementById("navbar").classList.contains("fella-nav-fixed")) {
        if (window.scrollY === 0) {
            document.getElementById("navbar").classList.add("fella-nav-no-border");
        } else {
            document.getElementById("navbar").classList.remove("fella-nav-no-border");
        }
    }

    if (document.getElementById("mobile-navbar") && !document.getElementById("navbar").classList.contains("fella-nav-fixed")) {
        if (window.scrollY === 0) {
            document.getElementById("navbar").classList.add("fella-nav-no-border");
        } else {
            document.getElementById("navbar").classList.remove("fella-nav-no-border");
        }
    }

    for (let name of scrollHooks) {
        if ('temporaryPageData' in window && name in window.temporaryPageData) {
            window.temporaryPageData[name]();
        }
    }
}

window.mobileNavbar = () => {
    if (document.getElementById("navbar").classList.contains("fella-nav-mobile-open")) {
        document.getElementById("navbar").classList.remove("fella-nav-mobile-open");
    } else {
        document.getElementById("navbar").classList.add("fella-nav-mobile-open");
    }
}

// load.js
window.addEventListener('load', () => {
    loadNavigation();
});

