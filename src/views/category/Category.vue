<template>
 <div>
   <nav-bar class="navbar">
     <div slot="center">商品分类</div>
   </nav-bar>
   <div class="allcontent">
      <left-bar :maincategory = 'maincategory' class="leftbar"
       @leftclick='leftclick'></left-bar>
      <div class="rightbar">
            <tab-control :titles="['综合','新品','销量']" 
            @tabClick='itemclick' class="top-bar"></tab-control>
        <scroll class="content">
          <goodmenu :itemmenu='showsubcategory'></goodmenu>
            <good-list :goods='showCategoryDetail'></good-list>  
        </scroll>
        <!-- :goods='showCategoryDetail' -->
      </div>
   </div>
 </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'
import TabControl from '@components/content/tabcontrol/TabControl'
import GoodList from "@components/content/goods/GoodsList"
import LeftBar from './childComps/LeftBar'
import goodmenu from './childComps/goodmenu'

import Scroll from '@components/common/scroll/Scroll'

import {POP, SELL, NEW} from "@/common/const";

import {getCategory,getsubcategory,getCategoryDetail} from '@network/category'

export default {
  name:'Category',
  components:{
    NavBar,
    LeftBar,
    TabControl,
    GoodList,
    goodmenu,
    Scroll
  },
  data() {
    return {
      maincategory:[],
      categoryData:{},
      currentindex: -1,
      currentType:POP
    }
  },
  created() {
    this._getCategory()
  },
  computed: {
    showsubcategory(){
      if(this.currentindex === -1) return {}
      return  this.categoryData[this.currentindex].subcategories
    },
    showCategoryDetail(){
      if(this.currentindex === -1) return []
      return this.categoryData[this.currentindex].categoryDetail[this.currentType]
    }
  },
  methods: {
    // 获取分类目录数据
    _getCategory(){
      getCategory().then(res => {
        // console.log(res);
        this.maincategory = res.data.category.list;
        console.log(this.maincategory);
        for (let i = 0; i < this.maincategory.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          this._getsubcategory(0)
      })
    },
    // 获取分类数据
    _getsubcategory(index){
      this.currentindex = index
      const maitKey = this.maincategory[index].maitKey
      
      getsubcategory(maitKey).then(res => {
        this.categoryData[index].subcategories = res.data
        // ?
        this.categoryData = {...this.categoryData}
        console.log(res);
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    // 获取tab-control数据
    _getCategoryDetail(type){
      const miniWallkey = this.maincategory[this.currentindex].miniWallkey
      getCategoryDetail(miniWallkey,type).then(res => {
        this.categoryData[this.currentindex].categoryDetail[type] = res;
        console.log(res);
        
      })
    },
    leftclick(index){
      this._getsubcategory(index)
    },
    itemclick(index){
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  },
}
</script>

<style scoped>
  .navbar{
    background-color: var(--color-tint);
  }
  .allcontent{
    display: flex;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .leftbar{
    flex: 1;
  }
  .rightbar{
    flex: 2;
  }
  .content{
    position: absolute;
    left: 124px;
    right: 0;
    bottom: 0;
    top: 40px;
    overflow: hidden;
  }
</style>