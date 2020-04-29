<template>
 <div class="recommend">
   <goods-list-item v-for="(item,index) in recommend" 
   :key="index" :goods-item='item' class="goods-list-item"></goods-list-item>
 </div>
</template>

<script>
import GoodsListItem from "@components/content/goods/GoodsListItem"

export default {
  name:'Detailrecommend',
  components:{
    GoodsListItem
  },
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    flex-flow: row wrap;
    /* 间隔均等分行内剩余空间 */
    justify-content: space-around;
    padding: 2px;
  }
  .goods-list-item{
    flex: 0 0 48%;
  }
</style>