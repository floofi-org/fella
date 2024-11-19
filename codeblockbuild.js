const hljs = require('highlight.js');

const highlightedCode = hljs.highlight(
    `
<nav id="navbar" class="fella-nav">
    <div class="fella-nav-inner">
        <div class="fella-nav-left">
            <a href="/" target="_blank">
                <img class="fella-nav-icon" alt="Test Thing" src="/assets/logo.png">
            </a>
        </div>
        <div class="fella-nav-right">
            <span class="fella-nav-subtitle">Hello world</span>
        </div>
    </div>
</nav>



`.trim(),
    { language: 'html' }
).value

require('fs').writeFileSync("dev-codeblock.html", highlightedCode.split("\n").map(i => "<div class=\"line\">" + i + "</div>").join(""));