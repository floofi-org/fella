const hljs = require('highlight.js');

const highlightedCode = hljs.highlight(
    `
<Navigation id="navbar">
    <NavigationLeft>
        <NavigationIcon label="Test Thing" target="/" image="/assets/logo.png" />
    </NavigationLeft>
    <NavigationRight>
        <NavigationSubtitle>Hello world</NavigationSubtitle>
    </NavigationRight>
</Navigation>



`.trim(),
    { language: 'html' }
).value

require('fs').writeFileSync("dev-codeblock.html", highlightedCode.split("\n").map(i => "<div class=\"line\">" + i + "</div>").join(""));