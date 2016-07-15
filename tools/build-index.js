// LICENSE : MIT
"use strict";
const glob = require("glob");
const fs = require("fs");
const path = require("path");
function buildIndex() {
    const fileList =  glob.sync(__dirname + "/../data/*/index.js");
    return fileList.map(filePath => require(filePath));
}

const index = {
    json: buildIndex()
};

fs.writeFileSync(path.join(__dirname, "../data/index.json"), JSON.stringify(index.json, null, 4), "utf-8");