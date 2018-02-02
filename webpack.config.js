const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].[hash].css',
    disable: process.env.NODE_ENV === 'development'
})

module.exports = {
    watch: true,
    watchOptions: {
        poll: 1000
    },
    entry: {
        layout: './static/js/layout.js',
        services: './static/js/services.js',
        scroll: './static/js/scroll.js',
        // home django app files
        home: './home/static/home/js/home.js',
        // contact django app files
        contactForm: './contact/static/contact/js/contact-form.js',
    },
    output: {
        filename: 'js/[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'assets'),
        publicPath: '/'
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
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                }),
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'img/',
                    publicPath: '/assets/'
                }
            }]
        }
    ]
    },
    plugins: [
        extractSass,
        new CleanWebpackPlugin(['assets']),
        new HtmlWebpackPlugin({
            filename:  path.resolve(__dirname, 'templates/layout.bundle.html'),
            title: 'Linekode | Home',
            chunks: ['layout'],
            template: 'templates/layout.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename:  path.resolve(__dirname, 'home/templates/home/home.bundle.html'),
            title: 'Linekode | Home',
            chunks: ['home', 'services', 'contactForm'],
            template: 'home/templates/home/home.html',
            inject: false
        })
    ]
};
