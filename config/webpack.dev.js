const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const base = require('./webpack.base.js')

const config = {
  optimization: {
    namedModules: true
  },
  devServer: {
    hot: true,
    // contentBase: [path.join(__dirname, '../src/public'), path.join(__dirname, '../src/assets')], // 不经过webpack构建，额外的静态文件内容的访问路径
    // proxy: { // 代理
    //   '/api': {
    //     target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
    //     pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
    //   },
    // },
  }
}

module.exports = merge(base, config)
