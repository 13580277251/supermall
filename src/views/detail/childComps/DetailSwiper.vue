<template>
 <div>
   <swiper class="swipers">
     <swiper-item v-for="(item,index) in topImages" :key="index">
       <img :src="item" alt="">
     </swiper-item>
   </swiper>
 </div>
</template>

<script>
import {Swiper, SwiperItem} from '@components/common/swiper'

export default {
  name:'DetailSwiper',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .swipers{
    height: 420px;
    overflow: hidden;
  }
  .swipers img{
    height: 500px;
  }

</style>