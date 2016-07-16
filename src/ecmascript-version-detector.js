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

export function detect(code) {
    const results = parse(code);
    const versions = {};
    results.forEach(result => {
        versions[result.version] = true;
    });
    return Object.keys(versions);
}

export function parse(code) {
    const AST = parseCode(code);
    const infoList = [];
    // ignore to add duplicated range
    const canPushInfo = (type, match) => {
        const {start, end} = match;
        const sameRangeInfo = infoList.find(targetInfo => {
            return targetInfo.node.start === start && targetInfo.node.end === end;
        });
        if (!sameRangeInfo) {
            return true;
        }
        // Specificity - prefer detail selector
        return type.selector.length > sameRangeInfo.selector.length;
    };
    typeList.forEach(type => {
        const selector = type.selector;
        const results = astq.query(AST, selector);
        if (results.length === 0) {
            return false;
        }
        results.forEach(match => {
            if (!canPushInfo(type, match)) {
                return;
            }
            const result = ObjectAssign({}, type, {node: match});
            infoList.push(result);
        });
        return true;
    });
    return infoList;
}
