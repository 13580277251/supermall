<template>
 <div class="cartlist">
   <scroll class="content" ref="scroll">
     <CartListItem 
   v-for="(item,index) in cartlist" 
   :key="index" 
   :list-item = 'item' :currentindex = 'index'>
   </CartListItem>
   </scroll>
 </div>
</template>

<script>
import CartListItem from './CartListItem'

import scroll from '@components/common/scroll/Scroll'

// mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
import { mapGetters } from 'vuex';

export default {
  name:'CartList',
  components:{
    CartListItem,
    scroll
  },
   computed: {
    ...mapGetters([
      'cartlist'
      // 也可以进行映射
      // length:'carLength'
    ])
  },
  activated() {
    // 每次进入购物车都重新计算一下内容高度
    this.$refs.scroll.refresh()   
  },
}
</script>

<style scoped>
 .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0px;
    right: 0px;
  }
</style>