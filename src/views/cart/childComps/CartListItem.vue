<template>
 <div id="shop-item">
   <div class="item-selector">
      <check-buttom :isChecked='ListItem.checked' @click.native="checkClick(currentindex)"></check-buttom>
   </div>
    <div class="item-img">
      <img :src="ListItem.image" alt="商品图片">
    </div>
   <div class="item-info">
     <div class="item-title">{{ListItem.title}}</div>
     <div class="item-desc">{{ListItem.desc}}</div>
     <div class="info-bottom">
       <div class="item-price left">{{ListItem.price}}</div>
       <div class="item-count right">×{{ListItem.count}}</div>
     </div>
   </div>
 </div>
</template>

<script>
import CheckButtom from '@components/content/checkButtom/CheckButtom'
export default {
  name:'CartListItem',
  components:{
    CheckButtom
  },
  props:{
    ListItem:{
      type:Object,
      default(){
      return {}
    },
    },
    currentindex:{
      type:Number,
      default:0
    }
  },
  methods: {
    checkClick(currentindex){
      console.log(currentindex);
      
      this.$store.commit('checkClick',currentindex)
    }
  },
}
</script>

<style scoped>
    #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    display: inline-block;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: inline-block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 324px;
    height: 100px;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom:0;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>