<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>


   <scroll class="content" 
   ref="scroll" 
   :probe-type="3" 
   @scroll="contentscroll"> <!-- :pull-up-load="true" @pullingUp="loadMore" -->
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends = "recommends"></recommend-view>
      <featrue-view></featrue-view>
      <tab-control class="tab-constrol" :titles="['流行','新款','精选']"
        @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"></good-list>
   </scroll>

   <!-- 监听组件标签的时候应该加上.native -->
   <back-top @click.native='backClick' v-show="isshowBackTop"></back-top>

 </div>
</template>

<script>
/* 按顺序导入 */
import NavBar from '@components/common/navbar/NavBar'
import TabControl from "@components/content/tabcontrol/TabControl"
import GoodList from "@components/content/goods/GoodsList"
import Scroll from "@components/common/scroll/Scroll"
import BackTop from "@components/content/backTop/BackTop"

import HomeSwiper from "@views/home/childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatrueView from "./childComps/FeatrueView"

import {getHomeMutidata,getHomeGoods} from "@network/home"



export default {
  name:'home',
  components:{
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatrueView,
    BackTop
  },
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        // 分别代表流行，新款，经典三个TAB
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isshowBackTop:false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  // 不要再create上获取DOM元素
  created() {
    // 将网络请求处理函数放入methods中，并且调用methods中的代码
    //1.请求多个数据
    this.getHomeMutidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    // 3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad',() => {
        this.$refs.scroll.refresh()   
    })
  },
  methods: {
    /* 事件监听相关 */
    tabClick(index){
      /* 使用switch判断index也可以 */
      this.currentType = Object.keys(this.goods)[index]
    },
    backClick(){
      // 回到scroll对象顶部，延迟500毫秒
      this.$refs.scroll.scrollTo(0,0)
      
    },
    contentscroll(position){
      this.isshowBackTop = -position.y > 800 ? true : false
    },
    // loadMore(){
    //      this.getHomeGoods(this.currentType)

    //     //  重新计算可滚动高度
    //     //  this.$refs.scroll.scroll.refresh()
         
    // },
    /* 网络请求相关 */
    getHomeMutidata(){
      getHomeMutidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      // 传入要请求的页码
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res => {
      console.log(res);
      this.goods[type].list.push(...res.data.list)
      // 将前一页的数据取出之后，要把下次默认页码加一
      this.goods[type].page += 1

      // 每次执行完下拉加载更多之后都得执行一次finishPullUp
      // this.$refs.scroll.finishPullUp()
    })
    }
  },
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    /* vh -> viewport height 可视高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
  .tab-constrol{
    /* 但是有些浏览器不支持 */
    /* 使tabcontrol导航栏向上吸顶，未达到top：44px的时候，默认为position：state */
    position: sticky;
    top: 44px;
    background-color: #fff;
  }
  /* 第一种方式：使内容定位在中间 */
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  /* 第二种方式 */
  /* 此 calc()函数用一个表达式作为它的参数，用这个表达式的结果作为值。这个表达式可以
  采用标准操作符处理法则的简单表达式 */
  /* 动态计算，适用不同设备 */
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>