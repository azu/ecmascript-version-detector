# ecmascript-version-detector [![Build Status](https://travis-ci.org/azu/ecmascript-version-detector.svg?branch=master)](https://travis-ci.org/azu/ecmascript-version-detector)

ECMAScript Version Detection library.

## Online demo

[![screenshot](https://monosnap.com/file/4CdkSilOA0ueFNQT5ovbBzzZkwOLiU.png)](https://azu.github.io/ecmascript-version-detector/)

Go to [https://azu.github.io/ecmascript-version-detector/](https://azu.github.io/ecmascript-version-detector/)

## Install

Install with [npm](https://www.npmjs.com/):

    npm install ecmascript-version-detector

## Usage

### `parse(code: string): {selector:string, version:string, node: Object, en: Object}[]`

Parse `code` and return `results`.

```js
const parse = require("ecmascript-version-detector").parse;
parse(`const x = 1 ** 2;`);
/*
[
    {
        "selector": "//BinaryExpression[@operator=='**']",
        "version": "2016",
        "en": {
            "name": "BinaryExpression exponentiation operator"
        },
        "node": {
            "type": "BinaryExpression",
            "start": 0,
            "end": 6,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 6
                }
            },
            "left": {
                "type": "NumericLiteral",
                "start": 0,
                "end": 1,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 1
                    }
                },
                "extra": {
                    "rawValue": 1,
                    "raw": "1"
                },
                "value": 1
            },
            "operator": "**",
            "right": {
                "type": "NumericLiteral",
                "start": 5,
                "end": 6,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 6
                    }
                },
                "extra": {
                    "rawValue": 2,
                    "raw": "2"
                },
                "value": 2
            }
        }
    },
    ....
]
*/
```


## Contributing

Pull requests and stars are always welcome.

### How to add [data](data/)?

1. `mkdir data/<new-node-type>`
2. add `index.js` to `data/<new-node-type>`
3. `npm run build`
4. Pull Request!!

`index.js` is following format:

```js
// BooleanLiteral is `true` or `false`
// This is available since ECMAScript version 3
// Display name is "BooleanLiteral"
module.exports = {
    "selector": "//BooleanLiteral",
    "version": "3",
    "en": {
        "name": "BooleanLiteral",
        "link": "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean"
    }
};
```

- `selector`: the selector match the node type.
    - This project use [ASTq](https://github.com/rse/astq "ASTq") query engine
    - This is similar to XPath query.
- `version`: the feature is available in the version
- `en`
    - `name`: display name
    - `link`: related link. e.g.) MDN link

For bugs and feature requests, [please create an issue](https://github.com/azu/ecmascript-version-detector/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Resources

- [babylon/spec.md at master · babel/babylon](https://github.com/babel/babylon/blob/master/ast/spec.md)
    - AST Spec
- [rse/astq: Abstract Syntax Tree (AST) Query Engine](https://github.com/rse/astq)
    - XPath like Query engine for AST

## Changelog

See [Releases page](https://github.com/azu/ecmascript-version-detector/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
