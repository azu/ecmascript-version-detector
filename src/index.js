// LICENSE : MIT
"use strict";
const typeList = require("../data/index.json");
import {detect, parse} from "./ecmascript-version-detector";
module.exports = {
    typeList,
    detect,
    parse
};