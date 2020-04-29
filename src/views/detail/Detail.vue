<template>
 <div id="detail">
   <detail-nav-bar @titleClick='titleClick' ref="nav"></detail-nav-bar>

   <scroll class="content"
    ref="scroll"
    :probe-type="3" 
    @scroll="contentscroll">
       <div>{{$store.state.CartList.length}}</div>
    <detail-swiper :topImages='topImages'></detail-swiper>
    <detail-base-info :goods='goods'></detail-base-info>
    <detail-shop-info :shop='shop'></detail-shop-info>
    <detail-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-info>
    <detail-param-info ref="params" :goodsparam='goodsparam'></detail-param-info>
    <detail-comment-info ref="comment" :comment-info='commentInfo'></detail-comment-info>
    <detailrecommend ref="recommend" :recommend='recommend'></detailrecommend>
   </scroll>

   <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>

   <back-top @click.native='backClick' v-show="isshowBackTop"></back-top>
 </div>
</template>

<script>
import DetailNavBar from '@views/detail/childComps/DetailNavBar'
import DetailSwiper from '@views/detail/childComps/DetailSwiper'
import DetailBaseInfo from '@views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from '@views/detail/childComps/DetailShopInfo'
import DetailInfo from '@views/detail/childComps/DetailInfo'
import DetailParamInfo from '@views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from '@views/detail/childComps/DetailCommentInfo'
import Detailrecommend from '@views/detail/childComps/Detailrecommend'
import DetailBottomBar from '@views/detail/childComps/DetailBottomBar'

import Scroll from "@components/common/scroll/Scroll"

import {getDetail, getrecommend, Goods, Shop, GoodsParam} from '@network/detail'

import {debounce} from "@components/common/utils.js"
import {itemListenerMixin,backTopMixin} from "@common/mixin"

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Detailrecommend,
    DetailBottomBar,
    Scroll,
  },
/*   混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个
  混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被
  “混合”进入该组件本身的选项 */
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      goodsparam:{},
      commentInfo:{},
      recommend:[],
      themeTopYs:[],
      getThemeTop:null,
      currentIndex:0,
      count:0
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取数据的时候注意分离数据
      this.topImages = res.result.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)

      // 3.获取店铺信息
      this.shop = new Shop(res.result.shopInfo)

      // 4.获取商品详细信息
      this.detailInfo = res.result.detailInfo

      // 5.获取商品参数信息
      this.goodsparam = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
    
      // 6.评论获取
      if (res.result.rate.list) {
        this.commentInfo = res.result.rate.list[0];
      }
    }),
    // 3.请求推荐函数
    getrecommend().then(res => { 
      this.recommend =res.data.list
    }),

          // 1.第一次获取，所得值不准确
      /* 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后
      等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自
      动绑定到调用它的实例上。 */
      // 但是这里只是DOM渲染完了，图片还没加载完
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经渲染出来了
        // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
        // this.themeTopYs = []
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      })
      
    // 4.给getThemeTopY赋值
    this.getThemeTop = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        // $ref获取到的是DOM，$el获取到的是组件实例
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
    },200)
  },
  mounted() {
    // 其中的防抖函数，已经被mixni.js混入
    
  },
  methods: {
    imageLoad(){
      // 1.在子组件DetailInfo中使用条件判断
      // this.$refs.scroll.refresh()
      // console.log('+++++');
      // 使用防抖函数
      const refresh = debounce(this.$refs.scroll.refresh,500)
      refresh()
      this.getThemeTop()
    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]-5,200)
    },
    contentscroll(position){ 
      // 1.获取y值   
      const positionY = -position.y
      // 2.positionY和主题中值进行对比
      const length = this.themeTopYs.length
      for(let i=0;i<length-1;i++){ 

        // 普通方法
        // if(this.currentIndex !== i && ((i< length-1  && positionY >= this.themeTopYs[i] &&
        //  positionY <= this.themeTopYs[i+1]) || (i === length-1 && 
        //  positionY >= this.themeTopYs[i]))){
        //    this.currentIndex = i
        //    this.$refs.nav.currentIndex = this.currentIndex
        //  }

        // hack方法：在themeTopYs的最后加上一个最大值，用于做判断
        // 注：最大值占内存
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 3.是否显示回到顶部
      this.isshowBackTop = positionY > 1000 ? true : false
    },
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price =this.goods.newPrice
      product.iid = this.iid
      // product.count = this.count
      console.log(product);

      // 2.将商品添加到购物车中
      this.$store.commit('addCart',product)
      
    }
  },
  // 组件没有实现缓存的时候，不可以调用active和deactive
  // 但是没有缓存的话，销毁时的所有监听事件应该也是被取消了
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
}
</script>

<style scoped>
  #detail{
    position: relative;
    background-color: #ffffff;
    z-index: 9;
    height: 100vh;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
</style>