<template>
 <div class="bottom-bar">
   <div  class="check-content">
      <check-buttom :is-checked = 'isSelectall'  
      class="check-button" @click.native="checkedall"></check-buttom>
      <span>全选</span>
   </div>
   <div class="price">
     合计：{{totalPrice}}
   </div>
   <div class="calculate" @click="calcClick">
     去计算({{checkLength}})
   </div>
 </div>
</template>

<script>
import CheckButtom from '@components/content/checkButtom/CheckButtom'

import { mapGetters } from 'vuex';

export default {
  name:'CartBottomBar',
  components:{
    CheckButtom
  },
  computed: {
    ...mapGetters(['cartlist','cartLength']),
    totalPrice(){
      return this.cartlist.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return item.price*item.count + preValue
      },0).toFixed(2)
    },
    checkLength(){
    return this.cartlist.filter(item => {
      // true的才会返回
      return item.checked
    },0).length
  },
  isSelectall(){
    // if(this.cartLength === 0){
    //   return false
    // }else{
    //   return this.cartLength === this.checkLength
    // }
    return this.cartLength === 0 ? false : this.cartLength === this.checkLength
  }
  },
  methods: {
    checkedall(){
      if(this.isSelectall){
        return this.cartlist.map(item => {
          return item.checked = false
      })
      }else{
        return this.cartlist.map(item => {
          return item.checked = true
      })
      }
  },
  calcClick(){
    if(!this.checkLength){
          this.$toast.show('请选择购买的商品',1500)
    }else{
      this.$toast.show('即将进入支付界面',1500)
    }
  }
  },
}
</script>

<style scoped>
  .bottom-bar{
    height: 38px;
    background-color: #eeeeee; 
    position: relative;
    bottom: -604px;
    line-height: 40px;
    align-items: center;
    display: flex;
    font-size: 18px;
  }
  .check-content{
    display: flex;
    line-height: 22px;
    margin-left: 10px;
  }
  .check-button{
    width: 22px;
    height: 22px;
    margin-right: 5px;
  }
  .price{
    margin-left: 60px;
  }
  .calculate{
    position: absolute;
    right: 0;
    padding: 0 10px;
    background-color: var(--color-tint);
  }
</style>