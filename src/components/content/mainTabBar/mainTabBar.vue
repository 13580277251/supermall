<template>
 <div>
   <Tab-Bar>
      <tab-bar-item path="/home">
      <!-- 在webpack.base.js中修改别名配置，并且在html标签中，地址前面应该加~ -->
        <img slot="item-icon" src="@assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="@assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="@assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="@assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="@assets/img/tabbar/cart.svg" alt="">
        <img slot="item-icon-active" src="@assets/img/tabbar/cart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="@assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="@assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </Tab-Bar>
 </div>
</template>

<script>
import TabBar from '@components/common/tabbar/TabBar'
import TabBarItem from '@components/common/tabbar/TabBaritem'
export default {
  name:'mainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>