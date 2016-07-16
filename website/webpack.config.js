const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: [
        "./src/index.js"
    ],
    devtool: process.env.WEBPACK_DEVTOOL || "source-map",
    output: {
        path: path.join(__dirname, "public", "build"),
        publicPath: "/build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },

    // to avoid warning by power-assert-formatter
    exprContextCritical: false,
    resolve: {
        packageAlias: "browser",
        alias: {
            root: [path.join(__dirname, "node_modules")],
            "asty": "asty/lib/asty.browser.js",
            "astq": "astq/lib/astq.browser.js"
        }
    }
};
