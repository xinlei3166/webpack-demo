const devConfig = require("./config/webpack.dev.js")
const prodConfig = require("./config/webpack.prod.js")

module.exports = (env, argv) => {
  if(argv.mode === "production"){
    return prodConfig
  } else {
    return devConfig
  }
}
