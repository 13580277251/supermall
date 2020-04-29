<template>
 <div v-if="Object.keys(goods).length !== 0" class="base-info">
   <div class="info-title">{{goods.title}}</div>
   <div class="info-price">
     <span class="n-price">{{goods.newPrice}}</span>
     <span class="o-price">{{goods.oldPrice}}</span>
     <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
   </div>
   <div class="info-other">
     <span>{{goods.columns[0]}}</span>
     <span>{{goods.columns[1]}}</span>
     <span>{{goods.services[goods.services.length-1].name}}</span>
   </div>
   <div class="info-service">
     <span class="info-service-item" v-for="index in goods.services.length-2"
      :key="index">
        <img :src="goods.services[index].icon" alt="">
        <span>{{goods.services[index].name}}</span>
      </span>
   </div>
 </div>
</template>

<script>
export default {
  name:'DetailBaseInfo',
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
  },
}
</script>

<style scoped>
  .base-info{
    padding: 15px 10px;
  }

  .info-title{
    font-weight: 600;
    font-size: 19px;
    padding-bottom: 20px;
    line-height: 25px;
  }
  .info-price{
    padding-bottom: 25px;
    /* letter-spacing: 5px; */
  }
  .n-price{
    font-size: 20px;
    padding-right: 8px;
    color: var(--color-high-text);
  }
  .o-price{
    vertical-align: bottom;
    font-size: 12px;
    padding-right: 6px;
    text-decoration: line-through;
  }
  .discount{
    background-color:  var(--color-high-text);
    padding: 2px 5px;
    border-radius: 10px;
    font-size: 15px;
  }
  .info-other{
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 3px solid #f2f5f8;
    font-size: 15px;
    color: #666;
  }
  .info-service{
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    padding: 25px 0;
    border-bottom: 3px solid #f2f5f8;
  }
  .info-service img{
    height: 15px;
    width: 15px;
    vertical-align: middle;
  }

</style>