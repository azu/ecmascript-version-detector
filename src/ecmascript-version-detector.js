// LICENSE : MIT
"use strict";
const babylon = require("babylon");
const ASTQ = require("astq");
const typeList = require("../data/index.json");
function parse(code) {
    return require("babylon").parse(code, {
        sourceType: "module",
        plugins: [
            "jsx",
            "flow",
            "asyncFunctions",
            "classConstructorCall",
            "doExpressions",
            "trailingFunctionCommas",
            "objectRestSpread",
            "decorators",
            "classProperties",
            "exportExtensions",
            "exponentiationOperator",
            "asyncGenerators",
            "functionBind",
            "functionSent"
        ]
    });
}

const AST = parse(`1+1;`);
let astq = new ASTQ();
const r = [];
const foundType = typeList.filter(type => {
    const selector = type.selector;
    const results = astq.query(AST, selector);
    if (results.length === 0) {
        return false;
    }
    results.forEach(match => {
        const result = Object.assign({}, type, {node: match});
        r.push(result);
    });
    return true;
});
console.log(r);