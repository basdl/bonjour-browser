import * as fs from "fs";
const content = fs.readFileSync("package.json", "utf8");
console.log(JSON.parse(content)["version"]);
