import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'
export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
    // 1.payLoad新添加的商品

    // find()返回符合条件的值
    let oldproduce = context.state.CartList.find(item => item.iid === payload.iid)

    //2.判断oldproduct 
    if(oldproduce){
      context.commit(ADD_COUNTER,oldproduce)
      resolve('当前商品数量+1')
    }else{
      // 这里可以为payload添加count属性
      context.commit(ADD_TO_CART,payload)
      resolve('添加了新商品')
    }
    })
    // console.log(context.state.CartList);
  }
}