<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <tab-control :titles="['流行','新款','精选']"
        @tabClick="tabClick" ref="tabControl1" 
        class="tab-control" 
        v-show="isTabFixed"></tab-control>

   <scroll class="content" 
   ref="scroll" 
   :probe-type="3" 
   @scroll="contentscroll" 
   :pull-up-load="true" 
   @pullingUp="loadMore"> 
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends = "recommends"></recommend-view>
      <featrue-view></featrue-view>
      <tab-control :titles="['流行','新款','精选']"
        @tabClick="tabClick" ref="tabControl2" ></tab-control>
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

import HomeSwiper from "@views/home/childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatrueView from "./childComps/FeatrueView"

import {getHomeMutidata,getHomeGoods} from "@network/home"
import {debounce} from "@components/common/utils.js"
import {itemListenerMixin,backTopMixin} from "@common/mixin"




export default {
  name:'home',
  components:{
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatrueView
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
      taboffsetTop:588,
      isTabFixed:false,
      saveY:0
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
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
    // 1.监听item中图片加载完成
    // 闭包对外层的局部变量进行了引用，就可以使其不备销毁
    // 接收方通过$on监听自定义事件的callback接收数据

    // 2.获取tabcontrol的offsetTop
    // 所有的组件都有一个属性$el：用于获取组件中的元素
    // this.taboffsetTop = 
    // console.log(this.$refs.tabControl.$el.offsetTop);
    
  },
  //只有存在keep-alive标签的时候activated()和deactivated()才会被执行
  activated() {
    // console.log(this.saveY+'activated');
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.scroll.y

    // 2.取消全局事件的监听
    // 如果没有参数，则移除所有事件监听器
    // 如果只提供事件，则移除该事件所有的监听器
    // 如果同时提供了事件和回调，则只取消这个回调的监听器
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    /* 事件监听相关 */

    tabClick(index){
      /* 使用switch判断index也可以 */
      // 遍历对象的keyObject.keys()[index]
      this.currentType = Object.keys(this.goods)[index]
      this.$refs.tabControl1.currentindex = index
      this.$refs.tabControl2.currentindex = index
    },
    contentscroll(position){
      // 1.判断backTop是否显示
      this.isshowBackTop = -position.y > 800 ? true : false
      // 2.决定我们的tabControl是否吸顶（给组件增加一个position:fixed的元素）
      this.isTabFixed = (-position.y) > this.taboffsetTop
    },
    loadMore(){
         this.getHomeGoods(this.currentType)

        //  重新计算可滚动高度
        //  this.$refs.scroll.scroll.refresh()
         
    },
    swiperImageLoad(){ 
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
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
      // console.log(res);
      this.goods[type].list.push(...res.data.list)
      // 将前一页的数据取出之后，要把下次默认页码加一
      this.goods[type].page += 1

      // 每次执行完下拉加载更多之后都得执行一次finishPullUp
      this.$refs.scroll.finishPullUp()
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
    /* 因为利用得到是betterscroll的滚动，导航不在content中，所以不怕受到影响 */
/*     position: fixed;
    left: 0;
    right: 0;
    top: 0; */
  }
  .tab-control{
    position: relative;
    right: 0;
    left: 0;
    top: 0;
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