<template>
 <div class="param-info" v-if="Object.keys(goodsparam).length !== 0">
   <table v-for="(table,index) in goodsparam.sizes" 
   :key="index" 
   class="info-size">
     <tr v-for="(tr,indey) in table" :key="indey">
       <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
     </tr>
   </table>
   <table class="info-param">
     <tr v-for="(item,index) in goodsparam.infos" :key="index">
       <td class="info-param-key">{{item.key}}</td>
       <td class="param-value">{{item.value}}</td>
     </tr>
   </table>
 </div>
</template>

<script>
export default {
  name:'DetailParamInfo',
  props:{
    goodsparam:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .param-info{
    padding: 20px 10px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  table{
    width: 100%;
    border-collapse: collapse;
  }
  table tr{
    height: 42px;
  }
  table tr td{
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-param-key{
    width: 95px;
  }
  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>