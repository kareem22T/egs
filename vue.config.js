const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


   module.exports = {
     devServer: {
       proxy: {
         '/api': {
           target: 'http://api.egyptgamestore.com',
           changeOrigin: true,
           pathRewrite: {
             '^/api': ''
           }
         }
       }
     }
   };
   