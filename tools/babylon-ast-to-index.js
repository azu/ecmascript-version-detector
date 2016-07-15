"use strict";
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const existSync = require("exists-sync");
var list = [
    {
        type: "Identifier",
    },
    {
        type: "RegExpLiteral",
    },
    {
        type: "NullLiteral",
    },
    {
        type: "StringLiteral",
    },
    {
        type: "BooleanLiteral",
    },
    {
        type: "NumericLiteral",
    },
    {
        type: "Program",
        sourceType: ["script", "module"]
    },
    {
        type: "ExpressionStatement",
    },
    {
        type: "BlockStatement",
    },
    {
        type: "EmptyStatement",
    },
    {
        type: "DebuggerStatement",
    },
    {
        type: "WithStatement",
    },
    {
        type: "ReturnStatement",
    },
    {
        type: "LabeledStatement",
    },
    {
        type: "BreakStatement",
    },
    {
        type: "ContinueStatement",
    },
    {
        type: "IfStatement",
    },
    {
        type: "SwitchStatement",
    },
    {
        type: "SwitchCase",
    },
    {
        type: "ThrowStatement",
    },
    {
        type: "TryStatement",
    },
    {
        type: "CatchClause",
    },
    {
        type: "WhileStatement",
    },
    {
        type: "DoWhileStatement",
    },
    {
        type: "ForStatement",
    },
    {
        type: "ForInStatement",
    },
    {
        type: "ForOfStatement",
    },
    {
        type: "FunctionDeclaration",
    },
    {
        type: "VariableDeclaration",
        kind: ["var", "let", "const",]
    },
    {
        type: "VariableDeclarator",
    },
    {
        type: "Decorator",
    },
    {
        type: "Directive",
    },
    {
        type: "DirectiveLiteral",
    },
    {
        type: "Super",
    },
    {
        type: "ThisExpression",
    },
    {
        type: "ArrowFunctionExpression",
    },
    {
        type: "YieldExpression",
    },
    {
        type: "AwaitExpression",
    },
    {
        type: "ArrayExpression",
    },
    {
        type: "ObjectExpression",
    },
    {
        type: "ObjectProperty",
    },
    {
        type: "ObjectMethod",
        kind: ["get", "set", "method",]
    },
    {
        type: "RestProperty",
    },
    {
        type: "SpreadProperty",
    },
    {
        type: "FunctionExpression",
    },
    {
        type: "UnaryExpression",
    },
    {
        type: "UpdateExpression",
    },
    {
        type: "BinaryExpression",
    },
    {
        type: "AssignmentExpression",
    },
    {
        type: "LogicalExpression",
    },
    {
        type: "SpreadElement",
    },
    {
        type: "MemberExpression",
    },
    {
        type: "BindExpression",
    },
    {
        type: "ConditionalExpression",
    },
    {
        type: "CallExpression",
    },
    {
        type: "NewExpression",
    },
    {
        type: "SequenceExpression",
    },
    {
        type: "TemplateLiteral",
    },
    {
        type: "TaggedTemplateExpression",
    },
    {
        type: "TemplateElement",
    },
    {
        type: "ObjectPattern",
    },
    {
        type: "ArrayPattern",
    },
    {
        type: "RestElement",
    },
    {
        type: "AssignmentPattern",
    },
    {
        type: "ClassBody",
    },
    {
        type: "ClassMethod",
        kind: ["constructor", "method", "get", "set",]
    },
    {
        type: "ClassProperty",
    },
    {
        type: "ClassDeclaration",
    },
    {
        type: "ClassExpression",
    },
    {
        type: "MetaProperty",
    },
    {
        type: "ImportDeclaration",
    },
    {
        type: "ImportSpecifier",
    },
    {
        type: "ImportDefaultSpecifier",
    },
    {
        type: "ImportNamespaceSpecifier",
    },
    {
        type: "ExportNamedDeclaration",
    },
    {
        type: "ExportSpecifier",
    },
    {
        type: "ExportDefaultDeclaration",
    },
    {
        type: "ExportAllDeclaration",
    }
];

const results = [];
list.forEach(object => {
    let selectors = [`//${object.type}`];
    if (object.kind) {
        const currentSel = selectors[0];
        selectors = object.kind.map(kind => {
            return currentSel + `[@kind=='${kind}']`;
        });
    }
    if (object.sourceType) {
        const currentSel = selectors[0];
        selectors = object.sourceType.map(sourceType => {
            return currentSel + `[@sourceType=='${sourceType}']`;
        });
    }
    selectors.forEach(selector => {
        results.push(selector);
    })
});
results.forEach(selector => {
    const regExp = /^\/\/([a-zA-Z]*)/;
    const subRegExp = /\[@.*?=='(.*?)'/;
    const baseName = selector.match(regExp)[1];
    const subName = subRegExp.test(selector) ? ("-" + selector.match(subRegExp)[1]) : "";
    const dirName = baseName + subName;
    // create dir
    mkdirp.sync(path.join(__dirname, "..", "data", dirName));
    const index = {
        js: {
            selector: selector,
            version: "2015",
            en: {
                name: dirName
            }
        }
    };
    const content = "module.exports = " + JSON.stringify(index.js, null, 4) + ";";
    const outputPath = path.join(__dirname, "..", "data", dirName, "index.js");
    if (existSync(outputPath)) {
        return;
    }
    fs.writeFileSync(outputPath, content, "utf-8");
});