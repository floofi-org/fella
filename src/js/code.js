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