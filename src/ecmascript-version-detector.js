// LICENSE : MIT
"use strict";
const babylon = require("babylon");
const ASTQ = require("astq");
const ObjectAssign = require("object.assign");
const astq = new ASTQ();
const typeList = require("../data/index.json");
function parseCode(code) {
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

export function detect(code){
    const results = parse(code);
    const versions = {};
    results.forEach(result => {
        versions[result.version] = true;
    });
    return Object.keys(versions);
}

export function parse(code) {
    const AST = parseCode(code);
    const r = [];
    typeList.forEach(type => {
        const selector = type.selector;
        const results = astq.query(AST, selector);
        if (results.length === 0) {
            return false;
        }
        results.forEach(match => {
            const result = ObjectAssign({}, type, {node: match});
            r.push(result);
        });
        return true;
    });
    return r;
}
