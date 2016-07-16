const assert = require("power-assert");
import {parse, detect} from "../src/ecmascript-version-detector";
describe("ecmascript-version-detector-test", function() {
    it("should return array", function() {
        const results = parse(`const foo = [];`);
        assert(results.length > 0);
    });
    it("should each result have name", function() {
        const results = parse(`const foo = [];`);
        const constResults = results.filter(result => {
            assert(result.selector);
            assert(result.en);
            assert(result.version);
            assert(result.en.name);
            return result.en.name === "VariableDeclaration const";
        });
        assert(constResults.length === 1);
    });
    it("should filter duplicated range", function() {
        const results = parse(`1 ** 2;`);
        // not found binary expression
        assert(results.find(info => {
            return info.selector === "//BinaryExpression";
        }) === undefined);
        // found **
        assert(results.find(info => {
            return info.selector === "//BinaryExpression[@operator=='**']";
        }));
    });
    describe("#detect", function() {
        it("should return versions", function() {
            var code = `
const obj = {
    get prop(){}
};
const res = 1 ** 2;
const foo = {...obj};
`;
            const versions = detect(code);
            assert.deepEqual(versions, ["3", "5", "2015", "2016", "proposal"]);
        });

    });
});