const { execSync } = require("child_process");
const fs = require("fs");

if (fs.existsSync("./docs")) {
  fs.rmSync("./docs", { recursive: true });
}

fs.mkdirSync("./docs");

execSync('babel src -d docs -x ".js,.ts"');
execSync("sass src/index.sass docs/style.css");

fs.cpSync("./src/index.html", "./docs/index.html");
