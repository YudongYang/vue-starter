const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  configureWebpack: {
    entry: {
      example: "./examples/main.js"
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@c', resolve('src/components'))
      .set("@c", resolve("src/components"));
  }
};
