if (localStorage.getItem("fella-sidebar") === "false") {
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