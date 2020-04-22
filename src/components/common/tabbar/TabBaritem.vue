<template>
 <div class="tab-bar-item" @click="itemclick">
   <!-- 动态决定组件内容，可以使用插槽slot -->
   <div v-if="!isActive"><slot name="item-icon"></slot></div>
   <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
 </div>
</template>

<script>
export default {
  name:'TabBarItem',
  data() {
    return {
      // isActive:true
    }
  },
  props:{
    /* 父传子，从APP.vue上传递参数过来 */
    path:String,
    activeColor:{
      type:String,
      // 如果没有传值，默认取值
      default:'red'
    }
  },
  computed: {
    isActive(){
      /* 判断活跃的组件的路径与传过来几个路径中哪个相同,来显示相应的图片 */
      return this.$route.path.indexOf(this.path) !== -1;  
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {};
      
    }
  },
  methods: {
    itemclick(){
      // 实现组件路由的跳转
      this.$router.replace(this.path).catch(err => err)
    }
  },
}
</script>

<style scoped>
  .tab-bar-item{
    flex:1;
    text-align:center;
    height:49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top:3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>