module.exports = {
    entry: ['./src/js/app.js'],
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader'},
            { test: /\.less$/, loader: 'style!css!less!'},
            { test: /\.(png|jpg|jpeg)$/, loader: 'url?limit=8192'}
        ]
    }//,
    //devtool: "source-map"
};
