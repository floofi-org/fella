(async () => {
    const fs = require('fs');
    const csso = require('csso');
    const {minify} = require("terser");
    const css = fs.readdirSync("./src/css").filter(i => i.endsWith(".css")).reverse();
    const js = fs.readdirSync("./src/js").filter(i => i.endsWith(".js")).reverse();
    const version = fs.readFileSync("./version.txt").toString().trim();

    let cssOutput = "@charset \"UTF-8\";\n\n/*!\n * Fella version " + version + "\n * Copyright Floofi Systems\n */\n\n";
    let jsOutput = "/*!\n * Fella version " + version + "\n * Copyright Floofi Systems\n */\n\n";

    for (let file of css) {
        cssOutput += "/* " + file + " */\n";
        cssOutput += fs.readFileSync("./src/css/" + file).toString().trim();
        cssOutput += "\n\n";
    }

    for (let file of js) {
        jsOutput += "// " + file + "\n";
        jsOutput += fs.readFileSync("./src/js/" + file).toString().trim();
        jsOutput += "\n\n";
    }

    if (fs.existsSync("./dist/" + version)) {
        console.error("Version already exists.");
        return;
    }

    fs.mkdirSync("./dist/" + version);
    fs.writeFileSync("./dist/" + version + "/fella.css", cssOutput);
    fs.writeFileSync("./dist/fella.css", cssOutput);
    fs.writeFileSync("./dist/" + version + "/fella.js", jsOutput);
    fs.writeFileSync("./dist/fella.js", jsOutput);

    let minifiedCss = csso.minify(cssOutput, {
        filename: 'fella.min.css', sourceMap: true
    });

    fs.writeFileSync("./dist/" + version + "/fella.min.css", minifiedCss.css + "\n/*# sourceMappingURL=fella.min.css.map */");
    fs.writeFileSync("./dist/fella.min.css", minifiedCss.css + "\n/*# sourceMappingURL=fella.min.css.map */");
    fs.writeFileSync("./dist/" + version + "/fella.min.css.map", minifiedCss.map.toString());
    fs.writeFileSync("./dist/fella.min.css.map", minifiedCss.map.toString());

    const minifiedJs = await minify({'fella.js': jsOutput}, {
        sourceMap: {
            filename: "fella.min.js",
            url: "fella.min.js.map"
        }
    });

    fs.writeFileSync("./dist/" + version + "/fella.min.js", minifiedJs.code);
    fs.writeFileSync("./dist/fella.min.js", minifiedJs.code);
    fs.writeFileSync("./dist/" + version + "/fella.min.js.map", minifiedJs.map.toString());
    fs.writeFileSync("./dist/fella.min.js.map", minifiedJs.map.toString());

    fs.writeFileSync("./dist/vercel.json", JSON.stringify({
        redirects: [
            {
                source: "/",
                destination: "https://floo.fi/"
            }
        ],
        headers: [
            {
                source: "(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=3600, maxage=86400, stale-while-revalidate=300, stale-if-error=86400"
                    },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*"
                    }
                ]
            }
        ]
    }));

    require('child_process').execSync("vercel --prod", { stdio: "inherit", cwd: "./dist" });
})();
