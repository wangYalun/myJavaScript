var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './md5.js',
    output: {
        path: __dirname,
        filename: 'md5.dist.js',
        library: 'md5',
        libraryTarget: 'var'
    }
}