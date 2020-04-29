<template>
 <div>
   <nav-bar>
     <div slot="left" class="back" @click="backClick">
       <img src="@assets/img/common/back.svg" alt="">
     </div>
     <div slot="center" class="titles">
       <div v-for="(item,index) in titles" :key="index" 
       class="item-titles" @click="tabclick(index)"
        :class="{active: currentIndex === index}">{{item}}</div>
     </div>
   </nav-bar>
 </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'

export default {
  name:'DetailNavBar',
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods: {
    tabclick(index){
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  },
}
</script>

<style scoped>
  .titles{
    display: flex;
    font-size: 13px;
  }
  .item-titles{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 11px;
  }

</style>