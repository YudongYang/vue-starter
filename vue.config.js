const path = require("path");
const WebpackConfig = require("./config");

const resolve = dir => {
  return path.join(__dirname, dir);
};

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = WebpackConfig[ENV];

module.exports = {
  configureWebpack: config.configureWebpack,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@c', resolve('src/components'))
      .set("@c", resolve("src/components"));
  }
};
