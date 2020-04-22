<template>
 <div class="wrapper" ref="wrapper">
   <div class="content">
     <slot></slot>
   </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
  name:'Scroll',
    // 因为有些组件不需要实时监听所以，另外设置变量，默认为0
  props:{
    probeType:{
      type : Number,
      default:0
    },
    // pullUpLoad:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data() {
    return {
      scroll:null
    }
  },
  /* 出现问题：
        无论如何总是会来监听会position，只有2和3两种情况 */
  mounted() {
    // 1.创建Better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      mouseWheel:true,
      // 设置2,3都会去回调监听position
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position)
    })

    this.scroll.refresh()
    

    // 3.监听上拉事件
    // this.scroll.on('pullingUp', () => {
    //   // console.log("上拉加载更多");
    //   this.$emit('pullingUp')
    // })
  },
  
  methods: {
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // finishPullUp(){
    //   this.scroll.finishPullUp()
    // },
    refresh(){
      this.scroll && this.scroll.refresh()
    }

  },
}
</script>

<style scoped>

</style>