const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: process.env.NODE_ENV === "development"
})

module.exports = {
    watch: true,
    watchOptions: {
        poll: 1000
    },
    entry: {
        layout: './assets/js/layout.js',
        home: './home/static/home/js/home.js',
        services: './assets/js/services.js',
        "contact-form": './contact/static/contact/js/contact-form.js',
        scroll: './assets/js/scroll.js',
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'assets/bundle'),
        publicPath: '/static/'
    },
    module: {
        rules: [{
            test: /\.sass$/,
            use: extractSass.extract({
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }],
                    fallback: "style-loader"
                }),
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash].[ext]',
                }
            }]
        }
    ]
    },
    plugins: [
        extractSass,
    ]
};
