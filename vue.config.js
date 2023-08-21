// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
    proxy: {
      '^/users': {
        target: 'https://egs-sigma.vercel.app/',
        ws: true,
        changeOrigin: true
      },
    }
  }
}