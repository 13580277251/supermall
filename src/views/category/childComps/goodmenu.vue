<template>
 <div class="goodmenu">
   <div v-for="(item,index) in itemmenu.list" :key="index" class="goodmenu-item">
     <img :src="item.image" alt="">
     <p>{{item.title}}</p>
   </div>
 </div>
</template>

<script>
export default {
  name:'goodmenu',
  props:{
    itemmenu:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goodmenu{
    display: flex;
    flex-flow: row wrap;
    /* 间隔均等分行内剩余空间 */
    justify-content: space-around;
    padding: 2px;
  }
  .goodmenu-item{
    flex: 0 0 33%;
    padding-bottom: 30px;
    text-align: center;
  }
  .goodmenu img{
    width: 100%;
    border-radius: 5px;
    height: 100%;
  }
</style>