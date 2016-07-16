// LICENSE : MIT
"use strict";
const parse = require("ecmascript-version-detector").parse;
export default class Marker {
    createMarks(code) {
        try {
            const results = parse(code);
            return results.filter(result => {
                return !result.trivial;
            }).sort((a, b) => {
                return a.node.start - b.node.start;
            });
        } catch (error) {
            return [];
        }
    }
}