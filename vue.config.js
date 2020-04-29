const path = require('path');
function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  // configureWebpack:{
  //   resolve:{
  //     alias:{
  //       '@':'src',
  //       'assets':'@/assets',
  //       'common':'@/common',
  //       'components':'@/components',
  //       'network':'@/network',
  //       'views':'@/views'
  //     }
  //   }
  // }
  chainWebpack:(config) => {
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
      .set('@network', resolve('src/network'))
      .set('@common', resolve('src/common'));
  }
}