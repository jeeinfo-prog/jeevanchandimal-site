const fs = require("fs");
const path = require("path");

function walk(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p, files);
    else files.push(p);
  });
  return files;
}

const componentFiles = walk("components").filter(f => f.endsWith(".js"));

const codeFiles = walk("pages")
  .concat(walk("components"))
  .filter(f => f.endsWith(".js") && f.indexOf("node_modules") === -1);

const codeText = codeFiles.map(f => fs.readFileSync(f, "utf8")).join("\n");

const unused = [];

componentFiles.forEach(file => {
  const name = path.basename(file, ".js");
  const regex = new RegExp("from ['\"].*" + name + "['\"]|require\\(['\"].*" + name + "['\"]\\)");
  if (!regex.test(codeText)) {
    unused.push(file);
  }
});

console.log(unused.join("\n"));


