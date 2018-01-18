const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: process.env.NODE_ENV === "development"
})

module.exports = {
    watch: false,
    entry: {
        home: './assets/js/home.js',
        services: './assets/js/services.js',
        "post-form": './assets/js/post-form.js',
        scroll: './assets/js/scroll.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'assets/bundle')
    },
    module: {
        rules: [{
            test: /\.sass$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ]
};
