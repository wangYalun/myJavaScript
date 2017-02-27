var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './client/src/js/index.js',
    output: {
        path: __dirname + "/client/dist",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./client/index.html',
            filename:'index.html'
        }),
        new ExtractTextPlugin("style.css"),
        new uglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    ]
}