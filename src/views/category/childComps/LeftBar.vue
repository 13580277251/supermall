<template>
 <div class="leftbar">
   <div v-for="(item,index) in maincategory" 
   :key="index" 
   class="bar-item"
   :class="{active:index === currentindex}" @click="itemclick(index)">
     <p>{{item.title}}</p>
   </div>
 </div>
</template>

<script>
export default {
  name:'LeftBar',
  props:{
    maincategory:{
      type:Array,
      default(){
        return []
    }
    }
  },
  data() {
    return {
      currentindex:0
    }
  },
  methods: {
    itemclick(index){
      this.currentindex = index
      this.$emit('leftclick',index)
    }
  },
}
</script>

<style scoped>
  .leftbar{
    display: flex;
    flex-flow: column;
    text-align: center;
    background-color: #F6F6F6;
  }
  .bar-item{
    flex: 1;
    border: 1px solid #eeeeee;
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  p{
    line-height: 33.88px;
    font-size: 14px;
  }
  .leftbar .active{
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }

</style>