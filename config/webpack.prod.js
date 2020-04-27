const path = require('path')
const merge = require('webpack-merge')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const base = require('./webpack.base.js')

const config = {
  optimization: {
    minimizer: [ // 压缩css和js，设置--mode production才生效，webpack5已经自带
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: { // 代码拆分
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      // cacheGroups: {
      //   vendor: {
      //     chunks: "initial",
      //     test: path.resolve(__dirname, '..', 'node_modules'), // 路径在 node_modules 目录下的都作为公共部分
      //     name: "vendor", // 使用 vendor 入口作为公共部分
      //     enforce: true,
      //   },
      // },
    },
  },

  plugins: [
    new CleanWebpackPlugin()
  ],
}

module.exports = merge(base, config)
