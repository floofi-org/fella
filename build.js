(async () => {
    const fs = require('fs');
    const csso = require('csso');
    const files = fs.readdirSync("./src").filter(i => i.endsWith(".css")).reverse();
    const version = fs.readFileSync("./version.txt").toString().trim();

    let output = "@charset \"UTF-8\";\n\n/*!\n * Fella version " + version + "\n * Copyright Floofi Systems\n */\n\n";

    for (let file of files) {
        output += "/* " + file + " */\n";
        output += fs.readFileSync("./src/" + file).toString().trim();
        output += "\n\n";
    }

    if (fs.existsSync("./dist/" + version)) {
        console.error("Version already exists.");
        return;
    }

    fs.mkdirSync("./dist/" + version);
    fs.writeFileSync("./dist/" + version + "/fella.css", output);

    let minified = csso.minify(output, {
        filename: 'fella.min.css',
        sourceMap: true
    });

    fs.writeFileSync("./dist/" + version + "/fella.min.css", minified.css + "\n/*# sourceMappingURL=fella.min.css.map */");
    fs.writeFileSync("./dist/" + version + "/fella.min.css.map", minified.map.toString());

    require('child_process').execSync("vercel --prod", { stdio: "inherit", cwd: "./dist" });
})();
