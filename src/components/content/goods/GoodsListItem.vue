<template>
 <div class="goods-item" @click="itemClick">
     <!-- @load代表加载完成之后出发方法imgLoad， -->
      <img :src="getImg" alt="" @load="imgeLoad">
   <div class="goods-info">
     <p>{{goodsItem.title}}</p>
     <span class="price">{{goodsItem.price}}</span>
     <span class="collect">{{goodsItem.cfav}}</span>
   </div>
 </div>
</template>

<script>

export default {
  name:'GoodListItem',
  props:{
    goodsItem:{
      type:Object,
      default() {
        return {}
    }
  }
  },
  methods: {
    imgeLoad(){
      // 通过在离开某组件的时候，取消其对事件的监听
      this.$bus.$emit('itemImageLoad')

      // 通过路由的判断对各组件进行判断
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeitemImageLoad')
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailItemImgLoad')
      // }
    },
    itemClick(){
      console.log('跳转到详情页');
      console.log(this.goodsItem);
      
      this.$router.push('/detail'+ '/' + this.goodsItem.iid)
    }
  },
  computed: {
    getImg() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    }
}
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
    height: 100%;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
    /* color: var(); */
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>