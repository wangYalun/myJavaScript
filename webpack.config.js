var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');


module.exports = {
  entry: {
    main: './React/src/index.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'React/dist')
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
            presets: ['env', 'react']
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
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ title: '学习用', template: path.resolve(__dirname, 'React/public/index.html') }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'React/public'), to: path.resolve(__dirname, 'React/dist') }
    ])
  ]
};
