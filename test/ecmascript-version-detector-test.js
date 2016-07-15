const assert = require("power-assert");
import {detect} from "../src/ecmascript-version-detector";
describe("ecmascript-version-detector-test", function() {
    it("should return array", function() {
        const results = detect(`const foo = [];`);
        assert(results.length > 0);
    });
    it("should each result have name", function() {
        const results = detect(`const foo = [];`);
        const constResults = results.filter(result => {
            assert(result.selector);
            assert(result.en);
            assert(result.version);
            assert(result.en.name);
            return result.en.name === "VariableDeclaration const";
        });
        assert(constResults.length === 1);
    });
});