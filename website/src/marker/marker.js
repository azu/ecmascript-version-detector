// LICENSE : MIT
"use strict";
const parse = require("ecmascript-version-detector").parse;
export default class Marker {
    static get ignoreNodeRegExp() {
        return /Program/;
    }

    createMarks(code) {
        try {
            const results = parse(code);
            return results.filter(result => {
                return !Marker.ignoreNodeRegExp.test(result.node.type);
            }).sort((a, b) => {
                return a.node.start - b.node.start;
            });
        } catch (error) {
            return [];
        }
    }
}