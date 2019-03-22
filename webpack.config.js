var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');


module.exports = {
  mode: 'none',
  entry: {
    main: './React/src/index.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'React/public')
  },
  output: {
    path: path.resolve(__dirname, 'React/dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: "./React/public/index.html" }),
    // new CopyWebpackPlugin([
    //   { from: path.resolve(__dirname, 'React/public'), to: path.resolve(__dirname, 'React/dist') }
    // ])
  ]
};
