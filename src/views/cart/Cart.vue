<template>
 <div class="cart">
   <!-- 导航 -->
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
   </nav-bar>
   <!-- 商品列表 -->
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>

 </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'
import CartList from './childComps/CarList'
import CartBottomBar from './childComps/CartBottomBar'

// mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
import { mapGetters } from 'vuex';

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'cartLength'
      // 也可以进行映射
      // length:'carLength'
    ])
  },
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 600;
  }
</style>