module.exports = {
    entry: "./public/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.png$/, loader: "url-loader?limit=8192" },
        ]
    }
};