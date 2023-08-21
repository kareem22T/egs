// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
      proxy: 'http://api.egyptgamestore.com/',
      transpileDependencies: true,
      changeOrigin: true,
  } 
}