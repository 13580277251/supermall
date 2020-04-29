import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const store = new Vuex.Store({
  state:{
    CartList:[]
  },
  mutations:{
    addCart(state,payload){
      // 1.payLoad新添加的商品

      // 如下另外两种方法判断payload是否在Cartload中

      // indexOf返回查找内容在数组中的索引
      // let oldproduct = state.CartList.indexOf(payload)


      /*       这里具备了浅拷贝的知识点，就是对oldproduce的值传递是引用类型的，和item
      指向的是同一个内存地址，所以改变任何一个变量都会改变双方 */
      // let oldproduce = null
      // for(let item of state.CartList){
      //   if(item.iid === payload.iid){
      //     oldproduce = item
      //   }
      // }

      // find()返回符合条件的值
      let oldproduce = state.CartList.find(item => item.iid === payload.iid)

      //2.判断oldproduct 
      if(oldproduce){
        oldproduce.count += 1
      }else{
        // 这里可以为payload添加count属性
        payload.count = 1
        state.CartList.push(payload)
      }
      console.log(state.CartList[0].count);
      
    }
  },
})

// 3.导出，并且挂载vue实例上
export default store