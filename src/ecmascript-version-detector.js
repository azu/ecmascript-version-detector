// LICENSE : MIT
"use strict";
const babylon = require("babylon");
const ASTQ = require("astq");
const ObjectAssign = require("object.assign");
const astq = new ASTQ();
const types = require("../data/index.json");
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

/**
 * parse `code` and return `results`.
 * Sometimes, the `parse` function throw parse error.
 * @param {string} code
 * @returns {{selector:string, version:string, node: Object, en: Object}[]} results
 * @throws
 */
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
    types.forEach(type => {
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
