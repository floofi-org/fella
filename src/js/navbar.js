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

    if (g("mobile-navbar") && !g("navbar").classList.contains("fella-nav-fixed")) {
        if (window.scrollY === 0) {
            g("navbar").classList.add("fella-nav-no-border");
        } else {
            g("navbar").classList.remove("fella-nav-no-border");
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