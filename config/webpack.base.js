const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FileListPlugin = require('../plugins/filelist-plugin')

const dev = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const miniCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // hmr: process.env.NODE_ENV === 'development',
    // reloadAll: true,
    publicPath: '../'
  },
}

const config = {
  entry: {
    app: './src/index.js',
    // vendor: ["lodash"], // 指定公共使用的第三方类库
  },

  output: {
    path: resolve('dist'),
    filename: 'js/app.[hash].js',
    chunkFilename: 'js/[name].[hash].chunk.js',
  },

  module: {
    noParse: /jquery/, // 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader"
          }
        ]
      },
      {
        test: /\.jsx?/,
        include: [
          resolve('src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.(css|styl)$/,
        include: [
          resolve('src'),
        ],
        use: [
          dev ? 'style-loader' : miniCssLoader,
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.html$/, //处理html模板中的loader
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif|jpeg|bmp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
              name: 'img/[name].[hash].[ext]'
            },
          },
        ],
      },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    modules: [
      resolve('node_modules'),
      resolve('src'),
    ],
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue'],
  },

  resolveLoader: {
    modules: [
      resolve('node_modules'),
      resolve('loaders'),
    ],
    // extensions: ['.js', '.json'],
    // mainFields: ['loader', 'main'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html', // 配置输出文件名和路径
      template: './src/index.html', // 配置文件模板
      minify: false,
      // minify: { // 压缩 HTML 的配置
      //   minifyCSS: true,
      //   minifyJS: true,
      //   removeComments: true
      // }
    }),
    new MiniCssExtractPlugin({
      path: 'css',
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].chunk.css'
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: '1+1', // const TWO = 1 + 1,
    }),
    // new CopyWebpackPlugin([
    //   { from: 'src/file.txt', to: 'build/file.txt', }, // 顾名思义，from 配置来源，to 配置目标路径
    //   { from: 'src/*.ico', to: 'build/*.ico' }, // 配置项可以使用 glob
    // ]),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   identifier: ['module', 'property'], // 即引用 module 下的 property，类似 import { property } from 'module'
    // }), // 自动加载模块
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 忽略文件，不打包
    new FileListPlugin()
  ]
}

module.exports = config
