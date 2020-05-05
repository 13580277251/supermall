import axios from 'axios'

export function request(config){
      // 1.创建axios的实例
  const instance =axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout:5000
  })

  // 2.axios的拦截器interceptors(拦截器) => 拦截请求
  instance.interceptors.request.use(config => {
    // console.log(config);
    /* 2.1请求拦截的作用 */
    // 例子：1.比如config中的一些信息不符合服务器的要求

    // 2.比如每次发送网络请求的时候，都希望在界面显示一个请求的图标

    // 3.某些网络请求（比如登录(token)，必须携带一些特殊的信息

    // 拦截之后应该返回，要不然后续的网络请求拿不到config
    return config
  },err => {
    console.log(err);
  })

  // 响应拦截
    instance.interceptors.response.use(res => {
      // console.log(res);
      // 只需要返回data数据就行
      return res.data
    },err => {
      console.log(err);
    })

  // 3.发送真正的网络请求
  // 返回值就是一个promis
  return instance(config)
}