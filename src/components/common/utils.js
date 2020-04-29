    /* 通过定时器设置防抖动函数 */
    // 原理：通过下一次的itemImageLoad事件执行，打断上一次的itemImageLoad函数在500毫秒未执行完的进程
export function debounce(func,delay){
  let timers = null

  return function(...args){
    // 清除定时器，打断下面的函数执行
    if (timers) clearInterval(timers)

    timers = setTimeout(() => {
      // apply改变函数指向，指向所需参数,指向refresh  
      func.apply(this,args)
    },delay)
  }
}