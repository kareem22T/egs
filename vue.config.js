// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
    proxy: {
      '^/users': {
        target: 'http://api.egyptgamestore.com/',
        ws: true,
        changeOrigin: true
      },
    }
  }
}