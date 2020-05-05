// postcss-px-to-viewport，可以将px单位自动转换成viewport单位（vw表示屏幕的1%
module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,   //视窗高度
      viewportHeight:667,   //视窗的高度
      unitPrecision:5,      //指定‘px’转换为视窗单位的小数位
      viewportUnit:'vw',    //指定需要转换成的视窗单位，建议使用vw
      selecttorBlackList:['ignore','tab-bar','tab-bar-item'],  //指定不需要转换的类
      minPixelValue:1,  //小于或者等于‘1px’不转换为视窗单位
      mediaQuery: false,   //允许在媒体查询中转换'px'
    }
  }
}