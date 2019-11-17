// const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  output: {
    filename: '[name].[chunkhash:10].js',
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCSSExtractPlugin({ filename: 'assets/[name].[contenthash:10].css' }),
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
  ],
})
