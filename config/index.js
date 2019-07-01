module.exports = {
  production: {
    configureWebpack: {
      entry: {
        main: "./src/main.js"
      }
    }
  },
  development: {
    configureWebpack: {
      entry: {
        main: "./examples/main.js"
      }
    }
  }
}